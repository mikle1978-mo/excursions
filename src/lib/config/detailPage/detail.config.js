export const detail = {
    // ===== EXCURSIONS =====
    excursions: {
        sections: [
            {
                component: "HeroBlock",
                uses: [
                    "title",
                    "images",
                    "subtitle",
                    "rating",
                    "reviewsCount",
                    "lang",
                ],
            },
            {
                component: "PriceBlock",
                uses: [
                    "price",
                    "discount",
                    "oldPrice",
                    "priceType",
                    "discountEnd",
                    "lang",
                ],
            },
            { component: "Description", uses: ["description"] },
            { component: "ProductDetailsBlock", uses: ["details"] },
            { component: "ScheduleBlock", uses: ["schedule"] },
            { component: "InfoBlockArray", uses: ["whatYouSee"] },
            { component: "GaleryCollage", uses: ["images"] },
            { component: "YouTubeVideo", uses: ["youtube"] },
            { component: "ReviewsList", uses: ["slug"] },
            { component: "RelatedSlider", uses: ["related"] },
            { component: "BookingCard", uses: ["slug", "price"] },
        ],
    },

    // ===== YACHTS =====
    yachts: {
        sections: [
            {
                component: "HeroBlock",
                uses: ["title", "images", "shortDescription"],
            },
            { component: "PriceBlock", uses: ["price", "discount"] },
            { component: "ProductDetailsBlock", uses: ["details"] },
            { component: "InfoBlockArray", uses: ["equipment"] }, // список — у яхт всегда есть
            { component: "GaleryCollage", uses: ["images"] },
            { component: "Description", uses: ["description"] },
            { component: "YouTubeVideo", uses: ["youtube"] },
            { component: "ReviewsList", uses: ["slug"] },
            { component: "RelatedSlider", uses: ["related"] },
            { component: "BookingCard", uses: ["slug", "price"] },
        ],
    },

    // ===== CARS =====
    cars: {
        sections: [
            { component: "HeroBlock", uses: ["title", "images"] },
            { component: "PriceBlock", uses: ["price", "discount"] },
            { component: "ProductDetailsBlock", uses: ["details"] }, // характеристики
            { component: "InfoBlockArray", uses: ["features"] }, // особенности авто
            { component: "GaleryCollage", uses: ["images"] },
            { component: "Description", uses: ["description"] },
            { component: "ReviewsList", uses: ["slug"] },
            { component: "RelatedSlider", uses: ["related"] },
            { component: "BookingCard", uses: ["slug", "price"] },
        ],
    },

    // ===== TRANSFERS =====
    transfers: {
        sections: [
            { component: "HeroBlock", uses: ["title", "images"] },
            { component: "PriceBlock", uses: ["price"] }, // обычный трансфер — без скидок
            { component: "ProductDetailsBlock", uses: ["details"] },
            { component: "InfoBlockArray", uses: ["included"] }, // что включено
            { component: "Description", uses: ["description"] },
            { component: "ReviewsList", uses: ["slug"] },
            { component: "RelatedSlider", uses: ["related"] },
            { component: "BookingCard", uses: ["slug", "price"] },
        ],
    },

    // ===== PLACES (туристические места) =====
    places: {
        sections: [
            { component: "HeroBlock", uses: ["title", "images"] },
            { component: "Description", uses: ["description"] },
            { component: "GaleryCollage", uses: ["images"] },
            { component: "InfoBlockArray", uses: ["facts"] }, // список фактов
            { component: "YouTubeVideo", uses: ["youtube"] },
            { component: "RelatedSlider", uses: ["related"] },
        ],
    },

    // ===== BLOGS =====
    blogs: {
        sections: [
            {
                component: "HeroBlock",
                uses: ["title", "images", "author", "publishDate"],
            },
            { component: "Description", uses: ["content"] },
            { component: "GaleryCollage", uses: ["images"] },
            { component: "Share", uses: ["slug", "title"] },
            { component: "RelatedSlider", uses: ["related"] },
        ],
    },

    // ===== FAQ =====
    faqs: {
        sections: [
            { component: "HeroBlock", uses: ["title"] },
            { component: "Description", uses: ["answer"] },
            { component: "RelatedSlider", uses: ["related"] },
        ],
    },

    // ===== REALTY (аренда недвижимости) =====
    realty: {
        sections: [
            { component: "HeroBlock", uses: ["title", "images", "location"] },
            { component: "PriceBlock", uses: ["price", "discount"] },
            { component: "ProductDetailsBlock", uses: ["details"] }, // параметры: площадь, комнаты, этаж
            { component: "InfoBlockArray", uses: ["amenities"] }, // удобства
            { component: "GaleryCollage", uses: ["images"] },
            { component: "Description", uses: ["description"] },
            { component: "YouTubeVideo", uses: ["youtube"] },
            { component: "ReviewsList", uses: ["slug"] },
            { component: "RelatedSlider", uses: ["related"] },
            { component: "BookingCard", uses: ["slug", "price"] },
        ],
    },
};
