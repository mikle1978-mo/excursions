<script>
    import Clock from "$lib/icons/IconClock.svelte";

    import Start from "$lib/icons/IconStart.svelte";
    import IconClock from "$lib/icons/IconClock.svelte";
    import IconGroup from "$lib/icons/IconGroup.svelte";
    import IconDistance from "$lib/icons/IconDistance.svelte";

    export let distance;
    export let start;
    export let groupSize;
    export let duration;
    export let lang = "en";

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
                icon: "clock",
            },
            {
                key: "groupSize",
                labelRu: "Размер группы (чел)",
                labelEn: "Group Size (per)",
                icon: "group",
            },
            {
                key: "distance",
                labelRu: "Дистанция (км)",
                labelEn: "Distance (km)",
                icon: "distance",
            },
            {
                key: "start",
                labelRu: "Начало",
                labelEn: "Start",
                icon: "start",
            },
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
    <!-- {#if fieldsConfig[type]}
        {#each fieldsConfig[type] as field}
            {#if getNested(item, field.key) !== null && getNested(item, field.key) !== undefined && getNested(item, field.key) !== ""}
                <div class="detail">
                    <div class="detail_label">
                        {#if field?.icon && iconComponents[field.icon]}
                            <svelte:component
                                this={iconComponents[field.icon]}
                                class="icon"
                            />
                        {/if}

                        <span class="label"
                            >{locale === "ru"
                                ? field.labelRu
                                : field.labelEn}:</span
                        >
                    </div>

                    <span class="value">{getNested(item, field.key)}</span>
                </div>
            {/if}
        {/each}
    {/if} -->
    {#if start}
        <IconClock />
        <span class="value">{start}</span>
    {/if}
    {#if distance}
        <IconDistance />
        <span class="value">{distance}</span>
    {/if}
    {#if duration}
        <IconClock />
        <span class="value">{duration}</span>
    {/if}
    {#if groupSize}
        <IconGroup />
        <span class="value">{groupSize}</span>
    {/if}
</div>

<style>
    .details {
        width: 100%;
        display: grid;
        gap: 10px;
        /* padding: var(--space-vertical-md); */
    }
    .detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .detail_label {
        display: flex;
        gap: var(--space-vertical-sm);
        justify-content: space-between;
        align-items: center;
    }
    .value {
        display: flex;
        justify-content: flex-end;
    }
    .label {
        font-weight: 600;
    }
</style>
