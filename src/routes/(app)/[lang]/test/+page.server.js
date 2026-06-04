// src/routes/(app)/[lang]/test/+page.server.js

import { error } from "@sveltejs/kit";

export const load = () => {
    console.log("🔥 LOAD EXECUTED");
    throw error(404, "TEST ERROR WORKS");
    // throw error(418, "I'm a teapot");
    // throw error(500, "REAL ERROR");
};
