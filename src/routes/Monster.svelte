<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { IndexMonster } from "./+page";

    export let monster:IndexMonster;
    export let updateSearchParams : (key:string, value:string) => void; //function define
    export let isInteractive : Boolean = false;

</script>




 <!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->        
<div class="monster">
    <div on:click={() => isInteractive ? updateSearchParams('monsterId',monster.id) : () => {}}>
        <div class = monster-content>
            <img src={monster.image} alt={monster.name}>
            {monster.name}
        </div>
        <div class = monster-id>
            {monster.id}
        </div>
    </div>
    {#if isInteractive}
    <div on:click={() => updateSearchParams('monsterId2', monster.id)}>
        Add monster 2
    </div>   
    {/if}
</div>


<style>
.monsters{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
   justify-content: center;
}
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
</style>