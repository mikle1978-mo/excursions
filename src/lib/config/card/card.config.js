// src/lib/config/card/card.config.js
import { CardAdapter } from "$lib/features/card/card.adapter.js";
import { badgeRules } from "$lib/config/card/badgeRules.config.js";
import { ImageBlockAdapter } from "$lib/features/card/sections/image.adapter";
import { TitleBlockAdapter } from "$lib/features/card/sections/title.adapter";
import { HeroBlockAdapter } from "$lib/features/card/sections/hero.adapter";
import { PriceBlockAdapter } from "$lib/features/card/sections/price.adapter";
import { RatingBlockAdapter } from "$lib/features/card/sections/rating.adapter";
import { TextBlockAdapter } from "$lib/features/card/sections/text.adapter";
import { DateBlockAdapter } from "$lib/features/card/sections/date.adapter";

export const card = {
    excursions: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },

            {
                component: "RatingBlock",
                adapter: RatingBlockAdapter,
                fields: ["rating", "reviewsCount"],
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                fields: ["price", "discount", "discountEnd"],
                position: "footer",
            },
        ],
    },
    yachts: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },

            {
                component: "RatingBlock",
                adapter: RatingBlockAdapter,
                fields: ["rating", "reviewsCount"],
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                fields: ["price", "discount", "discountEnd"],
                position: "footer",
            },
        ],
    },
    cars: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },

            {
                component: "RatingBlock",
                adapter: RatingBlockAdapter,
                fields: ["rating", "reviewsCount"],
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                fields: ["price", "discount", "discountEnd"],
                position: "footer",
            },
        ],
    },
    transfers: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },

            {
                component: "RatingBlock",
                adapter: RatingBlockAdapter,
                fields: ["rating", "reviewsCount"],
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                fields: ["price", "discount", "discountEnd"],
                position: "footer",
            },
        ],
    },
    places: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },
            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },
            {
                component: "TextBlock",
                adapter: TextBlockAdapter,
                fields: ["subtitle"],
                source: "subtitle",
            },
        ],
    },
    blogs: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
                source: "title",
            },
            {
                component: "TextBlock",
                adapter: TextBlockAdapter,
                fields: ["subtitle"],
                source: "subtitle",
            },

            {
                component: "DateBlock",
                adapter: DateBlockAdapter,
                fields: ["publishDate"],
                source: "publishDate",
                position: "footer",
            },
        ],
    },
    faqs: {
        overlays: {
            badges: {
                rules: badgeRules,
            },
        },
        sections: [
            {
                component: "HeroBlock",
                adapter: HeroBlockAdapter,
                fields: ["images", "title"],
                position: "header",
            },

            {
                component: "TitleBlock",
                adapter: TitleBlockAdapter,
                fields: ["title"],
            },

            {
                component: "RatingBlock",
                adapter: RatingBlockAdapter,
                fields: ["rating", "reviewsCount"],
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                fields: ["price", "discount", "discountEnd"],
                position: "footer",
            },
        ],
    },
};
