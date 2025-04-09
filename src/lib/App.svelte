<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
	import { Drawer } from "flowbite-svelte";
    let { modelColor } = $props();
    let hidden: boolean = $state(true);
    let viewOrder = $derived(hidden);
    const handleColorChange = (color: string) => {
        modelColor = color;
    };
</script>
<Canvas>
    <Scene {modelColor} />
</Canvas>
<section class="absolute lg:right-3 mx-2 lg:top-[5rem] bottom-8 w-full lg:w-[360px]">
    <Configurator {modelColor} onColorChange={handleColorChange} {viewOrder} />
</section>
<section>
    <Drawer transitionType="fly" id="orderDrawer" bind:hidden>

    </Drawer>
</section>