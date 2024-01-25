<script lang="ts">
  import type { PageData } from "./$types";
  export let data;
  import { caughtMonster } from "$lib/stores";

  let monster = {
    name: data.name,
    url: data.url,
    id: data.id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
  };
  const catchMonster = () => {
    if (!$caughtMonster.find((element) => element.id === monster.id)) {
      caughtMonster.update((monsters) => {
        return [...monsters, monster];
      });
    }
  };
  const releaseMonster = () => {
    caughtMonster.update((monsters) => {
      return monsters.filter((element) => element.id !== monster.id);
    });
  };
</script>

<div class="contain-container">
  <h1>Infomation</h1>
  <div class="flex flex-row flex-wrap justify-center align-middle text-center">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div>
      <div class="monster-content">
        <img src={data.image} alt={data.name} />
        <div>
          {#if !$caughtMonster.find((element) => element.id === monster.id)}
            <button class="catch-monster" on:click={catchMonster}
              >catch monster</button
            >
          {:else}
            <button class="release-monster" on:click={releaseMonster}
              >release monster</button
            >
          {/if}
        </div>
      </div>
    </div>
    <div class="text-left">
      <p>Name : {data.name}</p>
      <p>ID : {data.id}</p>
    </div>
  </div>
</div>

<style lang="postcss">
  .contain-container {
    @apply my-20 flex flex-col justify-center align-middle text-center;
  }
  h1 {
    @apply text-lg p-4;
  }
  img {
    @apply w-96 m-2.5 p-2.5 border border-black rounded-md bg-gray-200;
  }
</style>
