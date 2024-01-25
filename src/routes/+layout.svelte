<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { caughtMonster } from "$lib/stores";
</script>

<div class="navbar">
  <a href="/" class:active={$page.url.pathname == "/"}>Home</a>
  <a href="/my-monsters" class:active={$page.url.pathname == "/my-monsters"}>
    My monster {$caughtMonster.length}
  </a>
</div>

<div class="container">
  <slot />
</div>

<style lang="postcss">
  :global(body) {
    margin: 0;
    background-color: rgb(243 244, 246);
  }
  .navbar a.active {
    @apply border border-gray-300 rounded bg-slate-600 text-white;
  }
</style>
