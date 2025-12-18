import { isDiscountActive } from "$lib/features/priceBlock/priceBlock.utils.js";
import getOldPrice from "$lib/utils/getOldPrice.js";

export function PriceBlockAdapter({ item, system, overlays, section }) {
    const { lang } = system;

    const price = item.price;
    const discount = item.discount;
    const discountEnd = item.discountEnd;

    const active = isDiscountActive(discount, discountEnd);

    return {
        section: section ?? {},
        // текущая цена
        basePrice: price,
        // старая цена (если есть активная скидка)
        baseOldPrice: active ? getOldPrice(price, discount) : null,
        // скидка
        discount,
        // флаг активности скидки
        isDiscountActive: active,
        // только дата конца скидки
        discountEnd,
    };
}
