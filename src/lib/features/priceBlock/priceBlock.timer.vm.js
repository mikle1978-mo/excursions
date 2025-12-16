// priceBlock.timer.vm.js
import { readable, derived } from "svelte/store";
import { buildDiscountTimer } from "./priceBlock.utils.js";

function timeTicker(interval = 1000) {
    return readable(Date.now(), (set) => {
        const id = setInterval(() => set(Date.now()), interval);
        return () => clearInterval(id);
    });
}

const now = timeTicker(1000);

export function createTimerVM({ isDiscountActive, discountEnd }) {
    if (!isDiscountActive || !discountEnd) return null;

    return derived(now, () => {
        return buildDiscountTimer(discountEnd);
    });
}
