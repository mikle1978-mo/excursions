<script>
    import { getLocalizedPath } from "$lib/stores/locale";

    // defaults from env
    const ENV_BASE = import.meta.env.VITE_BASE_URL ?? "https://kemer.app";
    const ENV_NAME = import.meta.env.VITE_BASE_NAME ?? "Kemer.app";

    export let item = {}; // экскурсия (по твоей схеме)
    export let locale = "ru";
    export let baseUrl = ENV_BASE; // например https://kemer.app
    export let baseName = ENV_NAME; // например Kemer.app

    // По примеру конкурента — организация / about (локализованный путь)
    export let organizerName = baseName;
    export let organizerUrl = baseUrl + getLocalizedPath(locale, "about");

    // performer: добавляется ТОЛЬКО если есть имя/урл (у тебя их нет — не передавай)
    export let performerName = ""; // optional
    export let performerUrl = ""; // optional

    // location defaults
    const defaultLocationName = locale === "ru" ? "Кемер" : "Kemer";
    export let locationName = defaultLocationName;
    export let locationUrl = baseUrl + getLocalizedPath(locale, "places/kemer");
    const streetAddress =
        locale === "ru"
            ? "Точное место начала доступно после бронирования."
            : "Exact meeting point will be provided after booking.";

    export let imageFallback =
        baseUrl + "/images/excursions/excursion_default.webp";

    // Helpers: безопасный выбор локализованной строки
    const pickI18n = (field) => {
        if (!field) return "";
        // case 1: i18n object { ru: "...", en: "..." }
        if (typeof field === "object" && !Array.isArray(field)) {
            return field[locale] ?? field.en ?? Object.values(field)[0] ?? "";
        }
        // case 2: translations array [{lang, title, description}, ...]
        if (Array.isArray(field)) {
            const found = field.find((t) => t.lang === locale) || field[0];
            return found?.title ?? found?.description ?? "";
        }
        // string fallback
        return String(field);
    };

    // title / description: поддерживаем и item.title (i18n объект) и item.translations (массив)
    const title =
        pickI18n(item.title) ||
        (Array.isArray(item.translations) &&
            (item.translations.find((t) => t.lang === locale)?.title ??
                item.translations[0]?.title)) ||
        item.slug ||
        "unknown";

    const description =
        pickI18n(item.metaDescription) ||
        pickI18n(item.description) ||
        (Array.isArray(item.translations) &&
            (item.translations.find((t) => t.lang === locale)?.description ??
                item.translations[0]?.description)) ||
        "";

    // image: по твоей схеме item.images — массив объектов {url, public_id}
    let image = imageFallback;
    if (Array.isArray(item.images) && item.images.length) {
        const first = item.images[0];
        image =
            typeof first === "string" ? first : (first?.url ?? imageFallback);
    } else if (item.image) {
        image = item.image;
    }

    // url: если item.url уже есть — используем, иначе строим локализованный путь
    const slug = item.slug ?? "unknown";
    const eventUrl =
        item.url ||
        (
            baseUrl +
            getLocalizedPath(locale, `${item.type ?? "excursions"}/${slug}`)
        ).replace(/\/+/g, "/");

    // parse ISO-safe
    const toDateOrNull = (s) => {
        if (!s) return null;
        const d = new Date(s);
        return isNaN(d.getTime()) ? null : d;
    };

    const now = new Date();

    // startDate logic:
    // priority: item.startDate || item.start || item.days (first) || now + 3 days
    let startDate =
        toDateOrNull(item.startDate) || toDateOrNull(item.start) || null;
    if (!startDate && Array.isArray(item.days) && item.days.length) {
        // if days stored as date strings
        startDate = toDateOrNull(item.days[0]) || null;
    }
    if (!startDate) {
        // competitor-like behaviour: now + 3 days
        startDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        // set a default hour (e.g., 14:00) to look realistic
        startDate.setHours(14, 0, 0, 0);
    }

    // endDate logic:
    // if item.endDate present -> use it
    // else if item.duration present -> add duration (hours if <=24, else days)
    // else default +5 hours (typical day tour)
    let endDate = toDateOrNull(item.endDate) || null;
    const durationNum = item.duration != null ? Number(item.duration) : null;

    if (!endDate) {
        if (durationNum && !isNaN(durationNum)) {
            if (durationNum > 24) {
                // treat as days if >24
                endDate = new Date(
                    startDate.getTime() + durationNum * 24 * 60 * 60 * 1000
                );
            } else {
                // treat as hours
                endDate = new Date(
                    startDate.getTime() + durationNum * 60 * 60 * 1000
                );
            }
        } else {
            // default +5 hours
            endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);
        }
    }

    // offers: price and currency
    const price = item.price != null ? item.price : (item.minPrice ?? 0);
    const priceCurrency = item.priceCurrency ?? "USD";

    // availability
    const availability = item.active
        ? "http://schema.org/InStock"
        : "http://schema.org/OutOfStock";

    // Build schema (match competitor structure)
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: title,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        url: eventUrl,
        image: image, // single image as in конкурента
        description: description, // can include HTML if present
        eventAttendanceMode: "http://schema.org/OfflineEventAttendanceMode",
        eventStatus: "http://schema.org/EventScheduled",
        organizer: {
            "@type": "Organization",
            name: organizerName,
            url: organizerUrl,
        },
        // performer: add ONLY if we actually have performerName or item.performerName
        ...(performerName || item.performerName || item.performerUrl
            ? {
                  performer: {
                      "@type": "PerformingGroup",
                      name:
                          performerName ||
                          item.performerName ||
                          `${organizerName} ${organizerName}`,
                      url: performerUrl || item.performerUrl || organizerUrl,
                  },
              }
            : {}),
        location: {
            "@type": "Place",
            url: locationUrl,
            name: locationName,
            address: {
                "@type": "PostalAddress",
                addressLocality: locationName,
                streetAddress: item.streetAddress ?? streetAddress,
                addressCountry: {
                    "@type": "Country",
                    name:
                        item.addressCountry ??
                        (locale === "ru" ? "Турция" : "Turkey"),
                },
            },
        },
        offers: {
            "@type": "Offer",
            availability: availability,
            validFrom: startDate.toISOString(),
            url: eventUrl,
            price: price,
            priceCurrency: priceCurrency,
        },
    };
</script>

{@html `<script type="application/ld+json">${JSON.stringify(eventSchema, null, 2)}</script>`}
