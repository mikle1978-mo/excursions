import { json } from "@sveltejs/kit";
import { getExchangeRates } from "$lib/server/services/shared/currency/exchange.service.js";

export async function GET() {
    const rates = await getExchangeRates();
    return json(rates || {});
}
