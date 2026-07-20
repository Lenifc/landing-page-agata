const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const paymentWithoutPrefix = (value) =>
  value.replace(/^miesięcznie:\s*/, '')

export const PRICING = Object.freeze({
  plans: {
    individualWeekly: {
      name: 'Indywidualne (1:1)',
      frequency: '1× w tygodniu',
      duration: '50 min',
      price: '95 zł',
      schemaPrice: '95',
      fromPrice: '95 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: '95 zł za lekcję 50 min',
      details:
        'Lekcje indywidualne raz w tygodniu. Cena za pojedynczą lekcję 50 minut.',
      featured: true,
    },
    individualTwiceWeekly: {
      name: 'Indywidualne (1:1)',
      frequency: '2× w tygodniu',
      duration: '50 min',
      price: '85 zł',
      schemaPrice: '85',
      fromPrice: '85 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: '85 zł za lekcję 50 min',
      details:
        'Lekcje indywidualne dwa razy w tygodniu. Niższa stawka przy regularnych dwóch lekcjach tygodniowo.',
      featured: false,
    },
    duoWeekly: {
      name: 'DUO',
      frequency: '1× w tygodniu',
      duration: '50 min',
      price: '75 zł / osoba',
      schemaPrice: '75',
      fromPrice: '75 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: '75 zł / osoba za lekcję 50 min',
      details:
        'Zajęcia w parze raz w tygodniu. Cena podana za osobę za lekcję 50 minut.',
      featured: false,
    },
    duoTwiceWeekly: {
      name: 'DUO',
      frequency: '2× w tygodniu',
      duration: '50 min',
      price: '65 zł / osoba',
      schemaPrice: '65',
      fromPrice: '65 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: '65 zł / osoba za lekcję 50 min',
      details:
        'Zajęcia w parze dwa razy w tygodniu. Niższa stawka przy regularnych dwóch lekcjach tygodniowo.',
      featured: false,
    },
    examGroup: {
      name: 'Kurs egzaminacyjny',
      frequency: '50 lekcji (25 spotkań po 100 min)',
      duration: '100 min (2×50 min)',
      price: '108 zł / 100 min',
      schemaPrice: '337.50',
      fromPrice: '54 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      priceDetails: {
        totalPrice: '2700 zł / osoba',
        lessonPrice: '54 zł / osoba za lekcję 50 min',
      },
      paymentNote: 'miesięcznie: 8 rat × 337,50 zł / osoba',
      details: `Kurs egzaminacyjny dla uczniów klasy 8 oraz maturzystów obejmuje 25 spotkań po 100 minut w
        kameralnej 3-osobowej grupie. Cena: 108 zł / osoba za spotkanie 100 min (54 zł za 50 min).
        Zajęcia odbywają się raz w tygodniu (jedna po drugiej). W sumie to ponad 41 godzin nauki,
        a kurs kończy się przed terminem egzaminu. Płatność: 8 równych rat × 337,50 zł / osoba.`,
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '50 lekcji (25 spotkań po 100 min) w 3-osobowej grupie. Program obejmuje arkusze, strategie i najważniejsze powtórki przed egzaminem. Płatność jest rozłożona na 8 równych rat. Spotkanie 100 min = 108 zł / osoba (54 zł za 50 min).',
        },
        maturaExam: {
          details:
            '50 lekcji (25 spotkań po 100 min) w 3-osobowej grupie, z pracą na arkuszach, strategiach i najważniejszych obszarach do poprawy. Płatność jest rozłożona na 8 równych rat. Spotkanie 100 min = 108 zł / osoba (54 zł za 50 min).',
        },
      },
    },
  },
  collections: {
    offer: [
      'individualWeekly',
      'individualTwiceWeekly',
      'duoWeekly',
      'duoTwiceWeekly',
      'examGroup',
    ],
    individual: ['individualWeekly', 'individualTwiceWeekly'],
    duo: ['duoWeekly', 'duoTwiceWeekly'],
    annualExam: ['examGroup'],
    eighthGradeExam: [
      'examGroup',
      'individualWeekly',
      'individualTwiceWeekly',
    ],
    maturaExam: [
      'examGroup',
      'individualWeekly',
      'individualTwiceWeekly',
    ],
    schoolSupport: [
      'individualWeekly',
      'individualTwiceWeekly',
      'duoWeekly',
      'duoTwiceWeekly',
    ],
    adultClasses: [
      'individualWeekly',
      'individualTwiceWeekly',
      'duoWeekly',
      'duoTwiceWeekly',
    ],
    onlineClasses: [
      'individualWeekly',
      'individualTwiceWeekly',
      'duoWeekly',
      'duoTwiceWeekly',
      'examGroup',
    ],
  },
  notes: {
    morningOnline:
      'Cennik poranny online obowiązuje od poniedziałku do piątku do godz. 12:00.',
    advancePayment:
      'Płatność z góry, na podstawie prognozowanej liczby spotkań w danym miesiącu.',
  },
  morningOnlineRates: {
    individualWeekly: '80 zł',
    individualTwiceWeekly: '70 zł',
    duoWeekly: '60 zł / osoba',
    duoTwiceWeekly: '50 zł / osoba',
  },
})

