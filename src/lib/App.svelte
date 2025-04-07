<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
    let { modelColor } = $props();
    const handleColorChange = (event: CustomEvent<string>) => {
        modelColor = event.detail;
    };
</script>
<Canvas>
    <Scene {modelColor} />
</Canvas>
<section class="absolute lg:right-3 mx-2 lg:top-[5rem] bottom-8 w-full lg:w-[360px]">
    <Configurator {modelColor} on:colorChange={handleColorChange} />
</section>