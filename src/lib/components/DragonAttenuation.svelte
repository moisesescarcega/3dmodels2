<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0 ./static/DragonAttenuation.glb --transform --types --draco
-->

<script lang="ts">
  import type * as THREE from 'three'

  import type { Snippet } from 'svelte'
  import { T, type Props } from '@threlte/core'
  import { useGltf, useDraco } from '@threlte/extras'

  let {
    fallback,
    error,
    children,
    ref = $bindable(),
    ...props
  }: Props<THREE.Group> & {
    ref?: THREE.Group
    children?: Snippet<[{ ref: THREE.Group }]>
    fallback?: Snippet
    error?: Snippet<[{ error: Error }]>
  } = $props()

  type GLTFResult = {
    nodes: {
      Cloth_Backdrop: THREE.Mesh
      Dragon: THREE.Mesh
    }
    materials: {
      ['Cloth Backdrop']: THREE.MeshStandardMaterial
      ['Dragon with Attenuation']: THREE.MeshPhysicalMaterial
    }
  }

  const dracoLoader = useDraco()
  const gltf = useGltf<GLTFResult>('/models/DragonAttenuation-transformed.glb', { dracoLoader })
</script>

<T.Group
  bind:ref
  dispose={false}
  {...props}
>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.Cloth_Backdrop.geometry}
      material={gltf.materials['Cloth Backdrop']}
      position={[-0.15, -0.84, -0.17]}
      scale={3.5}
    />
    <T.Mesh
      geometry={gltf.nodes.Dragon.geometry}
      material={gltf.materials['Dragon with Attenuation']}
      position={[0, -0.73, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.25}
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
