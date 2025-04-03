<script lang="ts">
	import { Button, Card, Heading, Label, NumberInput, P, Select } from "flowbite-svelte";
    import { itemsScale } from "./variantes";
	import { onMount } from "svelte";
    let cantidad = $state(1); //cantidad de kits
    let dcantidad = $state(false);
    let selectedScale = $state("");
    let qitems = $state(0); //cantidad de figuras por kit
    let totalFigures = $state(0); //total de figuras
    let subtotalFigures = $state(0); //subtotal de figuras
    let qFiguraInicial1 = $state(1);
    let qFiguraInicial2 = $state(1);
    let qFiguraInicial3 = $state(1);
    let qFiguraInicial4 = $state(1);
    let enabledOrder = $state(false);
    let costoPorFigura = $state(0); //costo por figura

    // Calcula el total de figuras
    let calculateFigurines = () => {
        const sum = [1, 2, 3, 4].reduce((acc, num) => {
            const input = document.querySelector(`#ntipo-${num}`) as HTMLInputElement;
            return acc + (input ? parseInt(input.value) || 0 : 0);
        }, 0);
        subtotalFigures = sum;
        totalFigures = sum * cantidad;
        subtotalFigures >= qitems ? enabledOrder = true : enabledOrder = false;
        // console.log(
        //     `Pose1: ${qFiguraInicial1}. 
        //     Pose2: ${qFiguraInicial2}. 
        //     Pose3: ${qFiguraInicial3}.
        //     Pose4: ${qFiguraInicial4}. 
        //     Total figures: ${totalFigures}`
        // );
    };

    // Selecciona la escala de acuerdo a las opciones disponibles
    let selectScale = () => {
        selectedScale = (document.getElementById("fescala") as HTMLSelectElement)?.value;
        switch (selectedScale) {
            case '1 a 50':
                qFiguraInicial1 = 3;
                qFiguraInicial2 = 3;
                qFiguraInicial3 = 2;
                qFiguraInicial4 = 2;
                costoPorFigura = 10;
                break;
            case '1 a 75':
                qFiguraInicial1 = 4;
                qFiguraInicial2 = 4;
                qFiguraInicial3 = 4;
                qFiguraInicial4 = 3;
                costoPorFigura = 7;
                break;
            case '1 a 100':
                qFiguraInicial1 = 6;
                qFiguraInicial2 = 6;
                qFiguraInicial3 = 4;
                qFiguraInicial4 = 4;
                costoPorFigura = 5;
                break;
            case '1 a 150': 
                qFiguraInicial1 = 9;
                qFiguraInicial2 = 9;
                qFiguraInicial3 = 9;
                qFiguraInicial4 = 8;
                costoPorFigura = 3;
                break;
            case '1 a 200':
                qFiguraInicial1 = 13;
                qFiguraInicial2 = 13;
                qFiguraInicial3 = 12;
                qFiguraInicial4 = 12;
                costoPorFigura = 2;
                break;
            default:
                qFiguraInicial1 = 1;
                qFiguraInicial2 = 1;
                qFiguraInicial3 = 1;
                qFiguraInicial4 = 1;
                costoPorFigura = 0;
                break;
        };
        const selectedItem = itemsScale.find((item) => item.value === selectedScale);
        qitems = selectedItem?.qitems || 0;
        dcantidad = true;
        // calculateFigurines();
        setTimeout(() => {
            calculateFigurines();
            const orderSummary = {
            scale: selectedScale,
            figures: {
                standing_man: qFiguraInicial1,
                standing_woman: qFiguraInicial2,
                sitting: qFiguraInicial3,
                walking: qFiguraInicial4
            },
            totalFigures: totalFigures,
            totalAmount: totalFigures * costoPorFigura,
            costPerFigure: costoPorFigura
        };
        
        console.log('Order Summary:', orderSummary);
        }, 0);
    };
    let quantityOptions = $derived(
        selectedScale === '1 a 50' || selectedScale === '1 a 75' 
        ? [1, 2, 3, 4, 5].map(value => ({ label: value.toString(), value, name: value.toString() })) 
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => ({ label: value.toString(), value, name: value.toString() }))
    );

    // Cambia las clases de las imagenes al seleccionar el tipo de figura
    let selectType = (num: number) => {
        if ((document.querySelector(`#ntipo-${num}`) as HTMLSelectElement)?.value !== '0') {
            document.querySelector(`#tipo-${num}`)?.classList.remove("blur-xs", "grayscale")
        } else {
            document.querySelector(`#tipo-${num}`)?.classList.add("blur-xs", "grayscale");
        };
        calculateFigurines();
    };

    // Establece las clases de las imagenes al cargar
    let classTypeOnLoad = (num: number) => {
        (document.querySelector(`#ntipo-${num}`) as HTMLSelectElement)?.value !== '0' 
        ? document.querySelector(`#tipo-${num}`)?.classList.add("h-16", "m-2") 
        : document.querySelector(`#tipo-${num}`)?.classList.add("h-16", "m-2", "blur-xs", "grayscale");
    };
    onMount(() => {
        for (let i = 1; i <= 4; i++) {
            classTypeOnLoad(i);
        }
    });

    const handleAddToCart = () => {
        const currentValues = {
            standing_man: parseInt((document.querySelector('#ntipo-1') as HTMLInputElement)?.value || '0'),
            standing_woman: parseInt((document.querySelector('#ntipo-2') as HTMLInputElement)?.value || '0'),
            sitting: parseInt((document.querySelector('#ntipo-3') as HTMLInputElement)?.value || '0'),
            walking: parseInt((document.querySelector('#ntipo-4') as HTMLInputElement)?.value || '0')
        };

        const orderSummary = {
            scale: selectedScale,
            kits: cantidad,
            figures: currentValues,
            figuresPerKit: qitems,
            totalFigures: totalFigures,
            totalAmount: totalFigures * costoPorFigura,
            costPerFigure: costoPorFigura
        };
        
        console.log('Cart Order Summary:', orderSummary);
    };
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
                    onchange={calculateFigurines}
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
                {@render values("mini_r0.png", 1, "Hombre de pie", qFiguraInicial1)}
                {@render values("mini_r0.png", 2, "Mujer de pie", qFiguraInicial2)}
                {@render values("mini_r0.png", 3, "Sentado", qFiguraInicial3)}
                {@render values("mini_r0.png", 4, "Caminando", qFiguraInicial4)}
            </div>
        </Label>
        <div class="grid grid-cols-2 gap-6">
            <Label>Total:
                <P size="xl" class="text-right font-bold">
                    {#if enabledOrder}
                    $ &nbsp;{totalFigures * costoPorFigura} MXN
                    {:else}
                    $ &nbsp;- MXN
                    {/if}
                </P>
            </Label>
            <Button class="w-full" id="addToCart" size="lg" color="blue" disabled={!enabledOrder} onclick={handleAddToCart}>
                Añadir
            </Button>
        </div>
    </Card>
</form>