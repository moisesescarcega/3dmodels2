<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./components/Scene.svelte";
	import Configurator from "./components/Configurator.svelte";
	import { Button, Card, Drawer, Modal, P } from "flowbite-svelte";
    import { CaretRightSolid } from "flowbite-svelte-icons";
    import { cartItems } from "./cartStore";
    let items: any[] = $state([]);
    let modelColor: string = $state("black");
    let viewOrder = $state(true);
    let defaultModal = $state(false);
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
    let totalAmount = $state(0);
    cartItems.subscribe( value => { items = value; });
    function calculateTotal() {
        totalAmount = items.reduce((sum, item) => sum + item.order.totalAmount, 0);
    };
    function removeItem( id: string ) {
        cartItems.update( items => items.filter(item => item.id !== id ) );
    };
    function submitOrder() {
        finalOrder = [...items];
        console.log(finalOrder);
    };
    const setViewOrder = (value:boolean) => {
        viewOrder = value
    };
    const handleOrder = () => {
        calculateTotal();
        defaultModal = true;
        setViewOrder(true);
    }
</script>
<Canvas>
    <Scene {modelColor} />
</Canvas>
<section class="absolute ml-3 mr-3 lg:right-3 lg:top-[5rem] bottom-[22px] max-w-[420px]">
    <Configurator bind:modelColor {setViewOrder} bind:preOrder />
</section>
<section>
    <button class="fixed top-[52px] z-[11] rounded-r-lg bg-primary-500 py-1" onclick={() => setViewOrder(false)}>
        <CaretRightSolid class="text-white" />
    </button>
    <Drawer transitionType="fly" id="orderDrawer" class="bg-blue-600/50" bind:hidden={viewOrder}>
        {#if items.length > 0}
        {#each items as item}
        <Card class="my-2" id={`card-${item.id}`}>
            <P size="sm" align="right">Conjunto #: ... {item.id.slice(-6)}</P>
            <P>Escala: {item.order.scale}</P>
            <P>Color: {item.color}</P>
            {#if item.order.figures.kit}
            <P>Kit predefinido: {item.order.figures.kit}</P>
            {/if}
            <P>Cantidad de Kits: {item.order.kits}</P>
            <P>Total de escalas: {item.order.totalFigures}</P>
            <P weight="bold" align="right">Subtotal: {item.order.totalAmount}
                &nbsp;<Button color="red" class="float-right mx-2" size="xs" onclick={() => removeItem(item.id)}>x</Button>
            </P>
        </Card>
        {/each}
        <Button id="backToOptions" class="mt-2" color="alternative" onclick={() => setViewOrder(true)}>Regresar</Button>
        <Button id="submitOrder" class="float-right mt-2" onclick={handleOrder}>Ordenar</Button>
        {:else}
        <P class="text-white">...no hay nada aquí.</P>
        {/if}
    </Drawer>
</section>
<Modal autoclose bind:open={defaultModal} title="Resumen de tu pedido">
    <div class="h-[350px] overflow-auto">
        {#each items as item}
            <P>Orden {item.id}</P>
            <P>Escala: {item.order.scale}; Color: {item.color}; Cantidad: {item.order.kits} kits;</P>
            {#if item.order.figures.kit}
            <P>Kit predefinido: {item.order.figures.kit}</P>
            <P>Total de escalas: {item.order.totalFigures}</P>
            {:else}
            <P>Total de escalas: {item.order.totalFigures}; Costo por unidad: ${item.order.costPerFigure} MXN; 
                Subtotal: ${item.order.totalAmount} MXN
            </P>
            {/if}
            <hr />
        {/each}
    </div>
    <P id="totalAmount">Total: $ {totalAmount.toFixed(2)} MXN</P>
    <Button id="submitOrder" class="float-right mt-2" onclick={submitOrder}>Pedir</Button>
</Modal>