export const PRICING_NOTES = PRICING.notes
export const MORNING_ONLINE_RATES = PRICING.morningOnlineRates

export const getMorningOnlinePlans = () => [
  {
    id: 'morningIndividualWeekly',
    name: 'Indywidualne (1:1)',
    frequency: '1× w tygodniu',
    duration: '50 min',
    price: MORNING_ONLINE_RATES.individualWeekly,
    details: 'Poranne lekcje online od poniedziałku do piątku do godz. 12:00.',
    featured: false,
  },
  {
    id: 'morningIndividualTwiceWeekly',
    name: 'Indywidualne (1:1)',
    frequency: '2× w tygodniu',
    duration: '50 min',
    price: MORNING_ONLINE_RATES.individualTwiceWeekly,
    details: 'Poranne lekcje online od poniedziałku do piątku do godz. 12:00.',
    featured: false,
  },
  {
    id: 'morningDuoWeekly',
    name: 'DUO',
    frequency: '1× w tygodniu',
    duration: '50 min',
    price: MORNING_ONLINE_RATES.duoWeekly,
    details: 'Poranne lekcje online w parze. Cena podana za osobę.',
    featured: false,
  },
  {
    id: 'morningDuoTwiceWeekly',
    name: 'DUO',
    frequency: '2× w tygodniu',
    duration: '50 min',
    price: MORNING_ONLINE_RATES.duoTwiceWeekly,
    details: 'Poranne lekcje online w parze. Cena podana za osobę.',
    featured: false,
  },
]

export const getPricingPlan = (planId, collection) => {
  const planConfig = PRICING.plans[planId]

  if (!planConfig) {
    return null
  }

  const { contexts, ...plan } = planConfig

  return {
    id: planId,
    ...plan,
    ...(collection ? contexts?.[collection] : {}),
  }
}

export const getPricingPlans = (collection) =>
  (PRICING.collections[collection] ?? []).map((planId) => {
    return getPricingPlan(planId, collection)
  })

/** Landing card: 1:1 with both weekly rates. */
export const buildIndividualRateCard = (details, { rates } = {}) => {
  const weekly = getPricingPlan('individualWeekly')
  const twiceWeekly = getPricingPlan('individualTwiceWeekly')
  const weeklyPrice = rates?.weekly ?? weekly.price
  const twiceWeeklyPrice = rates?.twiceWeekly ?? twiceWeekly.price

  return {
    id: 'individual',
    name: 'Lekcje indywidualne 1:1',
    duration: '50 min',
    rateOptions: [
      {
        id: '1x',
        frequency: '1× w tygodniu',
        price: weeklyPrice,
        priceContext: weekly.fromPriceContext,
      },
      {
        id: '2x',
        frequency: '2× w tygodniu',
        price: twiceWeeklyPrice,
        priceContext: twiceWeekly.fromPriceContext,
      },
    ],
    defaultRateId: '2x',
    details,
    simple: true,
    schemaPrice: twiceWeekly.schemaPrice,
    fromPrice: twiceWeeklyPrice,
    fromPriceContext: twiceWeekly.fromPriceContext,
    price: twiceWeeklyPrice,
  }
}

/** Landing card: DUO with both weekly rates. */
export const buildDuoRateCard = (details, { rates } = {}) => {
  const weekly = getPricingPlan('duoWeekly')
  const twiceWeekly = getPricingPlan('duoTwiceWeekly')
  const weeklyPrice = personPrice(rates?.weekly ?? weekly.price)
  const twiceWeeklyPrice = personPrice(rates?.twiceWeekly ?? twiceWeekly.price)

  return {
    id: 'duo',
    name: 'Lekcje DUO',
    duration: '50 min',
    rateOptions: [
      {
        id: '1x',
        frequency: '1× w tygodniu',
        price: weeklyPrice,
        priceContext: weekly.fromPriceContext,
      },
      {
        id: '2x',
        frequency: '2× w tygodniu',
        price: twiceWeeklyPrice,
        priceContext: twiceWeekly.fromPriceContext,
      },
    ],
    defaultRateId: '2x',
    details,
    simple: true,
    schemaPrice: twiceWeekly.schemaPrice,
    fromPrice: twiceWeeklyPrice,
    fromPriceContext: twiceWeekly.fromPriceContext,
    price: twiceWeeklyPrice,
  }
}

/** Landing card: exam package (only remaining package). */
export const buildExamRateCard = (collection) => {
  const exam = getPricingPlan('examGroup', collection)

  return {
    ...exam,
    displayPrice: '108 zł / osoba',
    displayPriceContext: 'za spotkanie 100 min',
    paymentLines: [
      {
        payment: '108 zł / osoba za spotkanie 100 min',
      },
      {
        payment: paymentWithoutPrefix(exam.paymentNote),
        totalPrice: exam.priceDetails.totalPrice,
      },
    ],
  }
}
