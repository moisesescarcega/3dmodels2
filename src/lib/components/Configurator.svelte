<script lang="ts">
	import { Button, Card, Heading, Label, NumberInput, P, Select } from "flowbite-svelte";
    import { itemsScale } from "./variantes";
	import { onMount } from "svelte";
    let cantidad = $state(1); //cantidad de kits
    let dcantidad = $state(false);
    let selectedScale = $state("");
    let qitems = $state(0); //cantidad de figuras por kit con valor String
    let totalFigures = $state(0); //total de figuras
    let calculateFigurines = () => {
        const sum = [1, 2, 3, 4].reduce((acc, num) => {
            const input = document.querySelector(`#ntipo-${num}`) as HTMLInputElement;
            return acc + (input ? parseInt(input.value) || 0:0);
        }, 0);
        totalFigures = sum * cantidad * qitems;
    };
    let selectScale = () => {
        selectedScale = (document.getElementById("fescala") as HTMLSelectElement)?.value;
        const selectedItem = itemsScale.find((item) => item.value === selectedScale);
        qitems = selectedItem?.qitems || 0;
        dcantidad = true;
        calculateFigurines();
        console.log(selectedScale, qitems, `Total figures: ${totalFigures}`);
    };
    let quantityOptions = $derived(
        selectedScale === '1 a 50' || selectedScale === '1 a 75' 
        ? [1, 2, 3, 4, 5].map(value => ({ label: value.toString(), value, name: value.toString() })) 
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => ({ label: value.toString(), value, name: value.toString() }))
    );
    let classTypeOnLoad = (num: number) => {
        (document.querySelector(`#ntipo-${num}`) as HTMLSelectElement)?.value !== '0' 
        ? document.querySelector(`#tipo-${num}`)?.classList.add("h-16", "m-2") 
        : document.querySelector(`#tipo-${num}`)?.classList.add("h-16", "m-2", "blur-xs", "grayscale");
    };
    let selectType = (num: number) => {
        (document.querySelector(`#ntipo-${num}`) as HTMLSelectElement)?.value !== '0' 
        ? document.querySelector(`#tipo-${num}`)?.classList.remove("blur-xs", "grayscale") 
        : document.querySelector(`#tipo-${num}`)?.classList.add("blur-xs", "grayscale");
    };
    onMount(() => {classTypeOnLoad(1); classTypeOnLoad(2); classTypeOnLoad(3); classTypeOnLoad(4);});

</script>
<form>
    <Card class="gap-y-2">
        <Heading class="text-right" tag="h5">
            Configura tu paquete
        </Heading>
        <Label>Escala:
            <Select 
                required 
                size="sm" 
                id="fescala" 
                placeholder="Selecciona una opción..." 
                items={itemsScale} 
                onchange={selectScale}
            />
        </Label>
        {#if dcantidad}
        <Label>Cantidad de kits:
            <!-- <NumberInput size="lg" bind:value={cantidad} max={10} min={1} /> -->
             <div class="grid grid-cols-4 gap-2 items-center">
                <Select 
                    required 
                    size="sm" 
                    id="fcantidad" 
                    placeholder="Selecciona la cantidad..." 
                    items={quantityOptions}
                    class="col-span-1"
                    bind:value={cantidad}
                />
                <P class="col-span-3">paquetes de {qitems} escalas</P>
             </div>
        </Label>
        {/if}
        <Label>Opciones:
            <div class="grid grid-cols-2 gap-2">
                {#snippet values(img:string, id:number, altimg:string, value:number)}
                    <div class="flex flex-row items-center">
                        <img src={img} id={`tipo-${id}`} alt={altimg} />
                        <div class="flex-col">
                            <P size="sm">{altimg}</P>
                            <NumberInput size="sm" id={`ntipo-${id}`} onchange={() => selectType(id)} min={0} max={20} value={value} />
                        </div>
                    </div>
                {/snippet}
                {@render values("mini_r0.png", 1, "De pie", 1)}
                {@render values("mini_r0.png", 2, "De pie", 0)}
                {@render values("mini_r0.png", 3, "Sentado", 2)}
                {@render values("mini_r0.png", 4, "Caminando", 0)}
                <!-- <div class="flex flex-row items-center">
                    <img src="mini_r0.png" id="tipo-1" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">De pie</P>
                        <NumberInput size="sm" id="ntipo-1" onchange={() => selectType(1)} min={0} max={20} value={1} />
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="mini_r0.png" id="tipo-2" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">De pie</P>
                        <NumberInput size="sm" id="ntipo-2" onchange={() => selectType(2)} min={0} max={20} value={0} />
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="mini_r0.png" class="h-16 m-2" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">Sentado</P>
                        <NumberInput size="sm" />
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="mini_r0.png" class="h-16 m-2" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">Caminando</P>
                        <NumberInput size="sm" />
                    </div>
                </div> -->
            </div>
        </Label>
        <div class="grid grid-cols-2 gap-6">
            <Label>Total:
                <P size="xl" class="text-right font-bold">
                    $ &nbsp;{totalFigures * 3} MXN
                </P>
            </Label>
            <Button class="w-full" size="lg" color="blue">
                Añadir
            </Button>
        </div>
    </Card>
</form>