// src/lib/config/app.config.js

import * as schemas from "$lib/schemas";
import * as forms from "$lib/admin/forms";
import { card } from "$lib/config/card/card.config";
import { seo } from "$lib/config/seo/seo.config";
import { seoSchemas } from "$lib/config/seo/seoSchemas.config";
import { list } from "$lib/config/list/list.config";
import { detail } from "$lib/config/detailPage/detail.config";
import { blocksConfig } from "$lib/config/blocks/blocks.config.js";
import { listAdmin } from "$lib/config/listAdmin/list.admin.config";
import { cache } from "$lib/config/cache/cache.config";
import { defaultImage } from "$lib/config/defaultImage/image.config.js";

import { homeConfig } from "$lib/config/layout/home.config.js";
import { footerConfig } from "$lib/config/layout/footer.config.js";
import { headerConfig } from "$lib/config/layout/header.config.js";
import { aboutConfig } from "$lib/config/layout/about.config.js";
import { entryConfig } from "$lib/config/layout/entry.config.js";

import { currencyConfig } from "$lib/config/services/currency.config.js";

import {
    SUPPORTED_LANGUAGES,
    LANG_META,
} from "$lib/constants/supportedLanguages.js";

// === Layout — общие элементы
const layoutConfig = {
    header: headerConfig,
    footer: footerConfig,
};

// === Page-specific конфиги (поведение конкретных страниц)
export const pagesConfig = {
    entry: entryConfig,
    home: homeConfig,
    about: aboutConfig,
};

// === Коллекции — только сущности и их свойства
const collectionsMeta = [
    { name: "home", label: "Главная", icon: "🗺️" },
    { name: "about", label: "О нас", icon: "🗺️" },
    { name: "excursions", label: "Экскурсии", icon: "🗺️" },
    { name: "yachts", label: "Яхты", icon: "⛵" },
    { name: "cars", label: "Авто", icon: "🚗" },
    { name: "transfers", label: "Трансферы", icon: "🚕" },
    { name: "places", label: "Места", icon: "📍" },
    { name: "blogs", label: "Блог", icon: "📝" },
    { name: "faqs", label: "FAQ", icon: "❓" },
];

export const collectionsConfig = Object.fromEntries(
    collectionsMeta.map(({ name, label, icon, detailPage }) => [
        name,
        {
            label,
            icon,
            schema: schemas[`${name}Schema`],
            formConfig: forms[`${name}FormConfig`],
            cardConfig: card[name], // карточка коллекции
            detailPage: detail[name],
        },
    ]),
);

// === Главный конфиг приложения
export const appConfig = {
    layout: layoutConfig,
    pages: pagesConfig,
    blocks: blocksConfig,
    collections: collectionsConfig,
    services: {
        currency: currencyConfig,
    },
    seo, // глобальный SEO конфиг
    seoSchemas: seoSchemas, // схемы для SEO
    cache, // глобальный кеш конфиг
    list, // списки для фронта
    listAdmin, // списки для админки
    defaultImage: defaultImage, // конфиг для изображений по умолчанию
    languages: {
        supported: SUPPORTED_LANGUAGES, //поддерживаемые языки
        meta: LANG_META, // мета-информация по языкам
    },
};
