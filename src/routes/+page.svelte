<script lang="ts">
    import { generations } from "./generations";
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import Monster from "./Monster.svelte";
    import { goto } from "$app/navigation";
    
    export let data : PageData;
   
    $: selectedGenerationId = $page.url.searchParams.get("generation_id") || "";
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






<div class="generations">
    <button
    class="generation"
    class:active={selectedGenerationId == "all"}
    on:click={()=> updateSearchParams('generation_id', "all")}
    >
    All
    </button>
    {#each generations as generation (generation.id)}
    <button 
        class="generation active" 
        class:active={selectedGenerationId === generation.id.toString()}
        on:click={()=> updateSearchParams('generation_id', generation.id.toString())}
    >
        {generation.main_region}
</button>
    {/each}    
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
    <input class="search-field" type="text" bind:value={form.searchString} placeholder="Pokemon name"/>
    <input type="submit" value="search"/>
</form>

<div class="monsters" >
    {#each selectedMonster as monster, i (monster.id)}
       <Monster 
       monster = {monster}
       updateSearchParams = {updateSearchParams}
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
    cursor: pointer;
}
.generation.active {
    background-color: #333;
    color: #fff;
}
.generation:hover{
    background-color: #eee;
}
.generation.active:hover{
    background-color: #333;
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

