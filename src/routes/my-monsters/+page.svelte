<script lang="ts">
    import { caughtMonster } from "$lib/stores";
    import Monster from "../Monster.svelte";


</script>

<div class="monsters">
    {#each $caughtMonster as monster}
    <Monster 
    monster = {monster}
    />
    {/each}
</div>

<style>
    .monsters{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
   justify-content: center;
}
</style>

