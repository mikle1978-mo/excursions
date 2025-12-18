import { currentYear } from "$lib/constants/date";

export const footerConfig = {
    title: {
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
            img: "/images/excursions/excursions_default.webp",
            set: [
                {
                    url: "/images/excursions/excursions_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/excursions/excursions_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/excursions/excursions_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: `Аренда яхт в Кемере ${currentYear}`,
                en: `Yacht Rent in Kemer ${currentYear}`,
            },
            link: "yachts",
            img: "/images/yachts/yachts_default.webp",
            set: [
                {
                    url: "/images/yachts/yachts_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/yachts/yachts_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/yachts/yachts_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: `Аренда авто в Кемере ${currentYear}`,
                en: `Car Rental in Kemer ${currentYear}`,
            },
            link: "cars",
            img: "/images/cars/cars_default.webp",
            set: [
                { url: "/images/cars/cars_default-400.webp", width: "400w" },
                { url: "/images/cars/cars_default-600.webp", width: "600w" },
                { url: "/images/cars/cars_default-800.webp", width: "800w" },
            ],
        },
        {
            title: {
                ru: "Аренда недвижимости",
                en: "Property Rental",
            },
            link: "development",
            img: "/images/property/properties_default.webp",
            set: [
                {
                    url: "/images/property/properties_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/property/properties_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/property/properties_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: "Трансфер",
                en: "Transfer",
            },
            link: "transfers/aeroport-antalya-mercedes-vito",
            img: "/images/transfers/transfers_default.webp",
            set: [
                {
                    url: "/images/transfers/transfers_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/transfers/transfers_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/transfers/transfers_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: "Места",
                en: "Places",
            },
            link: "places",
            img: "/images/places/places_default.webp",
            set: [
                {
                    url: "/images/places/places_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/places/places_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/places/places_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: "Новости/События",
                en: "News/Events",
            },
            link: "blogs",
            img: "/images/blogs/blogs_default.webp",
            set: [
                { url: "/images/blogs/blogs_default-400.webp", width: "400w" },
                { url: "/images/blogs/blogs_default-600.webp", width: "600w" },
                { url: "/images/blogs/blogs_default-800.webp", width: "800w" },
            ],
        },
        {
            title: {
                ru: "О нас",
                en: "About Us",
            },
            link: "about",
            img: "/images/about/about5.webp",
            set: [
                { url: "/images/about/about5-400.webp", width: "400w" },
                { url: "/images/about/about5-600.webp", width: "600w" },
                { url: "/images/about/about5-800.webp", width: "800w" },
            ],
        },
    ],
};
