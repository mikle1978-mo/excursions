<script>
    import PlaceSeoHead from "$lib/components/SEO/PlaceSeoHead.svelte";
    import PlaceSeoSchema from "$lib/components/SEO/PlaceSeoSchema.svelte";
    import { typeLabels } from "$lib/constants/typeLabels.js";
    import PlaceDetailPage from "$lib/components/blocks/PlaceDetailPage.svelte";
    import { pageDetailsConfig } from "$lib/config/pageDetailsConfig.js";
    import { getLocalizedPath } from "$lib/stores/locale.js";
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;
    const { item, rating, reviewsCount, lang } = data;
    console.log(data);

    let type = item.type ?? "excursions";
    const config = pageDetailsConfig[type];

    let currentTranslation = item.translations.find((t) => t.lang === lang);

    console.log(currentTranslation);

    // Хлебные крошки
    $: breadcrumbsList = [
        {
            label: lang === "ru" ? "Главная" : "Home",
            href: getLocalizedPath(lang, ""),
        },
        {
            label: typeLabels[type]?.[lang] ?? type,
            href: getLocalizedPath(lang, `${type}`),
        },
        {
            label: currentTranslation?.title || item?.slug,
            href: null,
        },
    ];
</script>

<!-- SEO (всё серверное) -->
<PlaceSeoHead
    {baseUrl}
    {baseName}
    urlPath={`${type}`}
    slug={item.slug}
    title={currentTranslation.title}
    description={currentTranslation.metaDescription}
    keywords={currentTranslation.keywords}
    image={item.images?.[0]?.url ??
        `${baseUrl}/images/${type}/${config.defaultImage}` ??
        `${baseUrl}/images/excursions/excursion_default.webp`}
    imageAlt={`Photo ${currentTranslation.title}`}
    amount={item.price?.toString() ?? "0"}
    currency="USD"
    availability={item.active ? "in stock" : "out of stock"}
    brand={item.brand ?? ""}
    locale={lang}
/>

<PlaceSeoSchema
    {item}
    {type}
    locale={lang}
    {baseUrl}
    {rating}
    reviewCount={reviewsCount}
    brand={baseName}
    breadcrumbs={breadcrumbsList}
/>

<PlaceDetailPage
    {type}
    {item}
    {rating}
    {reviewsCount}
    locale={data.lang}
    translations={config.translations}
/>
