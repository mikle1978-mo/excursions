// src\lib\features\priceBlock\priceBlock.adapter.js
import {
    buildDiscountTimer,
    isDiscountActive,
} from "$lib/features/priceBlock/priceBlock.utils.js";
import {
    priceTypeLabels,
    discountEndLabels,
} from "$lib/features/priceBlock/priceBlock.constants.js";
import getOldPrice from "$lib/utils/getOldPrice";

// priceBlock.adapter.js
export function PriceBlockAdapter({ item, system }) {
    const { lang } = system;

    const price = item.price;
    const discount = item.discount;
    const discountEnd = item.discountEnd;

    const active = isDiscountActive(discount, discountEnd);

    console.log("DISCOUNT CHECK", {
        discount,
        discountType: typeof discount,
        discountEnd,
        parsed: new Date(discountEnd + "T23:59:59").getTime(),
        now: Date.now(),
    });

    return {
        basePrice: price,
        baseOldPrice: active ? getOldPrice(price, discount) : null,
        discount,
        isDiscountActive: active,
        discountEnd, // ← ТОЛЬКО дата
        priceTypeLabel: priceTypeLabels[item.priceType]?.[lang] ?? "",
        discountEndLabel: discountEndLabels[lang],
    };
}
