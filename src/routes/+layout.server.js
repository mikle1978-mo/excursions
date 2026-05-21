// src\routes\+layout.server.js

export function load({ locals }) {
    return {
        lang: locals.lang,
        __source: "+layout.server.js",
    };
}
