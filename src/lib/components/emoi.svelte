<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0 ./static/emoi.glb --transform --types
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
      Mesh_0: THREE.Mesh
    }
    materials: {
      Material_0: THREE.MeshPhysicalMaterial
    }
  }
  const dracoLoader = useDraco()
  const gltf = useGltf<GLTFResult>('/emoi-transformed.glb', { dracoLoader })
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
      geometry={gltf.nodes.Mesh_0.geometry}
      material={gltf.materials.Material_0}
      position={[0, -0.02, 0]}
      scale={[5,5,5]}
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
