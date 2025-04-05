<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
</script>
<Canvas>
    <Scene />
</Canvas>
<section class="absolute lg:right-3 mx-2 lg:top-[5rem] bottom-8 w-full lg:w-[360px]">
    <Configurator />
</section>