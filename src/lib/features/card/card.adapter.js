import { buildBadges } from "$lib/features/card/overlays/badges.adapter.js";

export function CardAdapter({ item, config, system }) {
    // 1️⃣ Собираем overlays ОДИН РАЗ
    const overlays = {
        badges: buildBadges(item, config.overlays?.badges?.rules ?? {}, system),
    };

    return {
        overlays,

        // 2️⃣ Пробрасываем overlays в каждый section.adapter
        sections: config.sections.map((section) => ({
            component: section.component,
            position: section.position ?? "content",
            data: section.adapter
                ? section.adapter({
                      item,
                      system,
                      overlays,
                      section,
                  })
                : null,
        })),
    };
}
