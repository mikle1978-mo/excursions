import { currentYear } from "$lib/constants/date";

export const main_page = {
    title: {
        ru: `Все, что нужно для комфортного отдыха в Кемере!`,
        en: `Everything you need for a comfortable vacation in Kemer!`,
    },
    pages: [
        {
            title: {
                ru: `Экскурсии в Кемере ${currentYear}`,
                en: "Kemer Excursions ${currentYear}",
            },
            link: "excursions",
            img: "/images/excursions/excursion_default.webp",
            set: [
                {
                    url: "/images/excursions/excursion_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/excursions/excursion_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/excursions/excursion_default-800.webp",
                    width: "800w",
                },
            ],
        },
        {
            title: {
                ru: "Прогулки на яхте",
                en: "Yacht Tours",
            },
            link: "yachts",
            img: "/images/yachts/yacht_default.webp",
            set: [
                { url: "/images/yachts/yacht_default-400.webp", width: "400w" },
                { url: "/images/yachts/yacht_default-600.webp", width: "600w" },
                { url: "/images/yachts/yacht_default-800.webp", width: "800w" },
            ],
        },
        {
            title: {
                ru: "Аренда автомобилей",
                en: "Car Rentals",
            },
            link: "cars",
            img: "/images/cars/car_default.webp",
            set: [
                { url: "/images/cars/car_default-400.webp", width: "400w" },
                { url: "/images/cars/car_default-600.webp", width: "600w" },
                { url: "/images/cars/car_default-800.webp", width: "800w" },
            ],
        },
        {
            title: {
                ru: "Аренда недвижимости",
                en: "Property Rental",
            },
            link: "development",
            img: "/images/property/property_default.webp",
            set: [
                {
                    url: "/images/property/property_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/property/property_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/property/property_default-800.webp",
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
            img: "/images/transfers/transfer_default.webp",
            set: [
                {
                    url: "/images/transfers/transfer_default-400.webp",
                    width: "400w",
                },
                {
                    url: "/images/transfers/transfer_default-600.webp",
                    width: "600w",
                },
                {
                    url: "/images/transfers/transfer_default-800.webp",
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
            img: "/images/places/place_default.webp",
            set: [
                { url: "/images/places/place_default-400.webp", width: "400w" },
                { url: "/images/places/place_default-600.webp", width: "600w" },
                { url: "/images/places/place_default-800.webp", width: "800w" },
            ],
        },
    ],
};
