// src/lib/config/app.config.js

import * as schemas from "$lib/schemas";
import * as forms from "$lib/admin/forms";
import { card } from "$lib/config/card/card.config";
import { seo } from "$lib/config/seo/seo.config";
import { lists } from "$lib/config/lists/list.config";
import { listAdmin } from "$lib/config/listsAdmin/list.admin.config";
import { listSeo } from "$lib/config/lists/list.seo.config";
import { cache } from "$lib/config/cache/cache.config";

import { homeConfig } from "$lib/config/layout/home.config.js";
import { footerConfig } from "$lib/config/layout/footer.config.js";
import { headerConfig } from "$lib/config/layout/header.config.js";
import { aboutConfig } from "$lib/config/layout/about.config.js";

// === Конфиги layout’а (главная, футер, хедер и т.д.)
export const layoutConfig = {
    home: homeConfig,
    footer: footerConfig,
    header: headerConfig,
    about: aboutConfig,
};

const collectionsMeta = [
    {
        name: "excursions",
        label: "Экскурсии",
        icon: "🗺️",
        reviews: true,
    },
    {
        name: "yachts",
        label: "Яхты",
        icon: "⛵",
        reviews: true,
    },
    {
        name: "cars",
        label: "Авто",
        icon: "🚗",
        reviews: true,
    },
    {
        name: "transfers",
        label: "Трансферы",
        icon: "🚕",
    },
    {
        name: "places",
        label: "Места",
        icon: "📍",
    },
    {
        name: "blogs",
        label: "Блог",
        icon: "📝",
    },
    {
        name: "faqs",
        label: "FAQ",
        icon: "❓",
    },
];

export const collectionsConfig = Object.fromEntries(
    collectionsMeta.map(({ name, label, icon, reviews }) => [
        name,
        {
            label,
            icon,
            schema: schemas[`${name}Schema`],
            formConfig: forms[`${name}FormConfig`],
            cardConfig: card[name],
            seoConfig: seo[name],
            listConfig: lists[name],
            adminListConfig: listAdmin[name],
            listSeoConfig: listSeo[name],
            cacheConfig: cache[name],
            defaultImage: `${name}_default.webp`,
            reviewCollection: reviews ? "reviews" : undefined,
        },
    ])
);
