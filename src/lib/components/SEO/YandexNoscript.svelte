<script>
    export let counterId;
</script>

<noscript>
    <div>
        <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style="position:absolute; left:-9999px;"
            alt=""
        />
    </div>
    <iframe
        src={`https://mc.yandex.ru/watch/${counterId}`}
        style="position:absolute; left:-9999px;"
        width="1"
        height="1"
        frameborder="0"
    ></iframe>
</noscript>
