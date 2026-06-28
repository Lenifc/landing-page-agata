export const PRICING = Object.freeze({
  plans: {
    individualAnnualWeekly: {
      name: 'Indywidualne (1:1) - Standard',
      frequency: '32 lekcje',
      duration: '50 min',
      price: '10 rat × 300 zł',
      schemaPrice: '300',
      fromPrice: '93,75 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 300 zł',
      details:
        'Kurs obejmuje 32 lekcje po 50 minut, odbywające się zazwyczaj raz w tygodniu.',
      featured: true,
      contexts: {
        eighthGradeExam: {
          details:
            '32 lekcje po 50 min w pakiecie rocznym 1:1 Standard, z programem dopasowanym do potrzeb ucznia i terminu egzaminu.',
        },
        maturaExam: {
          details:
            '32 lekcje po 50 min w pakiecie rocznym 1:1 Standard, z planem pod poziom podstawowy lub rozszerzony.',
        },
        adultClasses: {
          details:
            '32 lekcje po 50 min w pakiecie rocznym 1:1 Standard, z tempem i materiałami dopasowanymi do celu dorosłego kursanta.',
        },
      },
    },
    individualAnnualTwiceWeekly: {
      name: 'Indywidualne (1:1) - Intense',
      frequency: '64 lekcje',
      duration: '50 min',
      price: '10 rat × 544 zł',
      schemaPrice: '544',
      fromPrice: '85 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 544 zł',
      details:
        'Kurs składa się z 64 lekcji po 50 minut, odbywających się zwykle raz w tygodniu w bloku zajęć (jedna po drugiej).',
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '64 lekcje po 50 min w pakiecie rocznym 1:1 Intense dla uczniów potrzebujących bardziej regularnej pracy przed egzaminem.',
        },
        maturaExam: {
          details:
            '64 lekcje po 50 min w pakiecie rocznym 1:1 Intense dla maturzystów potrzebujących mocniejszego rytmu przygotowań.',
        },
        adultClasses: {
          details:
            '64 lekcje po 50 min w pakiecie rocznym 1:1 Intense dla dorosłych, którzy chcą szybciej wrócić do angielskiego lub utrzymać mocniejszy rytm nauki.',
        },
      },
    },
    duoAnnualWeekly: {
      name: 'DUO - Standard',
      frequency: '32 lekcje',
      duration: '50 min',
      price: '10 rat × 210 zł / osoba',
      schemaPrice: '210',
      fromPrice: '65,63 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 210 zł / osoba',
      details:
        'Kurs dla osób uczących się w parze. 32 spotkania po 50 minut, odbywające się zazwyczaj raz w tygodniu.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '32 lekcje po 50 min w pakiecie rocznym DUO Standard dla dwóch osób uczących się razem.',
        },
      },
    },
    duoAnnualTwiceWeekly: {
      name: 'DUO - Intense',
      frequency: '64 lekcje',
      duration: '50 min',
      price: '10 rat × 385 zł / osoba',
      schemaPrice: '385',
      fromPrice: '60,16 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 385 zł / osoba',
      details:
        'Kurs dla osób uczących się w parze. 64 spotkania po 50 minut, odbywające się zazwyczaj w bloku zajęć (jedna po drugiej).',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '64 lekcje po 50 min w pakiecie rocznym DUO Intense dla dwóch osób uczących się razem.',
        },
      },
    },
    onlineMorningIndividualAnnualWeekly: {
      name: 'Poranne online 1:1 - Standard',
      frequency: '32 lekcje',
      duration: '50 min',
      price: '10 rat × 240 zł',
      schemaPrice: '240',
      fromPrice: '75 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 240 zł',
      details:
        '32 lekcje po 50 min w porannym wariancie online do godziny 12:00. Cena dotyczy zajęć od poniedziałku do piątku.',
      featured: false,
    },
    onlineMorningIndividualAnnualTwiceWeekly: {
      name: 'Poranne online 1:1 - Intense',
      frequency: '64 lekcje',
      duration: '50 min',
      price: '10 rat × 435,20 zł',
      schemaPrice: '435.20',
      fromPrice: '68 zł',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 435,20 zł',
      details:
        '64 lekcje po 50 min w porannym wariancie online do godziny 12:00. Cena dotyczy zajęć od poniedziałku do piątku.',
      featured: false,
    },
    onlineMorningDuoAnnualWeekly: {
      name: 'Poranne online DUO - Standard',
      frequency: '32 lekcje',
      duration: '50 min',
      price: '10 rat × 168 zł / osoba',
      schemaPrice: '168',
      fromPrice: '52,50 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 168 zł / osoba',
      details:
        '32 lekcje po 50 min w porannym wariancie online dla dwóch osób uczących się razem. Cena dotyczy zajęć od poniedziałku do piątku.',
      featured: false,
    },
    onlineMorningDuoAnnualTwiceWeekly: {
      name: 'Poranne online DUO - Intense',
      frequency: '64 lekcje',
      duration: '50 min',
      price: '10 rat × 308 zł / osoba',
      schemaPrice: '308',
      fromPrice: '48,13 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 10 rat × 308 zł / osoba',
      details:
        '64 lekcje po 50 min w porannym wariancie online dla dwóch osób uczących się razem. Cena dotyczy zajęć od poniedziałku do piątku.',
      featured: false,
    },
    examGroup: {
      name: 'Kurs egzaminacyjny',
      frequency: '50 lekcji (25 spotkań po 100min)',
      duration: '100 min (2×50 min)',
      price: '8 rat × 365 zł / osoba',
      schemaPrice: '365',
      fromPrice: '58,40 zł / osoba',
      fromPriceContext: 'za lekcję 50 min',
      paymentNote: 'miesięcznie: 8 rat × 365 zł / osoba',
      details: `Kurs egzaminacyjny dla uczniów klasy 8 oraz maturzystów obejmuje 25 spotkań po 100 minut w
        kameralnej grupie maksymalnie 4-osobowej. Zajęcia odbywają się raz w tygodniu w bloku
        (jedna po drugiej). W sumie to ponad 41 godzin nauki, a kurs kończy się przed terminem
        egzaminu. Płatność jest rozłożona na 8 równych rat po 365 zł za osobę.`,
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '50 lekcji (25 spotkań po 100min) w kameralnej grupie maksymalnie 4-osobowej. Program obejmuje arkusze, strategie i najważniejsze powtórki przed egzaminem. Płatność jest rozłożona na 8 równych rat po 365 zł za osobę.',
        },
        maturaExam: {
          details:
            '50 lekcji (25 spotkań po 100min) w kameralnej grupie maksymalnie 4-osobowej, z pracą na arkuszach, strategiach i najważniejszych obszarach do poprawy. Płatność jest rozłożona na 8 równych rat po 365 zł za osobę.',
        },
      },
    },
    miniIndividual: {
      name: 'Indywidualne (1:1) - Mini',
      frequency: '24 lekcje',
      duration: '50 min',
      price: '8 rat × 300 zł',
      schemaPrice: '300',
      details: `Kurs obejmuje 24 spotkania po 50 minut, odbywające się zazwyczaj raz w tygodniu.
        To krótszy cykl nauki z płatnością rozłożoną na 8 rat.`,
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '24 lekcje po 50 min w pakiecie MINI 1:1, dobrym jako intensywne wsparcie przed egzaminem ósmoklasisty.',
        },
        maturaExam: {
          details:
            '24 lekcje po 50 min w pakiecie MINI 1:1, dobrym jako intensywne wsparcie przed maturą.',
        },
        adultClasses: {
          details:
            '24 lekcje po 50 min w pakiecie MINI 1:1, jeśli potrzebujesz krótszego cyklu nauki bez zobowiązania od września do czerwca.',
        },
      },
    },
    miniDuo: {
      name: 'DUO - Mini',
      frequency: '24 lekcje',
      duration: '50 min',
      price: '8 rat × 210 zł / osoba',
      schemaPrice: '210',
      details:
        'Pakiet MINI DUO obejmuje 24 lekcje po 50 min dla dwóch osób. To krótszy cykl nauki z płatnością rozłożoną na 8 rat.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '24 lekcje po 50 min w pakiecie MINI DUO dla dwóch osób, które chcą uczyć się razem w krótszym cyklu.',
        },
      },
    },
    occasionalIndividual: {
      name: 'Indywidualne (1:1)',
      frequency: 'lekcja okazjonalna',
      duration: '50 min',
      price: '110 zł',
      schemaPrice: '110',
      promo: {
        label: 'Jednorazowa lekcja dla nowych kursantów',
        price: '88 zł',
      },
      details:
        'Doraźna pomoc, nadrabianie materiału lub konsultacje przed sprawdzianem bez długoterminowej umowy. Płatność z góry przed zajęciami.',
      featured: false,
    },
    occasionalDuo: {
      name: 'DUO',
      frequency: 'lekcja okazjonalna',
      duration: '50 min',
      price: '80 zł / osoba',
      schemaPrice: '80',
      promo: {
        label: 'Jednorazowa lekcja dla nowych kursantów',
        price: '64 zł / osoba',
      },
      details:
        'Jednorazowa lekcja w parze dla osób, które potrzebują doraźnego wsparcia, konsultacji albo pomocy przed sprawdzianem. Płatność z góry przed zajęciami.',
      featured: false,
    },
    occasionalMorningOnlineIndividual: {
      name: 'Poranne online 1:1',
      frequency: 'lekcja okazjonalna do 12:00',
      duration: '50 min',
      price: '88 zł',
      schemaPrice: '88',
      details:
        'Jednorazowa lekcja online w porannym wariancie do godziny 12:00. Cena dotyczy zajęć od poniedziałku do piątku. Płatność z góry przed zajęciami.',
      featured: false,
    },
    occasionalMorningOnlineDuo: {
      name: 'Poranne online DUO',
      frequency: 'lekcja okazjonalna do 12:00',
      duration: '50 min',
      price: '64 zł / osoba',
      schemaPrice: '64',
      details:
        'Jednorazowa lekcja online w porannym wariancie do godziny 12:00 dla dwóch osób uczących się razem. Cena dotyczy zajęć od poniedziałku do piątku. Płatność z góry przed zajęciami.',
      featured: false,
    },
  },
  collections: {
    annualIndividual: ['individualAnnualWeekly', 'individualAnnualTwiceWeekly'],
    annualDuo: ['duoAnnualWeekly', 'duoAnnualTwiceWeekly'],
    annualExam: ['examGroup'],
    mini: ['miniIndividual', 'miniDuo'],
    semester: ['miniIndividual', 'miniDuo'],
    occasional: [
      'occasionalIndividual',
      'occasionalDuo',
      'occasionalMorningOnlineIndividual',
      'occasionalMorningOnlineDuo',
    ],
    morningOnline: [
      'onlineMorningIndividualAnnualWeekly',
      'onlineMorningIndividualAnnualTwiceWeekly',
      'onlineMorningDuoAnnualWeekly',
      'onlineMorningDuoAnnualTwiceWeekly',
      'occasionalMorningOnlineIndividual',
      'occasionalMorningOnlineDuo',
    ],
    offer: [
      'onlineMorningIndividualAnnualWeekly',
      'onlineMorningIndividualAnnualTwiceWeekly',
      'onlineMorningDuoAnnualWeekly',
      'onlineMorningDuoAnnualTwiceWeekly',
      'miniIndividual',
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'miniDuo',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'examGroup',
      'occasionalIndividual',
      'occasionalDuo',
      'occasionalMorningOnlineIndividual',
      'occasionalMorningOnlineDuo',
    ],
    eighthGradeExam: [
      'examGroup',
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'miniIndividual',
      'occasionalIndividual',
    ],
    maturaExam: [
      'examGroup',
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'miniIndividual',
      'occasionalIndividual',
    ],
    adultClasses: [
      'miniIndividual',
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'miniDuo',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'occasionalIndividual',
      'occasionalDuo',
    ],
    onlineClasses: [
      'miniIndividual',
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'miniDuo',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'examGroup',
      'occasionalIndividual',
      'occasionalDuo',
      'occasionalMorningOnlineIndividual',
      'occasionalMorningOnlineDuo',
    ],
  },
  promotions: {
    examEarlyBird: {
      label: '-10% na cały grupowy kurs egzaminacyjny',
      deadline: '31 lipca 2026 r.',
      regularTotalPrice: '2920 zł / osoba',
      promoTotalPrice: '2628 zł / osoba',
      savings: '292 zł',
      installmentPrice: '328,50 zł',
      paymentNote: '8 rat × 328,50 zł / osoba',
    },
    morningOnline: {
      label: 'Poranne zajęcia online',
      deadlineHour: '12:00',
    },
  },
})

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

export const getPricingPromotion = (promotionId) =>
  PRICING.promotions[promotionId] ?? null
