import IconImage from "$lib/icons/IconImage.svelte";
import IconBriefcase from "$lib/icons/IconBriefcase.svelte";
import IconGift from "$lib/icons/IconGift.svelte";
import IconList from "$lib/icons/IconList.svelte";
import IconMapPin from "$lib/icons/IconMapPin.svelte";
import IconPlus from "$lib/icons/IconPlus.svelte";
import IconThumbsUp from "$lib/icons/IconThumbsUp.svelte";
import IconClipBoard from "$lib/icons/IconClipBoard.svelte";

export const detail = {
    // ===== EXCURSIONS =====
    excursions: {
        sections: [
            {
                component: "HeroBlock",
                fields: [
                    "title",
                    "images",
                    "subtitle",
                    "rating",
                    "reviewsCount",
                ],
            },
            {
                component: "PriceBlock",
                fields: [
                    "price",
                    "discount",
                    "priceType",
                    "discountEnd",
                    "lang",
                ],
            },
            // {
            //     component: "ProductDetailsBlock",
            //     fields: ["distance", "duration", "groupSize", "start", "lang"],
            // },
            { component: "Description", fields: ["description"] },
            { component: "ScheduleBlock", fields: ["schedule", "lang"] }, //ленг прокидываем для заголовков
            { component: "InfoBlockArray", fields: ["whatYouSee", "lang"] },
            { component: "InfoBlockArray", fields: ["whyChooseUs", "lang"] },
            { component: "InfoBlockArray", fields: ["whatToBring", "lang"] },
            { component: "InfoBlockArray", fields: ["guarantees", "lang"] },
            { component: "InfoBlockArray", fields: ["includes", "lang"] },
            { component: "InfoBlockArray", fields: ["usp", "lang"] },
            { component: "MeetingPoint", fields: ["meetingPoint", "lang"] },
            { component: "GaleryCollage", fields: ["images"] },
            {
                component: "YouTubeVideo",
                fields: ["videoUrl", "title", "images", "lang"],
            },
            { component: "ReviewsList", fields: ["slug"] },
            { component: "RelatedSlider", fields: ["related"] },
            { component: "AboutBlock", fields: [] },
            { component: "ButtonBlock", fields: ["active", "type"] },
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
