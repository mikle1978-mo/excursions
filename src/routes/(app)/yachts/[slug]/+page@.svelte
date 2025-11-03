<script>
    import PageSeoHead from "$lib/components/SEO/PageSeoHead.svelte";
    import ProductSeoSchema from "$lib/components/SEO/ProductSeoSchema.svelte";
    import { typeLabels } from "$lib/constants/typeLabels.js";
    import ProductDetailPage from "$lib/components/blocks/ProductDetailPage.svelte";
    import { pageDetailsConfig } from "$lib/config/pageDetailsConfig.js";
    import { getLocalizedPath } from "$lib/stores/locale.js";
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;

    const { item, rating, reviewsCount, lang } = data;

    let type = item.type ?? "excursions";

    const config = pageDetailsConfig[type];

    let currentTranslation = item; // все поля уже на нужном языке
    // Хлебные крошки
    const breadcrumbsList = [
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
<PageSeoHead
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

<ProductSeoSchema
    {item}
    {type}
    locale={lang}
    {baseUrl}
    {rating}
    reviewCount={reviewsCount}
    brand={baseName}
    breadcrumbs={breadcrumbsList}
/>

<ProductDetailPage
    {type}
    {item}
    {rating}
    {reviewsCount}
    locale={data.lang}
    translations={config.translations}
/>
