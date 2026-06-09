export const PRICING = Object.freeze({
  plans: {
    individualStandard: {
      name: 'Standardowy 1:1',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '60 min',
      price: '350 zł / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Regularne zajęcia indywidualne raz w tygodniu, z programem dopasowanym do potrzeb ucznia i stałym miejscem w grafiku.',
      featured: true,
      contexts: {
        eighthGradeExam: {
          details:
            '30 spotkań po 60 min raz w tygodniu w pakiecie stałym, indywidualna praca nad potrzebami ucznia.',
        },
        maturaExam: {
          details:
            '30 spotkań po 60 min raz w tygodniu w pakiecie stałym, plan pod poziom podstawowy lub rozszerzony.',
        },
        adultClasses: {
          details:
            '30 spotkań po 60 min raz w tygodniu w pakiecie stałym, tempo i materiały dopasowane do celu dorosłego kursanta.',
        },
      },
    },
    individualIntensive: {
      name: 'Intensywny 1:1',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '90 min',
      price: '500 zł / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Dłuższe zajęcia indywidualne raz w tygodniu dla osób, które potrzebują więcej praktyki, powtórek lub szybszego tempa pracy.',
      featured: false,
      contexts: {
        eighthGradeExam: {
          details:
            '30 spotkań po 90 min raz w tygodniu w pakiecie stałym, więcej czasu na arkusze, powtórki i strategię.',
        },
        maturaExam: {
          details:
            '30 spotkań po 90 min raz w tygodniu w pakiecie stałym, rozszerzona praca nad arkuszami, pisaniem i gramatyką.',
        },
        adultClasses: {
          details:
            '30 spotkań po 90 min raz w tygodniu w pakiecie stałym, dobra opcja przy konwersacjach lub intensywnym powrocie do nauki.',
        },
      },
    },
    duoStandard: {
      name: 'Standardowy DUO',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '60 min',
      price: '275 zł / osoba / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Zajęcia w parze raz w tygodniu dla osób, które chcą uczyć się razem i pracować w podobnym tempie.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '30 spotkań po 60 min raz w tygodniu dla dwóch osób uczących się razem w stałym miesięcznym pakiecie.',
        },
      },
    },
    duoIntensive: {
      name: 'Intensywny DUO',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '90 min',
      price: '350 zł / osoba / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Dłuższe spotkania w parze raz w tygodniu, z większą ilością rozmowy, ćwiczeń i informacji zwrotnej.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '30 spotkań po 90 min raz w tygodniu dla dwóch osób uczących się razem w stałym miesięcznym pakiecie.',
        },
      },
    },
    trioStandard: {
      name: 'TRIO Standardowy',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '60 min',
      price: '320 zł / osoba / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Kameralna grupa trzyosobowa raz w tygodniu, tworzona przez kursantów ze wspólnym celem językowym.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '30 spotkań po 60 min raz w tygodniu dla trzech osób ze wspólnym celem językowym w stałym miesięcznym pakiecie.',
        },
      },
    },
    trioIntensive: {
      name: 'TRIO Intensywny',
      frequency: '30 spotkań, 1× tygodniowo',
      duration: '90 min',
      price: '400 zł / osoba / miesiąc',
      details:
        'Pakiet stały obejmuje 30 spotkań. Intensywniejszy wariant pracy w małej grupie raz w tygodniu, z większą ilością praktyki i powtórek.',
      featured: false,
      contexts: {
        adultClasses: {
          details:
            '30 spotkań po 90 min raz w tygodniu dla trzech osób ze wspólnym celem językowym w stałym miesięcznym pakiecie.',
        },
      },
    },
    examGroup: {
      name: 'Egzaminacyjny',
      frequency: '25 spotkań, 1× tygodniowo',
      duration: '90 min',
      price: '330 zł / osoba / miesiąc',
      details:
        'Kurs egzaminacyjny obejmuje 25 spotkań raz w tygodniu w czteroosobowej grupie, z arkuszami, strategiami oraz powtórkami gramatyczno-leksykalnymi.',
      featured: false,
      contexts: {
        offer: {
          name: 'Egzaminacyjny (4 osoby)',
        },
        eighthGradeExam: {
          details:
            '25 spotkań po 90 min raz w tygodniu w czteroosobowej grupie egzaminacyjnej, z pracą na arkuszach i strategiami.',
        },
        maturaExam: {
          details:
            '25 spotkań po 90 min raz w tygodniu w czteroosobowej grupie egzaminacyjnej dobranej poziomem i celem.',
        },
      },
    },
    expressIndividual: {
      name: 'EXPRESS 1:1',
      frequency: '15 lekcji',
      duration: '15 × 90 min',
      price: '2000 zł',
      details:
        'Intensywny kurs krótkoterminowy dla osób z konkretnym celem: egzaminem, nadrobieniem materiału, wyjazdem lub pracą. Możliwość płatności w 4 ratach.',
      featured: false,
    },
    expressDuo: {
      name: 'EXPRESS DUO',
      frequency: '15 lekcji',
      duration: '15 × 90 min',
      price: '3000 zł za parę',
      details:
        'Intensywny kurs krótkoterminowy w parze. Możliwość płatności w 4 ratach.',
      featured: false,
    },
    occasionalIndividual: {
      name: 'Lekcja indywidualna',
      frequency: 'lekcja okazjonalna',
      duration: '60 min',
      price: '110 zł',
      details:
        'Jednorazowe wsparcie, konsultacja lub pomoc przed sprawdzianem albo egzaminem. Płatność z góry przed zajęciami.',
      featured: false,
    },
    occasionalDuo: {
      name: 'DUO',
      frequency: 'lekcja okazjonalna',
      duration: '60 min',
      price: '170 zł za parę',
      details:
        'Jednorazowa lekcja dla dwóch osób, dobra do doraźnego wsparcia lub konsultacji. Płatność z góry przed zajęciami.',
      featured: false,
    },
  },
  collections: {
    regularIndividual: ['individualStandard', 'individualIntensive'],
    regularDuo: ['duoStandard', 'duoIntensive'],
    regularGroups: ['trioStandard', 'trioIntensive', 'examGroup'],
    express: ['expressIndividual', 'expressDuo'],
    occasional: ['occasionalIndividual', 'occasionalDuo'],
    offer: [
      'individualStandard',
      'individualIntensive',
      'duoStandard',
      'duoIntensive',
      'trioStandard',
      'trioIntensive',
      'examGroup',
      'expressIndividual',
      'expressDuo',
      'occasionalIndividual',
      'occasionalDuo',
    ],
    eighthGradeExam: [
      'examGroup',
      'expressIndividual',
      'individualStandard',
      'individualIntensive',
    ],
    maturaExam: [
      'examGroup',
      'expressIndividual',
      'individualStandard',
      'individualIntensive',
    ],
    adultClasses: [
      'individualStandard',
      'individualIntensive',
      'duoStandard',
      'duoIntensive',
      'trioStandard',
      'trioIntensive',
      'expressIndividual',
      'expressDuo',
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
