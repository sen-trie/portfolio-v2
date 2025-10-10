<script>
	import { T } from '@threlte/core';

	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<Canvas>
	<Scene />
	<T.Color attach="background" args={['black']} />
</Canvas>
