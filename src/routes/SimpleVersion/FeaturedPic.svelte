<script>
	let { img, dim, url, openDialog } = $props();
</script>

<button
	class="art-grid-div art-grid-item art-video"
	onclick={(e) => openDialog(e, url)}
	style={`aspect-ratio: ${dim[0]} / ${dim[1]};`}
>
	<img src={img} alt="Video thumbnail" />
	<svg
		class="icon icon-tabler icon-tabler-external-link"
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
		<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
		<path d="M11 13l9 -9" />
		<path d="M15 4h5v5" />
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
			border-radius: 100%;
			pointer-events: none;
		}
	}
</style>
