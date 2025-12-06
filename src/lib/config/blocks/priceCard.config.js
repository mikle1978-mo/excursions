// src/lib/config/blocks/priceCard.config.js

export const priceCardConfig = {
    ui: {
        discount: {
            showOldPrice: true,
            showCountdown: true,
            countdownEndTime: "23:59:59",
            intervalMs: 1000,
        },
    },

    labels: {
        booking: {
            default: {
                en: "Join now",
                ru: "Записаться",
                tr: "Katılmak istiyorum",
            },
            excursion: { en: "Order", ru: "Заказать", tr: "İstiyorum!" },
            yacht: { en: "All aboard", ru: "На борт!", tr: "Gemiye çık!" },
            car: { en: "Pick up?", ru: "Забрать?", tr: "Alayım mı?" },
            transfer: { en: "Let’s go!", ru: "Поехали!", tr: "Hadi gidelim!" },
            unavailable: {
                en: "Unavailable",
                ru: "Недоступно",
                tr: "Müsait değil",
            },
        },

        priceTypes: {
            per_day: { en: "per day", ru: "в день", tr: "günlük" },
            per_hour: { en: "per hour", ru: "в час", tr: "saatlik" },
            per_week: { en: "per week", ru: "в неделю", tr: "haftalık" },
            per_person: { en: "per person", ru: "с человека", tr: "kişi başı" },
            per_trip: { en: "per trip", ru: "за поездку", tr: "gezi başı" },
        },

        timeUnits: {
            en: { day: "d", hour: "h", minute: "m", second: "s" },
            ru: { day: "д", hour: "ч", minute: "м", second: "с" },
            tr: { day: "g", hour: "s", minute: "d", second: "s" },
        },

        discountEnd: {
            en: "discount ends",
            ru: "срок действия скидки",
            tr: "indirim süresi",
        },
    },
};
