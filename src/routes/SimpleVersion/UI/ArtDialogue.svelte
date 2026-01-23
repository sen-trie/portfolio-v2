<script>
	let {
		key,
		content = {},
		closeDialog,
		isLoading,
		handleLoad,
		cycleKeys,
		videoInfoEl = $bindable()
	} = $props();

	let dialogWrapper;
</script>

{#snippet closeButton()}
	<button class="close-btn" onclick={closeDialog} aria-label="close-dialog" bind:this={videoInfoEl}>
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
{/snippet}

<div class="close-button-wrapper">
	{@render closeButton()}
</div>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	class="dialog-wrapper flexbox"
	bind:this={dialogWrapper}
	onclick={(e) => e.target === dialogWrapper && closeDialog()}
>
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

		{@render closeButton()}
	</div>
</div>

<div class="dialog-next flexbox">
	<button onclick={() => cycleKeys(false)} class="click-button">Previous</button>
	<button onclick={() => cycleKeys(true)} class="click-button">Next</button>
</div>

<style lang="scss">
	.dialog-wrapper {
		flex-grow: 1;
		overflow: hidden;
		padding: 32px 16px;
		max-height: max(1000px, calc(100dvh - 24rem));
	}

	.close-button-wrapper {
		display: none;
	}

	.close-btn {
		position: absolute;
		z-index: 99;
		right: -16px;
		top: -16px;
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
		font-size: 20px;
		gap: 64px;
		pointer-events: none;

		button {
			background-color: color-mix(in oklab, #054830 100%, hsl(0, 0%, 100%) 10%);
			color: white;
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
		margin: 0 auto;
		width: min(100%, 1200px);
		min-height: 50dvh;
		max-height: 100%;
		justify-content: space-between;
		background-color: color-mix(in oklab, #054830 20%, hsl(0, 0%, 5%) 100%);
		border-radius: var(--border-radius) 0 0 var(--border-radius);

		.video-container {
			position: relative;
			width: 60%;
			height: auto;
			overflow: hidden;

			iframe {
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
			color: white;
			width: 40%;
			text-align: left;
			padding: 20px 28px;
			max-height: 100%;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;

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

	@media (max-width: 768px) {
		.dialog-content {
			flex-direction: column;
			width: 100%;
			max-height: calc(100dvh - 0px);
			justify-content: flex-start;

			.video-container,
			.video-info {
				width: 100%;
			}

			.video-container,
			iframe {
				min-height: 30dvh;
			}

			.video-info {
				height: fit-content;
				max-height: 50dvh;
				padding: 16px 20px;
			}

			.close-btn {
				display: none;
			}
		}

		.dialog-next {
			gap: 24px;
			font-size: 12px;
			margin-top: 0;
		}

		.close-button-wrapper {
			display: block;

			.close-btn {
				right: 0;
				top: 16px;
			}
		}
	}
</style>
