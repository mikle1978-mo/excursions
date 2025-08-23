// src/lib/server/utils/listFields.js
export const LIST_FIELDS = {
    main: {
        _id: 0,
        slug: 1,
        active: 1,
        price: 1,
        discount: 1,
        discountEnd: 1,
    },
    translation: {
        _id: 0,
        itemSlug: 1,
        title: 1,
    },
};

// src/lib/server/utils/listColumns.js
export const LIST_COLUMNS = {
    slug: "Slug",
    title_ru: "Название",
    active: "Активна",
    price: "Цена",
    discount: "Скидка",
    discountEnd: "Скидка до",
};
