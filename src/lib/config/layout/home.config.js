import { currentYear } from "$lib/constants/date";

export const homeConfig = {
    h1: {
        ru: `Все, что нужно для комфортного отдыха в Кемере!`,
        en: `Everything you need for a comfortable vacation in Kemer!`,
    },
    pages: [
        {
            title: {
                ru: `Экскурсии в Кемере ${currentYear}`,
                en: `Kemer Excursions ${currentYear}`,
            },
            link: "excursions",
            type: "excursions",
        },
        {
            title: {
                ru: `Аренда яхт в Кемере ${currentYear}`,
                en: `Yacht Rent in Kemer ${currentYear}`,
            },
            link: "yachts",
            type: "yachts",
        },
        {
            title: {
                ru: `Аренда авто в Кемере ${currentYear}`,
                en: `Car Rental in Kemer ${currentYear}`,
            },
            link: "cars",
            type: "cars",
        },
        {
            title: {
                ru: "Аренда недвижимости",
                en: "Property Rental",
            },
            link: "development",
            type: "properties",
        },
        {
            title: {
                ru: "Трансфер",
                en: "Transfer",
            },
            link: "transfers/aeroport-antalya-mercedes-vito",
            type: "transfers",
        },
        {
            title: {
                ru: "Места",
                en: "Places",
            },
            link: "places",
            type: "places",
        },
        {
            title: {
                ru: "Новости/События",
                en: "News/Events",
            },
            link: "blogs",
            type: "blogs",
        },
        {
            title: {
                ru: "О нас",
                en: "About Us",
            },
            link: "about",
            type: "about",
        },
    ],
    seo: {
        title: {
            ru: "Отдых в Кемере — экскурсии, аренда яхт и авто, трансфер",
            en: "Kemer Vacation — Tours, Yacht & Car Rentals, Transfers",
        },
        description: {
            ru: "Все для комфортного отдыха в Кемере: экскурсии, аренда яхт и автомобилей, трансферы.",
            en: "Everything for a comfortable stay in Kemer: excursions, yacht and car rentals, and transfers.",
        },
        keywords: {
            ru: "отдых, кемере, экскурсии, аренда, яхт, автомобилей, трансферы, комфортного, бизнеса, турции",
            en: "kemer, vacation, comfortable, excursions, yacht, car, rentals, transfers, stay, everything",
        },
    },
};
