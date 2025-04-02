<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
</script>
<Canvas>
    <Scene />
</Canvas>
<section class="absolute right-0 top-[5rem] w-[400px]">
    <Configurator />
</section>