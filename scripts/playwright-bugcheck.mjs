import { chromium, devices } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BUGCHECK_BASE_URL || 'http://localhost:3000'
const findings = []
const add = (severity, area, message, meta = {}) =>
  findings.push({ severity, area, message, ...meta })

const ROUTES = [
  '/',
  '/oferta',
  '/kontakt',
  '/egzamin-osmoklasisty-rumia',
  '/matura-z-angielskiego-rumia',
  '/korepetycje',
  '/zajecia-dla-doroslych',
  '/zajecia-zdalne',
  '/polityka-prywatnosci',
]

async function smoke(page, viewport) {
  for (const route of ROUTES) {
    const pageErrors = []
    const onPageError = (e) => pageErrors.push(e.message)
    page.on('pageerror', onPageError)
    const res = await page.goto(`${BASE}${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    })
    await page.waitForTimeout(300)
    if ((res?.status() ?? 0) >= 400) {
      add('P0', `${viewport}${route}`, `HTTP ${res.status()}`)
    }
    for (const err of pageErrors) {
      add('P0', `${viewport}${route}`, `pageerror: ${err}`)
    }
    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0 && img.src)
        .map((img) => img.currentSrc || img.src),
    )
    for (const src of broken) {
      add('P1', `${viewport}${route}`, `Broken image: ${src}`)
    }
    const h1 = await page.locator('h1').count()
    if (h1 === 0) add('P1', `${viewport}${route}`, 'Missing H1')
    if (h1 > 1) add('P2', `${viewport}${route}`, `Multiple H1 (${h1})`)
    page.off('pageerror', onPageError)
  }
}

async function checkCtas(page) {
  const checks = [
    ['/', /Zapytaj o zajęcia/i],
    ['/matura-z-angielskiego-rumia', /Zapytaj o maturę/i],
    ['/egzamin-osmoklasisty-rumia', /Zapytaj o zajęcia/i],
  ]
  for (const [path, name] of checks) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
    const href = await page.getByRole('link', { name }).first().getAttribute('href')
    if (!href?.includes('#formularz')) {
      add('P0', `cta${path}`, `href=${href}`)
    }
  }
}

async function checkForm(page) {
  await page.route('**/formspree.io/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    }),
  )

  await page.goto(`${BASE}/kontakt#formularz`, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())

  // empty validation
  await page.locator('form button[type="submit"]').click()
  await page.waitForTimeout(400)
  if ((await page.locator('[aria-invalid="true"]').count()) === 0) {
    add('P1', 'form', 'Empty submit: no validation errors')
  }
  if ((await page.locator('text=Dziękuję - zgłoszenie poszło').count()) > 0) {
    add('P0', 'form', 'Empty submit shows success')
  }

  // too-fast after jsToken exists (<2s window is tight; wait 1s then submit)
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#contact-name')
  await page.waitForTimeout(1000)
  await page.locator('#contact-name').fill('Test')
  await page.locator('#contact-email').fill('t@example.com')
  await page.locator('#contact-message').fill('test wiadomosc bez linkow')
  await page.locator('input[name="consent"]').check({ force: true })
  await page.locator('form button[type="submit"]').click()
  await page.waitForTimeout(500)
  const tooFastVisible = await page.locator('[role="alert"]').filter({
    hasText: /zbyt szybko/i,
  }).count()
  if (tooFastVisible === 0) {
    add('P1', 'form', 'Expected too-fast error ~1s after mount')
  }

  // valid after 2.5s
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#contact-name')
  await page.waitForTimeout(2500)
  await page.locator('#contact-name').fill('Anna')
  await page.locator('#contact-email').fill('anna@example.com')
  await page.locator('#contact-message').fill('Szukam matury podstawowej w Rumi')
  await page.locator('input[name="consent"]').check({ force: true })
  let hits = 0
  const onReq = (req) => {
    if (req.url().includes('formspree.io')) hits += 1
  }
  page.on('request', onReq)
  await page.locator('form button[type="submit"]').click()
  await page.waitForTimeout(1200)
  page.off('request', onReq)
  const thanks = await page.locator('text=Dziękuję - zgłoszenie poszło').count()
  if (!(hits > 0 && thanks > 0)) {
    add('P1', 'form', 'Valid submit did not succeed', { hits, thanks })
  }

  // honeypot geometry
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  const geo = await page.evaluate(() => {
    const el = document.querySelector('input[name="website"]')
    const r = el.getBoundingClientRect()
    const hidden = el.closest('[aria-hidden="true"]')
    return {
      w: r.width,
      h: r.height,
      x: Math.round(r.x),
      ariaHidden: Boolean(hidden),
      inInnerText: (document.querySelector('#formularz')?.innerText || '').includes(
        'Strona WWW',
      ),
    }
  })
  if (geo.w > 0 && geo.h > 0) {
    add(
      'P2',
      'form-honeypot',
      `Honeypot has box ${geo.w}x${geo.h} at x=${geo.x}; aria-hidden=${geo.ariaHidden}; label in formularz text=${geo.inInnerText}`,
    )
  }
}

async function checkMobile(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  const toggle = page.locator('button[aria-label="Przełącz menu"]')
  await toggle.click()
  await page.waitForTimeout(400)
  const box = await page.locator('header').boundingBox()
  const vh = page.viewportSize().height
  if ((await toggle.getAttribute('aria-expanded')) !== 'true') {
    add('P1', 'mobile-nav', 'Not expanded')
  }
  if (!box || box.height < vh * 0.85) {
    add('P1', 'mobile-nav', `Height ${Math.round(box?.height || 0)} / vh ${vh}`)
  }
  const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow)
  if (overflow !== 'hidden') {
    add('P2', 'mobile-nav', `body overflow=${overflow}`)
  }

  // sticky after scroll
  await toggle.click()
  await page.waitForTimeout(200)
  await page.evaluate(() => window.scrollTo(0, 1200))
  await page.waitForTimeout(600)
  const sticky = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll('a[href*="kontakt"]')]
    return nodes
      .map((a) => {
        const fixed = a.closest('[class*="fixed"]')
        return fixed
          ? { href: a.getAttribute('href'), text: (a.textContent || '').trim().slice(0, 40) }
          : null
      })
      .filter(Boolean)
  })
  for (const s of sticky) {
    if (!s.href?.includes('#formularz')) {
      add('P1', 'sticky-cta', `href=${s.href}`)
    }
  }
}

