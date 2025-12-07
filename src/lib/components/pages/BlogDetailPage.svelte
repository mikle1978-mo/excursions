<script>
    import {
        locale as localeStore,
        getLocalizedPath,
    } from "$lib/stores/locale";
    import HeroBlock from "$lib/components/blocks/HeroBlock.svelte";
    import GaleryCollage from "$lib/components/layout/GaleryCollage.svelte";
    import BlogContent from "$lib/components/blocks/BlogContent.svelte";
    import Description from "$lib/components/blocks/Description.svelte";
    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import TheBurger from "$lib/components/UI/buttons/TheBurger.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import InfoBlockArray from "$lib/components/blocks/InfoBlockArray.svelte";
    import InfoBlockString from "$lib/components/blocks/MeetingPoint.svelte";
    import MapBlock from "./MapBlock.svelte";
    import { formatDate } from "$lib/utils/dateFormatter";
    import BuyMeACoffe from "$lib/components/UI/buttons/BuyMeACoffe.svelte";

    export let item;

    export let locale;

    $: effectiveLocale = locale ?? $localeStore;

    // перевод для текущей локали
    $: currentTranslation = item ?? {};

    // хлебные крошки
    $: breadcrumbsList = [
        {
            label: effectiveLocale === "ru" ? "Главная" : "Home",
            href: getLocalizedPath(effectiveLocale, ""),
        },
        {
            label: effectiveLocale === "ru" ? "Места" : "Places",
            href: getLocalizedPath(effectiveLocale, "places"),
        },
        { label: currentTranslation.title ?? item.slug, href: null },
    ];

    const defaultImage = `/images/places/place_default.webp`;
    $: mainImage = item.images?.[0]?.url ?? defaultImage;
</script>

<div class="content">
    <WhatsApp />
    <div class="burger-wrapper"><TheBurger /></div>
    <TheMobileMenu />
    <main class="place-detail">
        <HeroBlock
            imageUrl={mainImage}
            title={currentTranslation.h1 ?? currentTranslation.title}
            subtitle={currentTranslation.subtitle}
            locale={effectiveLocale}
        />

        <section class="top_block">
            {#if currentTranslation.content?.length}
                <BlogContent content={currentTranslation.content} />
            {/if}

            {#if item.publishDate}
                <div class="published-date">
                    {formatDate(item.publishDate, effectiveLocale)}
                </div>
            {/if}

            {#if currentTranslation.author}
                <InfoBlockString
                    title={effectiveLocale === "ru" ? "Автор" : "Author"}
                    item={currentTranslation.author}
                />
            {/if}
            <BuyMeACoffe locale={effectiveLocale} />
        </section>
    </main>
</div>

<style>
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-gray-500);
        padding-bottom: var(--space-vertical-sm);
    }

    .burger-wrapper {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: var(--radius-full);
        top: var(--space-vertical-sm);
        right: var(--space-vertical-sm);
        z-index: 1000;
    }

    /* Стили из твоего кода с переименованными классами */
    .place-detail {
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: var(--max-width-container);
        margin: 0 auto;
        padding: 0;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-gray-500);
        padding-bottom: var(--space-vertical-sm);
    }

    .top_block {
        width: 100%;
        align-items: start;
        justify-content: center;
        gap: var(--space-horizontal-md);
        padding: 0 var(--space-vertical-sm);
    }

    @media (max-width: 768px) {
        .top_block {
            display: flex;
            flex-direction: column;
        }
    }
</style>
