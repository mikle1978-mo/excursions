// src/lib/components/blocks/page/detailComponents.js

/**
 * detailComponents
 *
 * Реестр UI-блоков для detail-страниц.
 * Компоненты:
 * - не знают источник данных
 * - получают data + system
 * - выбираются конфигом страницы
 */

// ==================
// LAYOUT / PAGE
// ==================
import HeroBlock from "$lib/components/blocks/page/HeroBlock.svelte";
import AboutBlock from "$lib/components/blocks/page/AboutBlock.svelte";
import ButtonBlock from "$lib/components/blocks/page/ButtonBlock.svelte";
import CoffeBlock from "$lib/components/blocks/page/CoffeBlock.svelte";
// ==================
// TEXT CONTENT
// ==================
import TextBlock from "$lib/components/blocks/page/TextBlock.svelte";
import HtmlBlock from "$lib/components/blocks/page/HtmlBlock.svelte";

// ==================
// LIST / ARRAY
// ==================
import ListBlock from "$lib/components/blocks/page/ListBlock.svelte";

// ==================
// MEDIA
// ==================
import GalleryBlock from "$lib/components/blocks/page/GalleryBlock.svelte";
import YouTubeBlock from "$lib/components/blocks/page/YouTubeBlock.svelte";
import MapBlock from "$lib/components/blocks/page/MapBlock.svelte";

// ==================
// STRUCTURED DATA
// ==================
import ProductDetailsBlock from "$lib/components/blocks/page/ProductDetailsBlock.svelte";
import ScheduleBlock from "$lib/components/blocks/page/ScheduleBlock.svelte";
import PriceBlock from "$lib/components/blocks/page/PriceBlock.svelte";
import MeetingPoint from "$lib/components/blocks/page/MeetingPoint.svelte";
import ContentBlock from "$lib/components/blocks/page/ContentBlock.svelte";

// ==================
// SOCIAL / RELATED
// ==================
import ReviewsBlock from "$lib/components/blocks/page/ReviewsBlock.svelte";
import RelatedBlock from "$lib/components/blocks/page/RelatedBlock.svelte";

export const detailComponents = {
    // layout
    HeroBlock,
    AboutBlock,
    ButtonBlock,
    CoffeBlock,

    // text
    TextBlock,
    HtmlBlock,

    // list
    ListBlock,

    // media
    GalleryBlock,
    YouTubeBlock,
    MapBlock,

    // structured
    ProductDetailsBlock,
    ScheduleBlock,
    PriceBlock,
    MeetingPoint,
    ContentBlock,

    // social / related
    ReviewsBlock,
    RelatedBlock,
};
