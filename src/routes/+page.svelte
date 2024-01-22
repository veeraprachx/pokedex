<script lang="ts">
    import { generations } from "./generations";
    const greetingObject = {
        greeting : "hello",
        name : "world"
    };
    const data = [
        'yellow',
        'red',
        'blue',
    ]
</script>

<h1>{greetingObject.greeting} to {greetingObject.name}</h1>
{#each data as color, i (color)}
<div>{i+1}:{color}</div>
{/each}

<style>

</style>

