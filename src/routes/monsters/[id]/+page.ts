import type { PageLoad } from "./$types";

// convert parameter to exact integer
function convertToInt(str: any) {
  let number = parseInt(str);
  if (!isNaN(number) && str === number.toString()) {
    return number;
  } else {
    return 0;
  }
}

export const load = (async ({ params, fetch }) => {
  const reposne = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20000`);
  const json = await reposne.json();
  const monsters: any = json.results;

  const monster_array = monsters.filter((element: any) => {
    const splitUrl = element.url.split("/");
    const id = splitUrl[splitUrl.length - 2];
    return id === params.id;
  });
  const monster = monster_array[0];
  return {
    name: monster.name,
    url: monster.url,
    id: params.id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`,
  };
}) satisfies PageLoad;
