<script lang="ts">
  import { caughtMonster } from "$lib/stores";
  import Monster from "../Monster.svelte";
</script>

<div class="monsters">
  {#each $caughtMonster as monster}
    <Monster {monster} />
  {/each}
</div>

<style>
</style>
