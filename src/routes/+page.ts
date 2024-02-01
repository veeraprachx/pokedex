import type { PageLoad } from "./$types";

type ApiMonster = {
  name: string;
  url: string;
};
export type IndexMonster = ApiMonster & {
  id: string;
  image: string;
};
export const load = (async ({ fetch, url }) => {
  const generationId = url.searchParams.get("generation_id") || "all";
  let monsterList = [];
  if (generationId === "all") {
    const reposne = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20000"
    );
    const json = await reposne.json();
    monsterList = json.results;
  } else {
    const generationResponse = await fetch(
      `https://pokeapi.co/api/v2/generation/${generationId}`
    );
    const generationJson = await generationResponse.json();
    monsterList = generationJson.pokemon_species;
  }
  const monsters: IndexMonster[] = monsterList;
  return {
    monsters: monsters.map((monster: ApiMonster) => {
      const splitUrl = monster.url.split("/");
      const id = splitUrl[splitUrl.length - 2];
      return {
        name: monster.name,
        url: monster.url,
        id: id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    }),
  };
}) satisfies PageLoad;
