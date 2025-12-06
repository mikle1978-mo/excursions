<!-- SimilarSlider.svelte -->
<script>
    export let items = [];
</script>

<section class="similar-slider">
    <h2 class="title">Похожие экскурсии</h2>

    <div class="slider">
        {#each items as item}
            <div class="slide">
                <slot name="card" {item}></slot>
            </div>
        {/each}
    </div>
</section>

<style>
    .similar-slider {
        margin-top: 2rem;
    }
    .title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .slider {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 1rem;
        scrollbar-width: none; /* Firefox */
    }
    .slider::-webkit-scrollbar {
        display: none; /* Chrome */
    }
    .slide {
        flex: 0 0 auto;
        width: 270px;
        scroll-snap-align: start;
    }
</style>
