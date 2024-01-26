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

export const load = ( async ({ params, fetch }) => {
    console.log('hello');
    const reposne = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20000`);
    const json = await reposne.json();
    const monsters : any = json.results;
    
    const monster = monsters.map((element : any) => element.url === params.id)
    
   
    console.log(monsters);

    // const monster = monsters[convertToInt(params.id)-1]
    return {
        name : monster.name,
        url : monster.url,
        id : params.id,
        image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`
    }
}) satisfies PageLoad;