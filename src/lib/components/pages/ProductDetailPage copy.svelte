<script>
    import { appConfig } from "$lib/config/app.config";
    import { onMount } from "svelte";

    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import HeroBlock from "$lib/components/blocks/HeroBlock.svelte";
    import ReviewsList from "$lib/components/blocks/ReviewsList.svelte";
    import BookingCard from "$lib/components/blocks/BookingCard.svelte";
    import ProductDetailsBlock from "$lib/components/blocks/ProductDetailsBlock.svelte";
    import Galery from "$lib/components/layout/Galery.svelte";
    import Rating from "$lib/components/UI/rating/Rating.svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import ShortForm from "$lib/components/UI/forms/shortForm.svelte";
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import InfoBlockArray from "$lib/components/blocks/InfoBlockArray.svelte";
    import InfoBlockString from "$lib/components/blocks/MeetingPoint.svelte";
    import AboutBlock from "$lib/components/blocks/AboutBlock.svelte";
    import IconImage from "$lib/icons/IconImage.svelte";
    import IconBriefcase from "$lib/icons/IconBriefcase.svelte";
    import IconGift from "$lib/icons/IconGift.svelte";
    import IconList from "$lib/icons/IconList.svelte";
    import IconMapPin from "$lib/icons/IconMapPin.svelte";
    import IconPlus from "$lib/icons/IconPlus.svelte";
    import IconThumbsUp from "$lib/icons/IconThumbsUp.svelte";
    import IconClipBoard from "$lib/icons/IconClipBoard.svelte";
    import TheBurger from "$lib/components/UI/buttons/TheBurger.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import GaleryCollage from "$lib/components/layout/GaleryCollage.svelte";
    import Description from "$lib/components/blocks/Description.svelte";
    import ButtonBlock from "$lib/components/blocks/ButtonBlock.svelte";
    import PriceBlock from "$lib/components/blocks/PriceBlock.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import ScheduleBlock from "$lib/components/blocks/ScheduleBlock.svelte";
    import YouTubeVideo from "$lib/components/blocks/YouTubeVideo.svelte";
    import RelatedSlider from "$lib/components/blocks/RelatedSlider.svelte";
    import RelatedCard from "$lib/components/cards/RelatedCard.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    export let type;
    export let lang;
    export let item;
    export let rating;
    export let reviewsCount;

    const config = appConfig.collections[type]?.detailPage;

    export function getI18nLabel(obj, key, locale) {
        return obj?.[key]?.[locale] ?? key;
    }

    let isModalOpen = false;
    const openModal = () => (isModalOpen = true);
    const closeModal = () => (isModalOpen = false);

    $: currentTranslation = item;

    // Хлебные крошки
    const typeLabels = {
        car: { ru: "Авто", en: "Cars", tr: "Araba" },
        excursion: { ru: "Экскурсии", en: "Excursions", tr: "Turlar" },
        yacht: { ru: "Яхты", en: "Yachts", tr: "Yatlar" },
        transfer: { ru: "Трансферы", en: "Transfers", tr: "Transferler" },
    };

    $: breadcrumbsList = [
        {
            label: lang === "ru" ? "Главная" : "Home",
            href: "/",
        },
        {
            label: typeLabels[type]?.[lang] ?? type,
            href: `${type}`,
        },
        {
            label: currentTranslation?.title || item?.slug,
            href: null,
        },
    ];
</script>

