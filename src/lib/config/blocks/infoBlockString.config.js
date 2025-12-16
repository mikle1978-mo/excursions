import IconImage from "$lib/icons/IconImage.svelte";
import IconBriefcase from "$lib/icons/IconBriefcase.svelte";
import IconGift from "$lib/icons/IconGift.svelte";
import IconList from "$lib/icons/IconList.svelte";
import IconMapPin from "$lib/icons/IconMapPin.svelte";
import IconPlus from "$lib/icons/IconPlus.svelte";
import IconThumbsUp from "$lib/icons/IconThumbsUp.svelte";
import IconClipBoard from "$lib/icons/IconClipBoard.svelte";

export const infoBlockStringConfig = {
    extraTimePolicy: {
        title: {
            ru: "Условия при превышении времени",
            en: "Extra Time Policy",
        },
        icon: IconClipBoard,
    },
    fuelPolicy: {
        title: {
            ru: "Условия использования топлива",
            en: "Fuel Policy",
        },
        icon: IconClipBoard,
    },
};
