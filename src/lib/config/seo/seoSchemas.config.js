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
    // excursions: {
    //     item: ({ item, baseUrl, lang }) => ({
    //         "@context": "https://schema.org",
    //         "@graph": [
    //             {
    //                 "@type": "Product",
    //                 name: item.title?.[lang] ?? item.title,
    //                 image: item.images?.[0]?.url,
    //                 description: item.metaDescription,
    //                 offers: {
    //                     "@type": "Offer",
    //                     price: item.price,
    //                     priceCurrency: "USD",
    //                     availability: item.active
    //                         ? "https://schema.org/InStock"
    //                         : "https://schema.org/OutOfStock",
    //                 },
    //             },
    //             {
    //                 "@type": "Event",
    //                 name: item.title?.[lang] ?? item.title,
    //                 startDate: item.startDate,
    //                 endDate: item.endDate,
    //                 eventAttendanceMode:
    //                     "https://schema.org/OfflineEventAttendanceMode",
    //                 eventStatus: "https://schema.org/EventScheduled",
    //                 location: {
    //                     "@type": "Place",
    //                     name: "Kemer",
    //                 },
    //             },
    //         ],
    //     }),

    //     list: ({ items, baseUrl, lang }) => ({
    //         "@context": "https://schema.org",
    //         "@type": "CollectionPage",
    //         itemListElement: items.map((i, idx) => ({
    //             "@type": "ListItem",
    //             position: idx + 1,
    //             url: `${baseUrl}/excursions/${i.slug}`,
    //             name: i.title?.[lang] ?? i.title,
    //         })),
    //     }),
    // },

    // =========================
    // CARS
    // =========================
    cars: {
        item: ({ item, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: item.title?.[lang] ?? item.title,
            image: item.images?.[0]?.url,
            offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: "USD",
            },
        }),
        list: ({ items, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Cars",
            itemListElement: items.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${baseUrl}/cars/${i.slug}`,
                name: i.title?.[lang] ?? i.title,
            })),
        }),
    },

    // =========================
    // YACHTS
    // =========================
    yachts: {
        item: ({ item, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: item.title?.[lang] ?? item.title,
            image: item.images?.[0]?.url,
            offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: "USD",
            },
        }),
        list: ({ items, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Yachts",
            itemListElement: items.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${baseUrl}/yachts/${i.slug}`,
                name: i.title?.[lang] ?? i.title,
            })),
        }),
    },

    // =========================
    // TRANSFERS
    // =========================
    transfers: {
        item: ({ item, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: item.title?.[lang] ?? item.title,
            description: item.metaDescription,
        }),
        list: ({ items, baseUrl, lang }) => ({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Transfers",
            itemListElement: items.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${baseUrl}/transfers/${i.slug}`,
                name: i.title?.[lang] ?? i.title,
            })),
        }),
    },
};
