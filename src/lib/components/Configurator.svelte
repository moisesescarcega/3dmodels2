<script lang="ts">
	import { Button, Card, Heading, Label, NumberInput, P, Select } from "flowbite-svelte";
    let itemsScale = [
        { name: "1 a 50", value: "1 a 50" },
        { name: "1 a 75", value: "1 a 75" },
        { name: "1 a 100", value: "1 a 100" },
        { name: "1 a 150", value: "1 a 150" },
        { name: "1 a 200", value: "1 a 200" },
    ];
    let cantidad = $state(1);

</script>
<form>
    <Card class="gap-y-2">
        <Heading class="text-right" tag="h5">
            Configura
        </Heading>
        <Label>Escala:
            <Select required size="sm" placeholder="Selecciona una opción..." items={itemsScale} />
        </Label>
        <Label>Cantidad:
            <NumberInput size="lg" bind:value={cantidad} max={10} min={1} />
        </Label>
        <Label>Opciones:
            <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-row items-center">
                    <img src="mini_r0.png" class="h-16 m-2" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">De pie</P>
                        <NumberInput size="sm" />
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src="mini_r0.png" class="h-16 m-2" alt="de pie" />
                    <div class="flex-col">
                        <P size="sm">Corriendo</P>
                        <NumberInput size="sm" />
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
                </div>
            </div>
        </Label>
        <div class="grid grid-cols-2 gap-6">
            <Label>Total:
                <P size="xl" class="text-right font-bold">
                    $ &nbsp;{cantidad * 10} MXN
                </P>
            </Label>
            <Button class="w-full" size="lg" color="primary">
                Añadir
            </Button>
        </div>
    </Card>
</form>