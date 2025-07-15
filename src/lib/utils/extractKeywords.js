const STOP_WORDS = {
    ru: new Set([
        "и",
        "в",
        "на",
        "по",
        "с",
        "для",
        "без",
        "это",
        "что",
        "как",
        "мы",
        "вы",
        "он",
        "она",
        "оно",
        "они",
        "быть",
        "а",
        "но",
        "или",
        "у",
        "о",
        "от",
        "до",
        "к",
        "же",
        "также",
        "ли",
        "же",
        "еще",
        "уже",
        "тоже",
        "все",
        "этот",
        "тот",
    ]),
    en: new Set([
        "and",
        "in",
        "on",
        "for",
        "with",
        "the",
        "a",
        "an",
        "to",
        "is",
        "are",
        "be",
        "this",
        "that",
        "of",
        "at",
        "by",
        "from",
        "as",
        "was",
        "were",
        "it",
        "we",
        "you",
        "they",
        "but",
        "or",
        "if",
        "then",
        "so",
        "also",
        "too",
        "all",
    ]),
};

/**
 * Автоматически определяет язык и извлекает ключевые слова
 * @param {string} description — описание
 * @param {number} minLength — минимальная длина слова
 * @returns {string[]} массив уникальных ключевых слов
 */
export function extractKeywords(description, minLength = 4) {
    const isRussian = /[а-яё]/i.test(description);
    const lang = isRussian ? "ru" : "en";

    const words = description.toLowerCase().match(/\b[а-яa-zё]{3,}\b/gi) || [];

    const filtered = words.filter(
        (w) => w.length >= minLength && !STOP_WORDS[lang].has(w)
    );

    return [...new Set(filtered)];
}
