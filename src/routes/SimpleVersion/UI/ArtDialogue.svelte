<script>
	let { key, content = {}, closeDialog, isLoading, handleLoad, cycleKeys } = $props();
</script>

<button class="close-btn" onclick={closeDialog} aria-label="close-dialog">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M18 6l-12 12" />
		<path d="M6 6l12 12" />
	</svg>
</button>

<div class="dialog-content">
	{#key key}
		<div class="video-container">
			{#if isLoading}
				<div class="iframe-loader">Loading...</div>
			{/if}

			<iframe
				src={content['url']}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				onload={handleLoad}
			></iframe>
		</div>
	{/key}

	<div class="video-info">
		<h2>{content['title']}</h2>
		<h4><i>{content['date']}</i></h4>
		<h3>{@html content['desc']}</h3>
	</div>
</div>

<div class="dialog-next flexbox">
	<button onclick={() => cycleKeys(false)} class="click-button">Previous</button>
	<button onclick={() => cycleKeys(true)} class="click-button">Next</button>
</div>

<style lang="scss">
	.close-btn {
		position: absolute;
		z-index: 99;
		right: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.7);
		border: 2px solid hsla(0, 0%, 100%, 0.5);
		border-radius: var(--border-radius);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.dialog-next {
		margin-top: 32px;
		justify-content: center;
		gap: 32px;
		pointer-events: none;

		button {
			background-color: color-mix(in oklab, #054830 100%, hsl(0, 0%, 100%) 10%);
			color: white;
			font-size: 20px;
			padding: 12px 40px;
			pointer-events: all;

			&:hover {
				color: color-mix(in oklab, #054830 100%, hsl(0, 0%, 100%) 10%);
				background-color: white;
			}
		}
	}

	.dialog-content {
		position: relative;
		display: flex;
		width: 1200px;
		max-height: calc(100dvh - 24rem);
		justify-content: space-between;
		background-color: color-mix(in oklab, #054830 20%, hsl(0, 0%, 5%) 100%);
		border-radius: var(--border-radius) 0 0 var(--border-radius);
		overflow: hidden;

		.video-container {
			position: relative;
			width: 60%;
			height: auto;
			padding-bottom: 50%;
			overflow: hidden;

			iframe {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: none;
			}

			.iframe-loader {
				position: absolute;
				inset: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: rgba(0, 0, 0, 0.7);
				z-index: 1;
			}
		}

		.video-info {
			width: 40%;
			text-align: left;
			padding: 20px 28px;
			max-height: 100%;
			overflow-y: auto;

			h4 {
				margin: 6px 0 20px;
				padding-bottom: 12px;
				border-bottom: 2px solid white;
				color: rgba(255, 255, 255, 0.5);
			}

			h3 {
				font-weight: 400;
			}
		}
	}
</style>
