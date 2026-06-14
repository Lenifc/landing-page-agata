export const PRICING = Object.freeze({
  plans: {
    individualAnnualWeekly: {
      name: 'Indywidualne (1:1) - Standard',
      frequency: '30 lekcji',
      duration: '50 min',
      price: '10 rat × 280 zł',
      schemaPrice: '280',
      details:
        'Kurs obejmuje 30 lekcji po 50 minut, odbywających się zazwyczaj raz w tygodniu.',
      featured: true,
      contexts: {
        eighthGradeExam: {
          details:
            '30 lekcji po 50 min w pakiecie rocznym 1:1 Standard, z programem dopasowanym do potrzeb ucznia i terminu egzaminu.',
        },
        maturaExam: {
          details:
            '30 lekcji po 50 min w pakiecie rocznym 1:1 Standard, z planem pod poziom podstawowy lub rozszerzony.',
        },
        adultClasses: {
          details:
            '30 lekcji po 50 min w pakiecie rocznym 1:1 Standard, z tempem i materiałami dopasowanymi do celu dorosłego kursanta.',
        },
      },
    },
    individualAnnualTwiceWeekly: {
      name: 'Indywidualne (1:1) - Intense',
      frequency: '60 lekcji',
      duration: '50 min',
      price: '10 rat × 512 zł',
      schemaPrice: '512',
      details:
        'Kurs składa się z 60 lekcji po 50 minut, odbywających się zwykle raz w tygodniu w bloku zajęć (jedna po drugiej).',
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '60 lekcji po 50 min w pakiecie rocznym 1:1 Intense dla uczniów potrzebujących bardziej regularnej pracy przed egzaminem.',
        },
        maturaExam: {
          details:
            '60 lekcji po 50 min w pakiecie rocznym 1:1 Intense dla maturzystów potrzebujących mocniejszego rytmu przygotowań.',
        },
        adultClasses: {
          details:
            '60 lekcji po 50 min w pakiecie rocznym 1:1 Intense dla dorosłych, którzy chcą szybciej wrócić do angielskiego lub utrzymać mocniejszy rytm nauki.',
        },
      },
    },
    duoAnnualWeekly: {
      name: 'DUO - Standard',
      frequency: '30 lekcji',
      duration: '50 min',
      price: '10 rat × 210 zł / osoba',
      schemaPrice: '210',
      details:
        'Kurs dla osób uczących się w parze. 30 spotkań po 50 minut, odbywających się zazwyczaj raz w tygodniu.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '30 lekcji po 50 min w pakiecie rocznym DUO Standard dla dwóch osób uczących się razem.',
        },
      },
    },
    duoAnnualTwiceWeekly: {
      name: 'DUO - Intense',
      frequency: '60 lekcji',
      duration: '50 min',
      price: '10 rat × 380 zł / osoba',
      schemaPrice: '380',
      details:
        'Kurs dla osób uczących się w parze. 60 spotkań po 50 minut, odbywających się zazwyczaj w bloku zajęć (jedna po drugiej).',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '60 lekcji po 50 min w pakiecie rocznym DUO Intense dla dwóch osób uczących się razem.',
        },
      },
    },
    examGroup: {
      name: 'Kurs egzaminacyjny',
      frequency: '25 lekcji',
      duration: '100 min (2×50 min)',
      price: '10 rat × 300 zł / osoba',
      schemaPrice: '300',
      details: `Kurs egzaminacyjny dla uczniów klasy 8 oraz maturzystów obejmuje 25 spotkań po 100 minut w
        kameralnej grupie maksymalnie 4-osobowej. Zajęcia odbywają się raz w tygodniu w bloku
        (jedna po drugiej). W sumie to ponad 41 godzin nauki, a kurs kończy się przed terminem
        egzaminu`,
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '25 lekcji po 100 minut w kameralnej grupie maksymalnie 4-osobowej. Program obejmuje arkusze, strategie i najważniejsze powtórki przed egzaminem.',
        },
        maturaExam: {
          details:
            '25 lekcji po 100 minut w kameralnej grupie maksymalnie 4-osobowej, z pracą na arkuszach, strategiach i najważniejszych obszarach do poprawy.',
        },
      },
    },
    miniIndividual: {
      name: 'Indywidualne (1:1) - Mini',
      frequency: '20 lekcji',
      duration: '50 min',
      price: '8 rat × 250 zł',
      schemaPrice: '250',
      details: `Kurs obejmuje 20 spotkań po 50 minut, odbywających się zazwyczaj raz w tygodniu.
        To krótszy cykl nauki z płatnością rozłożoną na 8 rat.`,
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '20 lekcji po 50 min w pakiecie MINI 1:1, dobrym jako intensywne wsparcie przed egzaminem ósmoklasisty.',
        },
        maturaExam: {
          details:
            '20 lekcji po 50 min w pakiecie MINI 1:1, dobrym jako intensywne wsparcie przed maturą.',
        },
        adultClasses: {
          details:
            '20 lekcji po 50 min w pakiecie MINI 1:1, jeśli potrzebujesz krótszego cyklu nauki bez zobowiązania od września do czerwca.',
        },
      },
    },
    miniDuo: {
      name: 'DUO - Mini',
      frequency: '20 lekcji',
      duration: '50 min',
      price: '8 rat × 187 zł / osoba',
      schemaPrice: '187',
      details:
        'Pakiet MINI DUO obejmuje 20 lekcji po 50 min dla dwóch osób. To krótszy cykl nauki z płatnością rozłożoną na 8 rat.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '20 lekcji po 50 min w pakiecie MINI DUO dla dwóch osób, które chcą uczyć się razem w krótszym cyklu.',
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
        label: 'Pierwsza lekcja -20%',
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
        label: 'Pierwsza lekcja -20%',
        price: '64 zł / osoba',
      },
      details:
        'Jednorazowa lekcja w parze dla osób, które potrzebują doraźnego wsparcia, konsultacji albo pomocy przed sprawdzianem. Płatność z góry przed zajęciami.',
      featured: false,
    },
  },
  collections: {
    annualIndividual: ['individualAnnualWeekly', 'individualAnnualTwiceWeekly'],
    annualDuo: ['duoAnnualWeekly', 'duoAnnualTwiceWeekly'],
    annualExam: ['examGroup'],
    mini: ['miniIndividual', 'miniDuo'],
    semester: ['miniIndividual', 'miniDuo'],
    occasional: ['occasionalIndividual', 'occasionalDuo'],
    offer: [
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'examGroup',
      'miniIndividual',
      'miniDuo',
      'occasionalIndividual',
      'occasionalDuo',
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
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'miniIndividual',
      'miniDuo',
      'occasionalIndividual',
      'occasionalDuo',
    ],
    onlineClasses: [
      'individualAnnualWeekly',
      'individualAnnualTwiceWeekly',
      'duoAnnualWeekly',
      'duoAnnualTwiceWeekly',
      'examGroup',
      'miniIndividual',
      'miniDuo',
      'occasionalIndividual',
      'occasionalDuo',
    ],
  },
})

export const getPricingPlans = (collection) =>
  (PRICING.collections[collection] ?? []).map((planId) => {
    const { contexts, ...plan } = PRICING.plans[planId]

    return {
      id: planId,
      ...plan,
      ...(contexts?.[collection] ?? {}),
    }
  })
