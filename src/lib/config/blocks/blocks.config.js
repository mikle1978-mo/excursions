import { heroBlockConfig } from "./blocks/hero.config.js";
import { priceBlockConfig } from "./blocks/price.config.js";
import { bookingBlockConfig } from "./blocks/booking.config.js";

// пустые или почти пустые
import { descriptionConfig } from "./blocks/description.config.js";
import { infoBlockArrayConfig } from "./blocks/infoBlockArray.config.js";
import { infoBlockStringConfig } from "./blocks/infoBlockString.config.js";
import { scheduleConfig } from "./blocks/schedule.config.js";
import { galleryConfig } from "./blocks/gallery.config.js";
import { youtubeConfig } from "./blocks/youtube.config.js";
import { relatedConfig } from "./blocks/related.config.js";
import { reviewsConfig } from "./blocks/reviews.config.js";

export const blocksConfig = {
    hero: heroBlockConfig,
    price: priceBlockConfig,
    booking: bookingBlockConfig,

    // простые блоки
    description: descriptionConfig,
    infoArray: infoBlockArrayConfig,
    infoString: infoBlockStringConfig,
    schedule: scheduleConfig,
    gallery: galleryConfig,
    youtube: youtubeConfig,
    related: relatedConfig,
    reviews: reviewsConfig,
};
