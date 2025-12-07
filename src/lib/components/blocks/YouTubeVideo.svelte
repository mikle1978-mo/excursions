<script>
    import { appConfig } from "$lib/config/app.config";

    export let props;
    const config = appConfig?.blocks?.youtube;
    const data = Object.fromEntries(props.fields.map((f) => [f.key, f.value]));
    const videoUrl = data.videoUrl || "";
    const lang = data.lang || "en";
    const title = data.title || config.defaultTitle[lang];
    const poster = data.images[0].url || config.defaultPoster;

    function getYouTubeId(url) {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) {
                return u.pathname.slice(1);
            } else if (u.hostname.includes("youtube.com")) {
                return u.searchParams.get("v") || u.pathname.split("/").pop();
            }
        } catch (e) {
            return null;
        }
    }

    let videoId = getYouTubeId(videoUrl);
    let showVideo = false;

    const openVideo = () => (showVideo = true);
</script>

{#if videoId && videoId.trim() !== ""}
    <div class="video-wrapper">
        {#if !showVideo}
            <button
                class="poster"
                on:click={openVideo}
                aria-label={`Play video: ${title}`}
            >
                <img src={poster} alt={title} />
                <div class="play-button">▶</div>
            </button>
        {:else}
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                {title}
            ></iframe>
        {/if}
    </div>
{/if}

<style>
    .video-wrapper {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 */
        background-color: #000;
        overflow: hidden;
        border-radius: var(--radius-md);
    }

    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: none;
        border: none;
    }

    .poster img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .play-button {
        position: relative;
        z-index: 1;
        font-size: 3rem;
        color: white;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>
