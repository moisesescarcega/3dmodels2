<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
	import { Button, Card, Drawer, P } from "flowbite-svelte";
    import { cartItems } from "./cartStore";
    let items: any[] = $state([]);
    cartItems.subscribe( value => { items = value; });
    let modelColor: string = $state("black");
    let qKits: number = $state(1);
    let qFigures: number = $state(0);
    let sScale = $state('');
    let viewOrder = $state(true);
    const setViewOrder = (value:boolean) => {viewOrder = value};
    let preOrder = $state({
        scale: "",
        kits: 0,
        figures: {
            standing_man: 0,
            standing_woman: 0,
            sitting: 0,
            walking: 0,
            kit: undefined
        },
        figuresPerKit: 0,
        totalFigures: 0,
        totalAmount: 0,
        costPerFigure: 0
    });
    let finalOrder = [];
    function removeItem( id: string ) {
        cartItems.update( items => items.filter(item => item.id !== id ) );
    };
    function submitOrder() {
        finalOrder = [...items];
        console.log(finalOrder);
    };
</script>
<Canvas>
    <Scene {modelColor} />
</Canvas>
<section class="absolute lg:right-3 mx-2 lg:top-[5rem] bottom-8 w-full lg:w-[360px]">
    <Configurator bind:modelColor bind:qKits bind:qFigures bind:sScale {setViewOrder} bind:preOrder />
</section>
<section>
    <Drawer transitionType="fly" id="orderDrawer" bind:hidden={viewOrder}>
        {#each items as item}
        <Card class="my-2" id={`card-${item.id}`}>
            <P size="lg" align="right">Conjunto seleccionado:</P>
            <P>Escala: {item.order.scale}</P>
            <P>Color: {item.color}</P>
            <P>{item.order.figures.kit}</P>
            <P>Escalas por Kit: {item.order.figuresPerKit}</P>
            <P>Cantidad de Kits: {item.order.kits}</P>
            <P>Total de escalas: {item.order.totalFigures}</P>
            <P weight="bold" align="right">Subtotal: {item.order.totalAmount}
                &nbsp;<Button color="red" class="float-right mx-2" size="xs" onclick={() => removeItem(item.id)}>x</Button>
            </P>
        </Card>
        {/each}
        <Button id="submitOrder" class="float-right mt-2" onclick={submitOrder}>Ordenar</Button>
    </Drawer>
</section>