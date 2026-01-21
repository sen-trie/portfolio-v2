<script>
	let { img, key, openDialog } = $props();
</script>

<button class="art-grid-div art-grid-item art-video" onclick={(e) => openDialog(e, key)}>
	<img src={img} alt="Video thumbnail" />
	<svg
		class="icon icon-tabler icon-tabler-hand-click"
		width="56"
		height="56"
		viewBox="0 0 24 24"
		stroke-width="1"
		stroke="#eed695"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
		<path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
		<path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
		<path
			d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
		/>
		<path d="M5 3l-1 -1" />
		<path d="M4 7h-1" />
		<path d="M14 3l1 -1" />
		<path d="M15 6h1" />
	</svg>
</button>

<style lang="scss">
	.art-grid-div {
		position: relative;
		display: block;
		overflow: hidden;
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}

		svg {
			position: absolute;
			transform-origin: bottom right;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 8px;
			border: 2px solid hsla(44, 72%, 76%, 0.7);
			background-color: hsla(0, 0%, 0%, 0.8);
			border-radius: var(--border-radius);
			pointer-events: none;
		}
	}
</style>
