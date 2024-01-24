<script lang="ts">
    import type { PageData } from "./$types";
    export let data;
    import { caughtMonster } from "$lib/stores";

    let monster = {
                name : data.name,
                url : data.url,
                id : data.id,
                image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
            }
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
</script>

<div class="contain-container">
    <h1>Infomation</h1>
    <p>Name : {data.name}</p>
    <div class="monster">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div>
            <div class = monster-content>
                <img src={data.image} alt={data.name}>
                {data.name}
            </div>
            <div class = monster-id>
                {data.id}
            </div>
        </div>
        {#if !($caughtMonster.find(element => element.id === monster.id))}
        <button class = "catch-monster" on:click={catchMonster}>catch monster</button>
        {:else}
            <button class = "release-monster" on:click={releaseMonster}>release monster</button>
        {/if}
    </div>
</div>
<style>
    .contain-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
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