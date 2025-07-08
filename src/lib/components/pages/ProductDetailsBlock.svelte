<script>
    export let type;
    export let item;
    export let locale = "en";

    // Конфиг с метками и путями к данным для каждого типа
    const fieldsConfig = {
        car: [
            { key: "fuel", labelRu: "Топливо", labelEn: "Fuel" },
            { key: "seats", labelRu: "Мест", labelEn: "Seats" },
            { key: "doors", labelRu: "Дверей", labelEn: "Doors" },
            {
                key: "distanceLimit",
                labelRu: "Лимит км/день",
                labelEn: "Distance Limit",
            },
            { key: "luggage", labelRu: "Багаж (л)", labelEn: "Luggage (l)" },
            {
                key: "minRentalPeriodValue",
                labelRu: "Мин. период аренды",
                labelEn: "Min Rental Period",
            },
        ],
        excursion: [
            {
                key: "duration",
                labelRu: "Длительность (ч)",
                labelEn: "Duration (h)",
            },
            {
                key: "groupSize",
                labelRu: "Размер группы",
                labelEn: "Group Size",
            },
            {
                key: "distance",
                labelRu: "Дистанция (км)",
                labelEn: "Distance (km)",
            },
            { key: "start", labelRu: "Начало", labelEn: "Start" },
        ],
        yacht: [
            {
                key: "duration",
                labelRu: "Длительность (ч)",
                labelEn: "Duration (h)",
            },
            {
                key: "groupSize",
                labelRu: "Вместимость (чел)",
                labelEn: "Сapacity (per)",
            },
            {
                key: "distance",
                labelRu: "Дистанция (км)",
                labelEn: "Distance (km)",
            },
            { key: "start", labelRu: "Начало", labelEn: "Start" },
        ],
        transfer: [
            {
                key: "duration",
                labelRu: "Длительность (мин)",
                labelEn: "Duration (мин)",
            },
            {
                key: "car.model",
                labelRu: "Модель машины",
                labelEn: "Car Model",
            },
            { key: "car.seats", labelRu: "Мест", labelEn: "Seats" },
            { key: "priceType", labelRu: "Тип цены", labelEn: "Price Type" },
        ],
    };

    // Помощник для доступа к вложенным свойствам по строке с точками
    function getNested(obj, path) {
        return path
            .split(".")
            .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
    }
</script>

<div class="details">
    {#if fieldsConfig[type]}
        {#each fieldsConfig[type] as field}
            {#if getNested(item, field.key) !== null && getNested(item, field.key) !== undefined && getNested(item, field.key) !== ""}
                <div class="detail">
                    <span class="label"
                        >{locale === "ru"
                            ? field.labelRu
                            : field.labelEn}:</span
                    >
                    <span class="value">{getNested(item, field.key)}</span>
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>
    .details {
        display: grid;
        gap: 10px;
    }
    .detail {
        display: flex;
        justify-content: space-between;
    }
    .label {
        font-weight: 600;
    }
</style>
