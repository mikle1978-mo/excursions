import IconHome from "$lib/icons/IconHome.svelte";
import IconFilter from "$lib/icons/IconFilter.svelte";
import IconHelp from "$lib/icons/IconHelp.svelte";
import IconGrid from "$lib/icons/IconGrid.svelte";

export const footer_list = [
    {
        id: 1,
        title: { ru: "Главная", en: "Home" },
        link: "",
        rel: "",
        target: "",
        icon: IconHome,
    },
    {
        id: 2,
        title: { ru: "Фильтр", en: "Filter" },
        link: "filter",
        rel: "",
        target: "",
        icon: IconFilter,
    },
    {
        id: 3,
        title: { ru: "Вопросы", en: "FAQ" },
        link: "faq",
        rel: "",
        target: "",
        icon: IconHelp,
    },
    {
        id: 4,
        title: { ru: "Еще...", en: "More.." },
        link: "more",
        rel: "",
        target: "",
        icon: IconGrid,
    },
];
