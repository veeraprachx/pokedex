<script lang="ts">
    import { generations } from "./generations";
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import Monster from "./Monster.svelte";
    import { goto } from "$app/navigation";
    
    export let data : PageData;
    $: monsterId = $page.url.searchParams.get("monsterId"); //get value from variable monsterId in the url
    $: monster = data.monsters.find((monster) => monster.id === monsterId);
    $: monsterId2 = $page.url.searchParams.get("monsterId2"); //get value from variable monsterId2 in the url
    $: monster2 = data.monsters.find((monster) => monster.id === monsterId2)
    // const monsterClick = (monster : IndexMonster) =>{
    //     monsterId = monster.id;
    //     goto(`?monsterid=${monsterId}`)
    // }
    // $: console.log(monsterId);

    const updateSearchParams = (key: string, value:string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);// get the current search url
        searchParams.set(key,value); // add the (monsterId, monster.id) to the searchParams object
        goto(`?${searchParams.toString()}`); //*why use goto instead of return?*/
    };

    let form = {
        searchString : "",

    };
    let searchString = "";
    $: selectedMonster = data.monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    })

    const submitSearch = (e:Event) => {
        searchString = form.searchString;
    }
</script>


{#if monster}
<Monster  
monster = {monster}
updateSearchParams = {updateSearchParams}
/>
{/if}
{#if monster2}
<Monster  
monster = {monster2}
updateSearchParams = {updateSearchParams}
/>
{/if}



<div class="generations">
    {#each generations as generation (generation.id)}
    <div class="generation" on:click={()}>{generation.main_region}</div>
    {/each}    
</div>

<form class="search-form" on:submit={submitSearch}>
    <input class="search-field" type="text" bind:value={form.searchString} placeholder="Pokemon name"/>
    <input type="submit" value="search"/>
</form>

<div class="monsters" >
    {#each selectedMonster as monster, i (monster.id)}
       <Monster 
       monster = {monster}
       updateSearchParams = {updateSearchParams}
       isInteractive = {true}
        />
    {/each}
</div>


<style>
.generations{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.generation{
    margin : 10px;
    padding : 5px 10px ;
    border: 1px solid black;
    background-color: #f9f9f9;
    color: #333;
}
.generation:hover{
    background-color: #eee;
}
.monsters{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
   justify-content: center;
}
.search-form{
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
.search-form input[type="text"]{
    padding : 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 200px;
}
.search-form input[type="submit"]{
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    margin-left: 10px;
    background-color: #333;
    color: #fff;
}
</style>

