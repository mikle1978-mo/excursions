// // card.price.vm.js
// import { selectedCurrency } from "$lib/stores/currency";
// import { appConfig } from "$lib/config/app.config";
// import { formatPrice } from "$lib/utils/priceFormatter";
// import { derived } from "svelte/store";

// export function CardVM(data) {
//     return derived(selectedCurrency, ($currency) => {
//         const rate = appConfig.services.currency.fallbackRates[$currency] ?? 1;

//         return {
//             formattedPrice: {
//                 current: formatPrice(data.value * rate, $currency),
//                 old: data.old ? formatPrice(data.old * rate, $currency) : null,
//             },
//             currency: $currency,
//         };
//     });
// }
