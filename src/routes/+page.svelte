<script lang="ts">
  import { generations } from "./generations";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Monster from "./Monster.svelte";
  import { goto } from "$app/navigation";

  export let data: PageData;

  $: selectedGenerationId =
    $page.url.searchParams.get("generation_id") || "all";
  // const monsterClick = (monster : IndexMonster) =>{
  //     monsterId = monster.id;
  //     goto(`?monsterid=${monsterId}`)
  // }
  // $: console.log(monsterId);

  const updateSearchParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams); // get the current search url
    searchParams.set(key, value); // add the (monsterId, monster.id) to the searchParams object
    goto(`?${searchParams.toString()}`);
  };

  let form = {
    searchString: "",
  };
  let searchString = "";
  $: selectedMonster = data.monsters.filter((monster) => {
    return monster.name
      .toLocaleLowerCase()
      .includes(searchString.toLocaleLowerCase());
  });

  const submitSearch = (e: Event) => {
    searchString = form.searchString;
  };
</script>

<div class="generations">
  <button
    class="generation"
    class:active={selectedGenerationId == "all"}
    on:click={() => updateSearchParams("generation_id", "all")}
    data-sveltekit-preload-data
  >
    All
  </button>
  {#each generations as generation (generation.id)}
    <button
      class="generation"
      class:active={selectedGenerationId === generation.id.toString()}
      on:click={() =>
        updateSearchParams("generation_id", generation.id.toString())}
      data-sveltekit-preload-data
    >
      {generation.main_region}
    </button>
  {/each}
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
  <input
    class="search-field"
    type="text"
    bind:value={form.searchString}
    placeholder="Pokemon name"
  />
  <input type="submit" value="search" />
</form>

<div class="monsters">
  {#each selectedMonster as monster, i (monster.id)}
    <Monster {monster} />
  {/each}
</div>

<style lang="postcss">
  .generation.active {
    @apply bg-gray-800 text-white;
  }
</style>
