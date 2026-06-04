// src\lib\config\seo\seoSchemas.config.js
import { buildProductSchema } from "$lib/components/seo/schemas/buildProductSchema";
import { buildEventSchema } from "$lib/components/seo/schemas/buildEventSchema";
import { buildBreadcrumbSchema } from "$lib/components/seo/schemas/buildBreadcrumbSchema";
import { buildItemWebPageSchema } from "$lib/components/seo/schemas/buildItemWebPageSchema";
import { buildListWebPageSchema } from "$lib/components/seo/schemas/buildListWebPageSchema";
import { buildItemListSchema } from "$lib/components/seo/schemas/buildItemListSchema";

export const seoSchemas = {
    // =========================
    // HOME
    // =========================
    home: {
        item: ({ baseUrl }) => ({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Kemer.app",
            url: baseUrl,
        }),
    },

    // =========================
    // ABOUT
    // =========================
    about: {
        item: ({ baseUrl }) => ({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
                "@type": "Organization",
                name: "Kemer.app",
                url: baseUrl,
            },
        }),
    },

    // =========================
    // FAQ
    // =========================
    faqs: {
        item: ({ item }) => ({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (item.faqs || []).map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer,
                },
            })),
        }),
    },

    // =========================
    // BLOG
    // =========================
    blogs: {
        item: ({ item, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: item.title?.[lang] ?? item.title,
            description: item.metaDescription,
            image: item.images?.[0]?.url,
            url: `${baseUrl}/blogs/${item.slug}`,
        }),
        list: ({ items, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blogs",
            itemListElement: items.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${baseUrl}/blogs/${i.slug}`,
                name: i.title?.[lang] ?? i.title,
            })),
        }),
    },

    // =========================
    // PLACES
    // =========================
    places: {
        item: ({ item, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "Place",
            name: item.title?.[lang] ?? item.title,
            description: item.metaDescription,
            image: item.images?.[0]?.url,
            url: `${baseUrl}/places/${item.slug}`,
            geo:
                item.lat && item.lng
                    ? {
                          "@type": "GeoCoordinates",
                          latitude: item.lat,
                          longitude: item.lng,
                      }
                    : undefined,
        }),
        list: ({ items, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Places",
            itemListElement: items.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${baseUrl}/places/${i.slug}`,
                name: i.title?.[lang] ?? i.title,
            })),
        }),
    },

    // =========================
    // EXCURSIONS (ВАЖНО)
    // Product + Event
    // =========================

    excursions: {
        item: (context) => [
            buildProductSchema(context),
            buildEventSchema(context),
            buildBreadcrumbSchema(context),
            buildItemWebPageSchema(context),
        ],
        list: (context) => [
            buildBreadcrumbSchema(context),
            buildListWebPageSchema(context),
            buildItemListSchema(context),
        ],
    },

    // =========================
    // CARS
    // =========================
    cars: {
        item: (context) => [
            buildProductSchema(context),
            buildBreadcrumbSchema(context),
            buildItemWebPageSchema(context),
        ],
        list: (context) => [
            buildBreadcrumbSchema(context),
            buildListWebPageSchema(context),
            buildItemListSchema(context),
        ],
    },

    // =========================
    // YACHTS
    // =========================
    yachts: {
        item: (context) => [
            buildProductSchema(context),
            buildBreadcrumbSchema(context),
            buildItemWebPageSchema(context),
        ],
        list: (context) => [
            buildBreadcrumbSchema(context),
            buildListWebPageSchema(context),
            buildItemListSchema(context),
        ],
    },

    // =========================
    // TRANSFERS
    // =========================
    transfers: {
        item: (context) => [
            buildProductSchema(context),
            buildBreadcrumbSchema(context),
            buildItemWebPageSchema(context),
        ],
        list: (context) => [
            buildBreadcrumbSchema(context),
            buildListWebPageSchema(context),
            buildItemListSchema(context),
        ],
    },
};
