export const PRICING = Object.freeze({
  plans: {
    individualWeekly: {
      name: 'Indywidualne',
      frequency: '1× tygodniowo',
      duration: '50 min',
      price: '100 zł',
      details:
        'Idealne rozwiązanie dla osób, które chcą uczyć się we własnym tempie i skupić się na swoim celu.',
      featured: true,
      contexts: {
        eighthGradeExam: {
          details:
            '50 min, 1× tygodniowo, praca dokładnie nad potrzebami ucznia.',
        },
        maturaExam: {
          details:
            '50 min, 1× tygodniowo, plan pod poziom podstawowy lub rozszerzony.',
        },
        adultClasses: {
          details: '50 min, 1× tygodniowo.',
        },
      },
    },
    individualTwiceWeekly: {
      name: 'Indywidualne regularnie',
      frequency: '2× tygodniowo',
      duration: '50 min',
      price: '90 zł',
      details:
        'Większa regularność i szybsze efekty. Opcja dla osób, które chcą mocno przyspieszyć postępy.',
      featured: false,
      contexts: {
        offer: {
          name: 'Indywidualne',
        },
        eighthGradeExam: {
          details: '50 min przy 2 zajęciach tygodniowo.',
        },
        maturaExam: {
          details: '50 min przy 2 zajęciach tygodniowo.',
        },
        adultClasses: {
          details: '50 min przy 2 zajęciach tygodniowo.',
        },
      },
    },
    duo: {
      name: 'DUO',
      frequency: '2 osoby',
      duration: '50 min',
      price: '150 zł za parę',
      details:
        'Dla znajomych, rodzeństwa lub par, które chcą uczyć się razem i wzajemnie motywować.',
      featured: false,
      contexts: {
        adultClasses: {
          details: '50 min dla dwóch osób uczących się razem.',
        },
      },
    },
    trio: {
      name: 'TRIO',
      frequency: '3 osoby',
      duration: '50 min',
      price: '180 zł za grupę',
      details:
        '3-osobowa grupa tworzona przez kursantów. Dla znajomych, którzy uczą się razem i mają wspólny cel językowy.',
      featured: false,
      contexts: {
        adultClasses: {
          details: '50 min dla trzech osób ze wspólnym celem językowym.',
        },
      },
    },
    examGroup: {
      name: 'Grupa egzaminacyjna',
      frequency: '4 osoby',
      duration: '100 min (2 × 50 min)',
      price: '120 zł za osobę',
      details:
        'Rozwiązywanie zadań egzaminacyjnych, nauka strategii oraz powtórki gramatyczne i leksykalne.',
      featured: false,
      contexts: {
        eighthGradeExam: {
          details: '100 min (2 × 50 min), kameralna grupa 4 osoby.',
        },
        maturaExam: {
          details: '100 min (2 × 50 min), grupa 4 osoby dobrana poziomem.',
        },
      },
    },
  },
  collections: {
    offer: [
      'individualWeekly',
      'individualTwiceWeekly',
      'duo',
      'trio',
      'examGroup',
    ],
    eighthGradeExam: ['examGroup', 'individualWeekly', 'individualTwiceWeekly'],
    maturaExam: ['examGroup', 'individualWeekly', 'individualTwiceWeekly'],
    adultClasses: ['individualWeekly', 'individualTwiceWeekly', 'duo', 'trio'],
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