{#if isModalOpen}
    <Modal on:close={closeModal}>
        <ShortForm slug={item.slug} />
    </Modal>
{/if}

{#if !item}
    <div class="error-page">
        <h1 class="error-title">
            {lang === "ru" ? "Объект не найден" : "Item not found"}
        </h1>
        <a href={`/${lang}/${type}s`}>
            ← {lang === "ru" ? "Вернуться к списку" : "Back to list"}
        </a>
    </div>
{:else}
    <div class="content">
        <WhatsApp />
        <div class="burger-wrapper">
            <TheBurger />
        </div>
        <TheMobileMenu />
        <main class="product-detail">
            <HeroBlock
                imageUrl={item.images?.[0]?.url ??
                    `${baseUrl}/images/${type}s/${type}_default.webp`}
                title={currentTranslation.h1}
                subtitle={currentTranslation.subtitle}
                {rating}
                {reviewsCount}
                locale={lang}
            />
            <section class="top_block">
                <ProductDetailsBlock {type} {item} {lang} />
                <PriceBlock
                    {type}
                    locale={lang}
                    price={item.price}
                    priceType={item.priceType}
                    discount={item.discount}
                    discountEnd={item.discountEnd}
                />

                <Description item={currentTranslation.description} />

                {#if item.videoUrl}
                    <YouTubeVideo
                        videoUrl={item.videoUrl}
                        title={currentTranslation.title}
                        poster={item.images?.[0]?.url ??
                            `${baseUrl}/images/${type}s/${type}_default.webp`}
                    />
                {/if}

                <GaleryCollage
                    images={item.images}
                    title={currentTranslation.title}
                />

                {#if currentTranslation.schedule}
                    <ScheduleBlock
                        title={"schedule"}
                        items={currentTranslation.schedule}
                        icon={IconList}
                    />
                {/if}
                {#if currentTranslation.requiredDocuments}
                    <InfoBlockArray
                        title={"requiredDocuments"}
                        items={currentTranslation.requiredDocuments}
                    />
                {/if}

                {#if currentTranslation.insuranceDescription}
                    <InfoBlockArray
                        title={"insuranceDescription"}
                        items={currentTranslation.insuranceDescription}
                    />
                {/if}

                {#if currentTranslation.insuranceExclusions}
                    <InfoBlockArray
                        title={"insuranceExclusions"}
                        items={currentTranslation.insuranceExclusions}
                    />
                {/if}

                {#if currentTranslation.extraTimePolicy}
                    <InfoBlockString
                        title={"extraTimePolicy"}
                        item={currentTranslation.extraTimePolicy}
                    />
                {/if}

                {#if currentTranslation.fuelPolicy}
                    <InfoBlockString
                        title={"fuelPolicy"}
                        item={currentTranslation.fuelPolicy}
                    />
                {/if}

                {#if currentTranslation.accidentInstructions}
                    <InfoBlockArray
                        title={"accidentInstructions"}
                        items={currentTranslation.accidentInstructions}
                    />
                {/if}
                {#if currentTranslation.whatYouSee}
                    <InfoBlockArray
                        title={"whatYouSee"}
                        items={currentTranslation.whatYouSee}
                        icon={IconImage}
                    />
                {/if}

                {#if currentTranslation.whatToBring}
                    <InfoBlockArray
                        title={"whatToBring"}
                        items={currentTranslation.whatToBring}
                        icon={IconBriefcase}
                    />
                {/if}

                {#if currentTranslation.includes}
                    <InfoBlockArray
                        title={"includes"}
                        items={currentTranslation.includes}
                        icon={IconGift}
                    />
                {/if}

                {#if currentTranslation.rentalConditions}
                    <InfoBlockArray
                        title={"rentalConditions"}
                        items={currentTranslation.rentalConditions}
                    />
                {/if}

                {#if currentTranslation.servicesDetails}
                    <InfoBlockArray
                        title={"servicesDetails"}
                        items={currentTranslation.servicesDetails}
                    />
                {/if}

                {#if currentTranslation.meetingPoint}
                    <InfoBlockString
                        title={"meetingPoint"}
                        item={currentTranslation.meetingPoint}
                        icon={IconMapPin}
                    />
                {/if}
                {#if currentTranslation.whyChooseUs}
                    <InfoBlockArray
                        title={"whyChooseUs"}
                        items={currentTranslation.whyChooseUs}
                        icon={IconThumbsUp}
                    />
                {/if}
                {#if currentTranslation.usp}
                    <InfoBlockArray
                        title={"usp"}
                        items={currentTranslation.usp}
                        icon={IconPlus}
                    />
                {/if}
                {#if currentTranslation.guarantees}
                    <InfoBlockArray
                        title={"guarantees"}
                        items={currentTranslation.guarantees}
                        icon={IconClipBoard}
                    />
                {/if}

                {#if currentTranslation.notes}
                    <InfoBlockArray
                        title={"notes"}
                        items={currentTranslation.notes}
                    />
                {/if}
            </section>
            <div class="stiky">
                <ButtonBlock
                    id="book-button"
                    active={item.active}
                    {type}
                    locale={lang}
                    onBook={openModal}
                />
            </div>

            <AboutBlock />

            {#if item.slug}
                <ReviewsList itemSlug={item.slug} locale={lang} />
            {/if}
            <!-- <RelatedSlider {item}>
                <div slot="card" let:item>
                    <RelatedCard {item} />
                </div>
            </RelatedSlider> -->
        </main>
    </div>
{/if}

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
    .product-detail {
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
    }
    .stiky {
        position: sticky;
        width: 100%;
        bottom: 0;
        z-index: 10;
        backdrop-filter: blur(10px);
        background-color: rgba(var(--color-bg-rgb), 0.5);
        padding: var(--space-vertical-md) var(--space-horizontal-sm);
    }

    .top_block {
        display: grid;
        width: 100%;
        grid-template-columns: 50% 1fr;
        align-items: start;
        justify-content: center;
        gap: var(--space-horizontal-md);
        padding: 0 var(--space-vertical-sm);
    }

    .error-title {
        font-size: var(--text-md);
    }

    .error-page {
        text-align: center;
        padding: var(--space-vertical-xl) var(--space-horizontal-md);
    }

    .error-page a {
        color: var(--color-primary);
        display: inline-block;
        margin-top: var(--space-vertical-sm);
    }

    @media (max-width: 768px) {
        .top_block {
            display: flex;
            flex-direction: column;
        }
    }
</style>
