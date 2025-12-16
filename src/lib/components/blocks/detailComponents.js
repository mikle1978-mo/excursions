// src/lib/components/blocks/detailComponents.js

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
import HeroBlock from "$lib/components/blocks/HeroBlock.svelte";
import AboutBlock from "$lib/components/blocks/AboutBlock.svelte";
import ButtonBlock from "$lib/components/blocks/ButtonBlock.svelte";

// ==================
// TEXT CONTENT
// ==================
import TextBlock from "$lib/components/blocks/TextBlock.svelte";
import HtmlBlock from "$lib/components/blocks/HtmlBlock.svelte";

// ==================
// LIST / ARRAY
// ==================
import ListBlock from "$lib/components/blocks/ListBlock.svelte";

// ==================
// MEDIA
// ==================
import GalleryBlock from "$lib/components/blocks/GalleryBlock.svelte";
import YouTubeBlock from "$lib/components/blocks/YouTubeBlock.svelte";
import MapBlock from "$lib/components/blocks/MapBlock.svelte";

// ==================
// STRUCTURED DATA
// ==================
import ProductDetailsBlock from "$lib/components/blocks/ProductDetailsBlock.svelte";
import ScheduleBlock from "$lib/components/blocks/ScheduleBlock.svelte";
import PriceBlock from "$lib/components/blocks/PriceBlock.svelte";
import MeetingPoint from "$lib/components/blocks/MeetingPoint.svelte";

// ==================
// SOCIAL / RELATED
// ==================
import ReviewsBlock from "$lib/components/blocks/ReviewsBlock.svelte";
import RelatedBlock from "$lib/components/blocks/RelatedBlock.svelte";

export const detailComponents = {
    // layout
    HeroBlock,
    AboutBlock,
    ButtonBlock,

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

    // social / related
    ReviewsBlock,
    RelatedBlock,
};
