<script>
    import { appConfig } from "$lib/config/app.config";
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    export let type;
    export let lang;
    export let item = null; // если null → это список

    // выбор режима
    const mode = item ? "item" : "list";

    // получаем конфиг
    const cfg = appConfig.seo?.[type]?.[lang]?.[mode] ?? {};
    // дефолтные картинки
    const defaultImage = appConfig.defaultImage?.[type]?.default || "";

    // установка изображения по умолчанию, если не задано в конфиге SEO

    // функция для подстановки {{полей}} из item
    function applyTemplate(str) {
        if (!item || typeof str !== "string") return str;

        return str.replace(/{{(.*?)}}/g, (match, field) => {
            const value = item[field.trim()];
            return value ?? match;
        });
    }

    // применяем шаблоны
    const title = applyTemplate(cfg.title);
    const description = applyTemplate(cfg.description);
    const image =
        item?.images[0].url ?? `${baseUrl}/images/${type}/${defaultImage}`;
    const alt = applyTemplate(cfg.alt) || title;

    // canonical (делаем универсально)

    const canonical =
        `${baseUrl}/${lang}${type === "home" ? "" : "/" + type}${item?.slug ? "/" + item.slug : ""}`.replace(
            /\/+$/,
            ""
        );

    // используем локали из конфигов
    const langMeta = appConfig.languages?.meta?.[lang] ?? { locale: "en-US" };
    const ogLocale = langMeta.locale.replace("-", "_"); // для OpenGraph: en-US → en_US
</script>

<svelte:head>
    {#if title}
        <title>{title}</title>
        <meta name="description" content={description} />
    {/if}

    {#if canonical}
        <link rel="canonical" href={canonical} />
    {/if}

    <!-- OpenGraph -->
    <meta property="og:type" content={item ? "product" : "website"} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {#if image}
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={alt} />
    {/if}
    <meta property="og:locale" content={ogLocale} />
    {#if canonical}
        <meta property="og:url" content={canonical} />
    {/if}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {#if image}
        <meta name="twitter:image" content={image} />
    {/if}
</svelte:head>
