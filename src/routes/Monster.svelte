<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { IndexMonster } from "./+page";
    import { caughtMonster } from "$lib/stores";

    export let monster:IndexMonster;
    let isCaught : boolean = false;

    const catchMonster = () => {
        if(!($caughtMonster.find(element => element.id === monster.id))){
            caughtMonster.update((monsters) => {
            return [...monsters, monster]
        })
        }
    };
    const releaseMonster = () => {
    caughtMonster.update(monsters => {
        return monsters.filter(element => element.id !== monster.id);
    });
};

    const goToMonster = (element : IndexMonster) => {
        goto(`monsters/${element.id}`)
    }
</script>

      
<div class="monster">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div data-sveltekit-preload-data on:click={() => goToMonster(monster)}>
        <div class = monster-content>
            <img src={monster.image} alt={monster.name}>
            {monster.name}
        </div>
        <div class = monster-id>
            {monster.id}
        </div>
    </div>
    {#if !($caughtMonster.find(element => element.id === monster.id))}
        <button class = "catch-monster" on:click={catchMonster}>catch monster</button>
    {:else}
        <button class = "release-monster" on:click={releaseMonster}>release monster</button>
    {/if}
</div>


<style>

.monster-id{
    position: absolute;
    top : 8px;
    left: 8px;
    font-size: 0.8em;
    color: #aaa;
}
.monster{
    width: 100px;
    margin: 10px;
    padding: 10px;
    position: relative;
    background-color: #eee;
}
.monster:hover{
    background-color: #ddd;
}
.monster-content{
    display : flex;
    flex-direction: column;
    align-items: center;
}
.catch-monster{
    background-color: #79a14b;
    color: white;
    border-radius: 10%;
}
.catch-monster:hover{
   background-color: #268513;
}
.release-monster{
    background-color: #dc5b5b;
    color: white;
    border-radius: 10%;
}
.release-monster:hover{
   background-color: #d22424;
}
</style>