<script lang="ts">
  import { T, useThrelte, useTask } from "@threlte/core";
  import { CubeEnvironment, OrbitControls, Suspense, Text } from "@threlte/extras";
  import { onMount } from "svelte";
  import { DoubleSide, Color, ShaderMaterial, type WebGLRenderer } from "three";
	import MmoiBlack from "./mmoiBlack.svelte";
	import MmoiWhite from "./mmoiWhite.svelte";
	import MmoiGray from "./mmoiGray.svelte";
	import MmoiTranslucent from "./mmoiTranslucent.svelte";
  let { modelColor = 'black' } = $props();
  let currentColor = $state(modelColor); // Estado reactivo local

  $effect(() => {
    console.log("Color actualizado en Scene:", modelColor);
    currentColor = modelColor; // Sincroniza cuando cambia la prop
  });

  let time = 0;
  let shaderMaterial: ShaderMaterial | undefined = $state();
  
  onMount(() => {
    const {renderer} = useThrelte() as {renderer: WebGLRenderer};
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  useTask((delta: number) => {
    time += delta;
    if (shaderMaterial) {
      (shaderMaterial as ShaderMaterial).uniforms.uTime.value = time;
    }
  });

  // $effect(() => {
  //   console.log("Scene recibió color:", modelColor);
  // });
</script>

<Suspense>
{#snippet fallback()}
<Text
  position.z={-2}
  text="Loading..."
  fontSize={2}
  color="black"
  anchorX="50%"
  anchorY="50%"
  oncreate={(ref) => {
    ref.lookAt(-40, 25, 40)
  }}
/>
{/snippet}

<T.PerspectiveCamera
  makeDefault
  position={[-5, 2.5, 5]}
  fov={50}
>
  <OrbitControls
    autoRotate={false}
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target.y={1.5}
  />
</T.PerspectiveCamera>
<T.AmbientLight position={[0.5, 2.0, 2.0]} intensity={Math.PI / 8} />
<T.DirectionalLight
  position={[2.5, 2.0, 2.0]}
  intensity={Math.PI / 2}
  color={new Color(0xFFFFFF)}
/>
<T.Mesh>
  <T.SphereGeometry args={[20, 32, 32]} />
  <T.ShaderMaterial
    bind:ref={shaderMaterial}
    uniforms={{
      uTime: { value: 0 }
    }}
    vertexShader={`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `}
    fragmentShader={`
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 colorAzul = vec3(0.0, 0.35, 0.66);
        vec3 colorAmarillo = vec3(1.0, 0.95, 0.5);
        float oscillation = 0.5 + 0.5 * sin(uTime * 0.2);
        float pattern = 0.5 + 0.5 * sin(vUv.x * 10.0 + uTime * 0.3) * sin(vUv.y * 10.0 + uTime * 0.2);
        vec3 color = mix(colorAzul, colorAmarillo, oscillation * pattern);
        color += vec3(0.1) * pow(pattern, 2.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `}
    side={DoubleSide}
  />
</T.Mesh>

{#if currentColor === 'black'}
<MmoiBlack />
{:else if currentColor === 'gray'}
<MmoiGray />
{:else if currentColor === 'white'}
<MmoiWhite />
{:else}
<MmoiTranslucent />
{/if}
</Suspense>