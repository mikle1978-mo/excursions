<script>
    export let form;
</script>

<div class="login-wrapper">
    <div class="login-card">
        <div class="logo">🌊 Kemer Admin</div>
        <h1>Вход в админку</h1>

        {#if form?.error}
            <p class="error">{form.error}</p>
        {/if}

        <form method="POST">
            <label>
                Логин
                <input
                    name="username"
                    type="text"
                    placeholder="Введите логин"
                    autocomplete="username"
                    required
                />
            </label>

            <label>
                Пароль
                <input
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    autocomplete="current-password"
                    required
                />
            </label>

            <button type="submit">Войти</button>
        </form>
    </div>
</div>

<style>
    .login-wrapper {
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")
            no-repeat center center / cover;
        padding: 1rem;
    }

    .login-card {
        background: rgba(255, 255, 255, 0.9);
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 380px;
        text-align: center;
        backdrop-filter: blur(4px);
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    h1 {
        margin-bottom: 1.5rem;
        color: #333;
        font-size: 1.2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        text-align: left;
        color: #444;
    }

    input {
        padding: 0.6rem 0.8rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        transition:
            border-color 0.2s,
            box-shadow 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }

    button {
        padding: 0.7rem;
        background: #007bff;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
    }

    button:hover {
        background: #0056b3;
    }
    .error {
        color: red;
        margin-bottom: 1rem;
    }
</style>
