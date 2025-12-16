// src/lib/features/priceBlock/priceBlock.constants.js

export const priceTypeLabels = {
    per_day: { en: "per day", ru: "в день", tr: "günlük" },
    per_hour: { en: "per hour", ru: "в час", tr: "saatlik" },
    per_week: { en: "per week", ru: "в неделю", tr: "haftalık" },
    per_person: { en: "per person", ru: "с человека", tr: "kişi başı" },
    per_trip: { en: "per trip", ru: "за поездку", tr: "gezi başı" },
};

export const discountEndLabels = {
    ru: "cрок действия скидки",
    en: "discount ends",
    tr: "indirim süresi",
};

export const timeUnits = {
    en: { day: "d", hour: "h", minute: "m", second: "s" },
    ru: { day: "д", hour: "ч", minute: "м", second: "с" },
    tr: { day: "g", hour: "s", minute: "d", second: "s" },
};
