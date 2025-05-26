export const excursions = [
    {
        id: 1,
        slug: "history-tour",
        title: {
            ru: "Обзорная экскурсия по историческому центру",
            en: "Sightseeing tour of the historical center",
        },
        metaDescription: {
            ru: "Экскурсия по историческому центру с профессиональным гидом. Посетите главные достопримечательности и узнайте тайны города. Длительность 2.5 часа.",
            en: "Historical center tour with professional guide. Visit main landmarks and discover city secrets. Duration 2.5 hours.",
        },
        description: {
            ru: "Погрузитесь в атмосферу старого города с нашим профессиональным гидом. Посетите знаменитые площади, соборы и скрытые от туристов уголки, где сохранился дух прошлых веков. Погрузитесь в атмосферу старого города с нашим профессиональным гидом. Посетите знаменитые площади, соборы и скрытые от туристов уголки, где сохранился дух прошлых веков. Погрузитесь в атмосферу старого города с нашим профессиональным гидом. Посетите знаменитые площади, соборы и скрытые от туристов уголки, где сохранился дух прошлых веков. Погрузитесь в атмосферу старого города с нашим профессиональным гидом. Посетите знаменитые площади, соборы и скрытые от туристов уголки, где сохранился дух прошлых веков.",
            en: "Immerse yourself in the atmosphere of the old town with our professional guide. Visit famous squares, cathedrals and hidden spots that preserve the spirit of bygone eras. Immerse yourself in the atmosphere of the old town with our professional guide. Visit famous squares, cathedrals and hidden spots that preserve the spirit of bygone eras. Immerse yourself in the atmosphere of the old town with our professional guide. Visit famous squares, cathedrals and hidden spots that preserve the spirit of bygone eras. Immerse yourself in the atmosphere of the old town with our professional guide. Visit famous squares, cathedrals and hidden spots that preserve the spirit of bygone eras.",
        },
        whatYouSee: [],
        images: ["/images/excursions/excursion1_1.webp"],
        labels: { ru: ["Популярные", "Скидка"], en: ["Popular", "Discount"] },
        start: 8.3,
        duration: 2.5,
        distanse: 20,
        groupSize: 10,
        price: 15,
        rating: 4,
        reviews: 142,
        categories: {
            ru: ["Популярные", "Топ 10", "Морские", "Горные"],
            en: ["Popular", "Top 10", "Sea", "Mountain"],
        },
        days: [1, 2, 3, 4, 5, 6, 7],
        tags: {
            ru: ["история", "пешеходная экскурсия", "достопримечательности"],
            en: ["history", "walking tour", "landmarks"],
        },
        meetingPoint: {
            ru: "Площадь Главного Собора, у фонтана",
            en: "Main Cathedral Square, by the fountain",
        },
        includes: {
            ru: [
                "Услуги гида",
                "Карта города",
                "Посещение 3 исторических объектов",
            ],
            en: ["Guide service", "City map", "Entrance to 3 historical sites"],
        },
        whatToBring: {
            ru: ["Удобная обувь", "Бутылка воды", "Фотоаппарат"],
            en: ["Comfortable shoes", "Water bottle", "Camera"],
        },
        faq: [
            {
                question: {
                    ru: "Нужна ли специальная физическая подготовка?",
                    en: "Is special physical training required?",
                },
                answer: {
                    ru: "Нет, маршрут доступен для людей с обычной физической подготовкой.",
                    en: "No, the route is suitable for people with average physical fitness.",
                },
            },
        ],
    },
    {
        id: 2,
        slug: "gastronomic-tour",
        title: { ru: "Гастрономический тур", en: "Gastronomic tour" },
        metaDescription: {
            ru: "Дегустация лучших блюд местной кухни в аутентичных ресторанах. 8 блюд и 3 напитка включены. Длительность 3 часа.",
            en: "Tasting of best local dishes in authentic restaurants. 8 dishes and 3 drinks included. Duration 3 hours.",
        },
        description: {
            ru: "Попробуйте лучшие блюда местной кухни в старейших ресторанах города. От уличной еды до изысканных блюд - полное погружение в гастрономическую культуру региона.",
            en: "Try the best local cuisine in the oldest restaurants in the city. From street food to gourmet dishes - complete immersion in the region's gastronomic culture.",
        },
        whatYouSee: [],
        images: ["/images/excursions/excursion1_2.webp"],
        labels: { ru: ["Популярные", "Скидка"], en: ["Popular", "Discount"] },
        start: 8.3,
        duration: 3,
        distanse: 20,
        groupSize: 8,
        price: 25,
        rating: 5,
        reviews: 87,
        categories: {
            ru: ["Популярные", "Топ 10", "Морские", "Горные", "Со скидкой"],
            en: ["Popular", "Top 10", "Sea", "Mountain", "Discount"],
        },
        days: [1, 2, 3, 4, 5, 6, 7],
        tags: {
            ru: ["еда", "дегустация", "рестораны", "кулинарный тур"],
            en: ["food", "tasting", "restaurants", "culinary tour"],
        },
        meetingPoint: {
            ru: "Центральный рынок, вход со стороны ул. Гурьевской",
            en: "Central Market, entrance from Gurievskaya street",
        },
        includes: {
            ru: [
                "8 блюд",
                "3 напитка",
                "Сопровождение гида",
                "Рекомендации по ресторанам",
            ],
            en: [
                "8 dishes",
                "3 drinks",
                "Guide service",
                "Restaurant recommendations",
            ],
        },
        whatToBring: {
            ru: ["Удобная обувь", "Бутылка воды", "Фотоаппарат"],
            en: ["Comfortable shoes", "Water bottle", "Camera"],
        },
        faq: [
            {
                question: {
                    ru: "Нужна ли специальная физическая подготовка?",
                    en: "Is special physical training required?",
                },
                answer: {
                    ru: "Нет, маршрут доступен для людей с обычной физической подготовкой.",
                    en: "No, the route is suitable for people with average physical fitness.",
                },
            },
        ],
    },
    {
        id: 3,
        slug: "night-tour",
        title: { ru: "Ночная экскурсия по городу", en: "City Night Tour" },
        metaDescription: {
            ru: "Вечерняя экскурсия по освещенным достопримечательностям с посещением лучших смотровых площадок. Длительность 2 часа.",
            en: "Evening tour of illuminated landmarks with visits to best viewpoints. Duration 2 hours.",
        },
        description: {
            ru: "Увидьте город в совершенно новом свете - ночные огни и тайны. Мы посетим самые атмосферные места, где оживают городские легенды, и полюбуемся панорамами с лучших смотровых площадок.",
            en: "See the city in a whole new light - night lights and mysteries. We'll visit the most atmospheric places where urban legends come alive, and enjoy panoramas from the best viewpoints.",
        },
        whatYouSee: [],
        images: ["/images/excursions/excursion1_3.webp"],
        labels: { ru: ["Популярные", "Скидка"], en: ["Popular", "Discount"] },
        start: 8.3,
        duration: 2,
        distanse: 20,
        groupSize: 12,
        price: 30,
        rating: 4,
        reviews: 56,
        categories: {
            ru: ["Популярные", "Топ 10", "Морские", "Горные"],
            en: ["Popular", "Top 10", "Sea", "Mountain"],
        },
        days: [1, 2, 3, 4, 5],
        tags: {
            ru: ["ночная экскурсия", "панорамы", "городские легенды"],
            en: ["night tour", "views", "urban legends"],
        },
        meetingPoint: {
            ru: "Памятник Основателям на Центральной набережной",
            en: "Founders Monument on Central Embankment",
        },
        includes: {
            ru: [
                "Сопровождение гида",
                "Посещение 2 смотровых площадок",
                "Фотосессия",
            ],
            en: ["Guide service", "Visit to 2 viewpoints", "Photoshoot"],
        },
        whatToBring: {
            ru: ["Удобная обувь", "Бутылка воды", "Фотоаппарат"],
            en: ["Comfortable shoes", "Water bottle", "Camera"],
        },
        faq: [
            {
                question: {
                    ru: "Нужна ли специальная физическая подготовка?",
                    en: "Is special physical training required?",
                },
                answer: {
                    ru: "Нет, маршрут доступен для людей с обычной физической подготовкой.",
                    en: "No, the route is suitable for people with average physical fitness.",
                },
            },
        ],
    },
];
