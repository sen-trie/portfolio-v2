<script>
	import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
	import { onMount } from 'svelte';

	let { img, dim, url } = $props();
	let dialogEl = $state(null);

	function preventScroll(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	function openDialog(e) {
		e.preventDefault();
		if (!dialogEl) return;

		dialogEl.showModal();
		disableBodyScroll(document.body, { reserveScrollBarGap: true });
	}

	function closeDialog() {
		if (!dialogEl) return;

		dialogEl.close();
		enableBodyScroll(document.body);
	}

	onMount(() => {
		return closeDialog;
	});
</script>

<button
	class="art-grid-div art-grid-item art-video"
	onclick={openDialog}
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

<dialog bind:this={dialogEl} onclick={(e) => e.target === dialogEl && closeDialog()}>
	<div class="dialog-content">
		<button class="close-btn" onclick={closeDialog} aria-label="close-dialog">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
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
		<div class="video-container">
			<iframe
				src={url}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
		<div class="video-info">
			<h2>Rin's Solo Camp</h2>
			<h4>2025/12/10</h4>

			<h3>AAA</h3>
		</div>
	</div>
</dialog>

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

	dialog {
		border: none;
		background: transparent;
		padding: 0;
		margin: auto;
		max-width: 1200px;
		width: 100%;
		max-height: calc(100vh - 4rem);
		overflow: hidden;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.85);
			backdrop-filter: blur(4px);
		}
	}

	.dialog-content {
		position: relative;
		display: flex;
		justify-content: space-between;
		background-color: #1a1a1a;
		border-radius: 1rem;
		overflow: hidden;
	}

	.close-btn {
		position: absolute;
		top: -3rem;
		right: 0;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.video-container {
		position: relative;
		width: 60%;
		height: auto;

		padding-bottom: 56.25%;
		overflow: hidden;

		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: none;
		}
	}

	.video-info {
		flex-grow: 1;
		text-align: left;
	}

	@media (max-width: 992px) {
		.art-grid-div svg {
			width: 48px;
			height: 48px;
		}

		dialog {
			width: calc(100% - 2rem);
			max-height: calc(100vh - 2rem);
		}

		.close-btn {
			top: -2.5rem;
			width: 40px;
			height: 40px;

			svg {
				width: 24px;
				height: 24px;
			}
		}
	}

	@media (max-width: 768px) {
		.art-grid-div svg {
			width: 40px;
			height: 40px;
		}

		.dialog-content {
			padding: 1rem;
		}

		.video-info a {
			font-size: 0.9rem;
			padding: 0.6rem 1.2rem;
		}
	}
</style>
