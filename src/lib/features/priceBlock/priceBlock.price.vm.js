// priceBlock.price.vm.js
import { selectedCurrency } from "$lib/stores/currency";
import { appConfig } from "$lib/config/app.config";
import { formatPrice } from "$lib/utils/priceFormatter";
import { derived } from "svelte/store";

export function createPriceVM(data) {
    return derived(selectedCurrency, ($currency) => {
        const rate = appConfig.services.currency.fallbackRates[$currency] ?? 1;

        return {
            price: formatPrice(data.basePrice * rate, $currency),
            oldPrice: data.baseOldPrice
                ? formatPrice(data.baseOldPrice * rate, $currency)
                : null,
            currency: $currency,
        };
    });
}
