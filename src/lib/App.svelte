<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
	import { Drawer, P } from "flowbite-svelte";
    // type ModelColor = "black" | "white" | "gray" | "translucent";
    let modelColor: string = $state("black");
    let qKits: number = $state(1);
    let qFigures: number = $state(0);
    // let escala = $state('');
    let sScale = $state('');
    let viewOrder = $state(true);
    const setViewOrder = (value:boolean) => {viewOrder = value};
    // const setSelectedScale = (value: string) => {escala = value};
</script>
<Canvas>
    <Scene {modelColor} />
</Canvas>
<section class="absolute lg:right-3 mx-2 lg:top-[5rem] bottom-8 w-full lg:w-[360px]">
    <Configurator bind:modelColor bind:qKits bind:qFigures bind:sScale {setViewOrder} />
</section>
<section>
    <Drawer transitionType="fly" id="orderDrawer" bind:hidden={viewOrder}>
        <P>Escala: {sScale}</P>
        <P>Color: {modelColor}</P>
        <P>Cantidad de kits: {qKits}</P>
        <P>Total de escalas: {qFigures}</P>
    </Drawer>
</section>