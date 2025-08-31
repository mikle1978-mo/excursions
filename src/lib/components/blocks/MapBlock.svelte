<script>
    import { onMount } from "svelte";

    export let lat;
    export let lng;
    export let zoom = 13; // масштаб по умолчанию

    $: hasCoordinates = lat != null && lng != null;

    // Преобразуем целые координаты (если >90 или >180)
    $: latNum = lat > 90 ? lat / 1000 : lat;
    $: lngNum = lng > 180 ? lng / 1000 : lng;

    let map;

    onMount(async () => {
        if (!hasCoordinates) return;

        const L = (await import("leaflet")).default;
        await import("leaflet/dist/leaflet.css");

        map = L.map("map").setView([latNum, lngNum], zoom);

        // Используем OpenStreetMap тайлы
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Маркер
        L.marker([latNum, lngNum]).addTo(map);
    });
</script>

{#if hasCoordinates}
    <div class="map-wrapper">
        <div id="map" style="width:100%; height:400px;"></div>
        <a
            class="map-link"
            href={`https://www.google.com/maps?q=${latNum},${lngNum}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            Открыть в Google Maps
        </a>
    </div>
{:else}
    <p>Координаты не заданы</p>
{/if}

<style>
    .map-wrapper {
        width: 100%;
        max-width: 800px;
        margin: 1rem auto;
    }

    #map {
        width: 100%;
        height: 400px;
        border-radius: var(--radius-md, 8px);
    }

    .map-link {
        display: inline-block;
        margin-top: 0.5rem;
        color: var(--color-primary, #0077ff);
        font-weight: 500;
    }
</style>
