import IconImage from "$lib/icons/IconImage.svelte";
import IconBriefcase from "$lib/icons/IconBriefcase.svelte";
import IconGift from "$lib/icons/IconGift.svelte";
import IconList from "$lib/icons/IconList.svelte";
import IconMapPin from "$lib/icons/IconMapPin.svelte";
import IconPlus from "$lib/icons/IconPlus.svelte";
import IconThumbsUp from "$lib/icons/IconThumbsUp.svelte";
import IconClipBoard from "$lib/icons/IconClipBoard.svelte";

export const infoBlockArrayConfig = {
    whatYouSee: {
        title: {
            ru: "Что вы увидите",
            en: "What you will see",
        },
        icon: IconImage,
    },
    whyChooseUs: {
        title: {
            ru: "Почему выбирают нас",
            en: "Why choose us",
        },
        icon: IconThumbsUp,
    },
    whatToBring: {
        title: {
            ru: "Что взять с собой",
            en: "What to bring",
        },
        icon: IconBriefcase,
    },
    includes: {
        title: {
            ru: "Что включено",
            en: "What is included",
        },
        icon: IconGift,
    },
    usp: {
        title: {
            ru: "Наши преимущества",
            en: "Advantages",
        },
        icon: IconPlus,
    },
    guarantees: {
        title: {
            ru: "Гарантии",
            en: "Guarantees",
        },
        icon: IconClipBoard,
    },
    //car
    rentalConditions: {
        title: {
            ru: "Условия аренды",
            en: "Rental conditions",
        },
        icon: IconClipBoard,
    },
    requiredDocuments: {
        title: {
            ru: "Необходимые документы",
            en: "Required documents",
        },
        icon: IconClipBoard,
    },
    accidentInstructions: {
        title: {
            ru: "Инструкции при ДТП",
            en: "Accident instructions",
        },
        icon: IconClipBoard,
    },
    insuranceDescription: {
        title: {
            ru: "Описание страховки",
            en: "Insurance description",
        },
        icon: IconClipBoard,
    },
    insuranceExclusions: {
        title: {
            ru: "Исключение из страховки",
            en: "Insurance exclusions",
        },
        icon: IconClipBoard,
    },
};
