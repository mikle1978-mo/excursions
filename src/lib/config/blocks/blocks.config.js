import { heroBlockConfig } from "$lib/config/blocks/hero.config.js";
import { priceBlockConfig } from "$lib/config/blocks/priceBlock.config.js";
import { bookingBlockConfig } from "$lib/config/blocks/booking.config.js";
import { textBlockConfig } from "./textBlock.config";

// пустые или почти пустые
import { descriptionBlockConfig } from "$lib/config/blocks/description.config.js";
import { infoBlockArrayConfig } from "$lib/config/blocks/infoBlockArray.config.js";
import { infoBlockStringConfig } from "$lib/config/blocks/infoBlockString.config.js";
import { scheduleConfig } from "$lib/config/blocks/schedule.config.js";
import { galleryConfig } from "$lib/config/blocks/gallery.config.js";
import { youtubeConfig } from "$lib/config/blocks/youtube.config.js";
import { relatedConfig } from "$lib/config/blocks/related.config.js";
import { reviewsConfig } from "$lib/config/blocks/reviews.config.js";
import { meetingPoint } from "$lib/config/blocks/meetingPoint.config";
import { buttonBlockConfig } from "$lib/config/blocks/buttonBlock.config";
import { productDetailsBlock } from "$lib/config/blocks/productDetailsBlock.config";
import { text } from "@sveltejs/kit";

export const blocksConfig = {
    hero: heroBlockConfig,
    price: priceBlockConfig,
    booking: bookingBlockConfig,

    // простые блоки
    description: descriptionBlockConfig,
    details: productDetailsBlock,
    infoArray: infoBlockArrayConfig,
    infoString: infoBlockStringConfig,
    schedule: scheduleConfig,
    meeting: meetingPoint,
    gallery: galleryConfig,
    youtube: youtubeConfig,
    related: relatedConfig,
    reviews: reviewsConfig,
    button: buttonBlockConfig,
    text: textBlockConfig,
};