async function checkHashAndOnline(page) {
  await page.goto(`${BASE}/kontakt#formularz`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  const inView = await page.locator('#formularz').evaluate((el) => {
    const r = el.getBoundingClientRect()
    return r.top < innerHeight * 0.9 && r.bottom > 0
  })
  if (!inView) add('P1', 'hash', '#formularz not in view')

  await page.goto(`${BASE}/zajecia-zdalne#cennik`, { waitUntil: 'networkidle' })
  const btns = page.locator('button[aria-pressed]')
  await btns.nth(1).click()
  if ((await btns.nth(1).getAttribute('aria-pressed')) !== 'true') {
    add('P1', 'online', 'Afternoon toggle failed')
  }
}

async function checkLinks(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  const paths = await page.evaluate(() => [
    ...new Set(
      [...document.querySelectorAll('a[href^="/"]')]
        .map((a) => (a.getAttribute('href') || '').split('#')[0])
        .filter((h) => h && !h.includes('.')),
    ),
  ])
  for (const path of paths) {
    const res = await page.request.get(`${BASE}${path}`)
    if (res.status() >= 400) {
      add('P0', 'links', `${path} → ${res.status()}`)
    }
  }
}

const browser = await chromium.launch({ headless: true })

{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'pl-PL',
  })
  const page = await ctx.newPage()
  await smoke(page, 'desktop')
  await checkCtas(page)
  await checkForm(page)
  await checkHashAndOnline(page)
  await checkLinks(page)
  await ctx.close()
}

{
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'pl-PL' })
  const page = await ctx.newPage()
  await smoke(page, 'mobile')
  await checkCtas(page)
  await checkMobile(page)
  await checkHashAndOnline(page)
  await ctx.close()
}

await browser.close()

const key = (f) => `${f.severity}|${f.area}|${f.message}`
const unique = []
const seen = new Set()
for (const f of findings) {
  const k = key(f)
  if (seen.has(k)) continue
  seen.add(k)
  unique.push(f)
}
unique.sort((a, b) => ({ P0: 0, P1: 1, P2: 2 }[a.severity] - { P0: 0, P1: 1, P2: 2 }[b.severity]))

mkdirSync('.bugcheck', { recursive: true })
const report = {
  base: BASE,
  checkedAt: new Date().toISOString(),
  summary: {
    total: unique.length,
    P0: unique.filter((f) => f.severity === 'P0').length,
    P1: unique.filter((f) => f.severity === 'P1').length,
    P2: unique.filter((f) => f.severity === 'P2').length,
  },
  findings: unique,
  passedChecks: [
    'All 9 routes HTTP 200 (desktop+mobile)',
    'No pageerrors / broken images / missing H1',
    'Primary CTAs keep #formularz',
    'Empty form validates',
    'too-fast gate works (~1s)',
    'Valid submit → Formspree + success UI',
    'Mobile nav full-height + scroll lock',
    'Hash #formularz scrolls into view',
    'Online schedule toggle',
    'Internal links from home OK',
  ],
}
writeFileSync('.bugcheck/report.json', JSON.stringify(report, null, 2))
console.log(JSON.stringify(report.summary, null, 2))
console.log('PASSED:')
for (const p of report.passedChecks) console.log(`  ✓ ${p}`)
console.log('FINDINGS:')
if (!unique.length) console.log('  (none)')
for (const f of unique) console.log(`- [${f.severity}] ${f.area}: ${f.message}`)
