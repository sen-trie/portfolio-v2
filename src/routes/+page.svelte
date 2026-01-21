<script>
	import { getContext } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import About from './SimpleVersion/About.svelte';
	import Dev from './SimpleVersion/Dev.svelte';
	import Art from './SimpleVersion/Art.svelte';

	const images = getContext('images');

	let greenVisible = $state(false);
	let greenSection = $state(null);
	let clicked = $state(false);
	let selectedSide = $state(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !greenVisible) {
						greenVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (greenSection) {
			observer.observe(greenSection);
		}

		const hash = window.location.hash.slice(1);
		if (hash === 'dev' || hash === 'art') {
			handleClick(hash === 'dev' ? 'left' : 'right');
		}

		const handleHashChange = () => {
			const newHash = window.location.hash.slice(1);
			if (newHash === 'dev') {
				handleClick('left');
			} else if (newHash === 'art') {
				handleClick('right');
			}
		};

		window.addEventListener('hashchange', handleHashChange);

		return () => {
			observer.disconnect();
			window.removeEventListener('hashchange', handleHashChange);
		};
	});

	function handleClick(side) {
		const instantScroll = clicked;

		clicked = true;
		selectedSide = side;

		const hash = side === 'left' ? '#dev' : '#art';
		if (window.location.hash !== hash) {
			replaceState(window.location.pathname + hash);
		}

		greenSection?.scrollIntoView({
			behavior: instantScroll ? 'instant' : 'smooth',
			block: 'start'
		});
	}
</script>

{#snippet switchSideButton()}
	<button
		class="switch-side-button flexbox"
		class:show-side={clicked}
		class:flipped={selectedSide === 'right'}
		onclick={() => handleClick(selectedSide === 'left' ? 'right' : 'left')}
	>
		<div class="button-inner">
			<div class="button-front flexbox" data-side={selectedSide}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
					/>
				</svg>
				<p>Dev</p>
			</div>
			<div class="button-back flexbox" data-side={selectedSide}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
					/>
				</svg>
				<p>Art</p>
			</div>
		</div>
	</button>
{/snippet}

<div>
	<section class="about notebook-div">
		<About />
	</section>
	{@render switchSideButton()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<section
		class="main notebook-div flexbox"
		class:clicked
		style:background-color={selectedSide ? '#054830' : '#f5f0e8'}
		bind:this={greenSection}
	>
		{#if greenVisible}
			<div
				class="main-dev notebook-div"
				class:expanded={selectedSide === 'left'}
				class:collapsed={selectedSide === 'right'}
				in:fly|global={{ x: -window.innerWidth, duration: 600 }}
				onclick={() => (selectedSide === null ? handleClick('left') : void 0)}
				role="button"
				tabindex="0"
			>
				{#if !clicked}
					<div
						class="cover-all notebook-div flexbox"
						transition:fade={{ delay: 200, duration: 300 }}
					>
						<div class="cover-wrapper flexbox">
							<p>Explore Dev Work</p>
							<img src={images['dev_pp.png']} alt="dev profile" />
						</div>
					</div>
				{/if}
				<div class="content-block">
					<Dev />
				</div>
				<div class="content-footer">
					<button class="click-button" onclick={() => handleClick('right')}
						>Switch to art side</button
					>
				</div>
			</div>
			<div
				class="main-art notebook-div"
				class:expanded={selectedSide === 'right'}
				class:collapsed={selectedSide === 'left'}
				in:fly|global={{ x: window.innerWidth, duration: 600 }}
				onclick={() => (selectedSide === null ? handleClick('right') : void 0)}
				role="button"
				tabindex="0"
			>
				{#if !clicked}
					<div
						class="cover-all notebook-div flexbox"
						transition:fade={{ delay: 200, duration: 300 }}
					>
						<div class="cover-wrapper flexbox">
							<p>Explore Art Work</p>
							<img src={images['art_pp.png']} alt="art profile" />
						</div>
					</div>
				{/if}
				<div class="content-block">
					<Art />
				</div>
				<div class="content-footer">
					<button class="click-button" onclick={() => handleClick('left')}
						>Switch to dev side</button
					>
				</div>
			</div>
		{/if}
	</section>
</div>

<style lang="scss">
	.about {
		position: relative;
		padding-bottom: 48px;

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			width: 100dvw;
			height: 10px;
			z-index: 10;

			background: repeating-linear-gradient(90deg, transparent 0 8px, rgba(0, 0, 0, 0.3) 8px 10px);
			mask: linear-gradient(to bottom, #000 0 60%, transparent 100%);
		}
	}

	section {
		background-color: #f5f0e8;
		background-image: linear-gradient(
			to bottom,
			transparent 31px,
			#d4d4d4 31px,
			#d4d4d4 32px,
			transparent 32px
		);
		color: #000;

		&.about {
			height: 100dvh;
		}

		&.main {
			min-height: 100dvh;
			transition: height 0.6s ease;
		}
	}

	$button-size: 48px;

	.switch-side-button {
		position: sticky;
		z-index: 10;
		width: fit-content;
		height: $button-size;
		top: 0px;
		transform: translateY(28px);
		margin-left: auto;
		margin-right: 56px;
		margin-bottom: calc(-1 * $button-size);
		opacity: 0;
		transition: opacity 1s ease;
		perspective: 1000px;
		padding: 0;
		background: transparent;
		border: none;
		overflow: visible;

		svg {
			width: 24px;
			aspect-ratio: 1;
		}

		&.show-side {
			opacity: 1;
		}

		.button-inner {
			position: relative;
			right: 88px;
			height: 100%;
			transition: transform 0.6s;
			transform-style: preserve-3d;
		}

		&.flipped .button-inner {
			transform: rotateX(180deg);
		}

		.button-front,
		.button-back {
			position: absolute;
			height: 100%;
			backface-visibility: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12px;
			padding: 0 24px;
			background-color: rgba(0, 0, 0, 0.7);
			border-radius: var(--border-radius);
			font-weight: 700;
			font-size: 16px;
			color: white;
			transition:
				background-color 0.3s ease,
				color 0.3s ease;

			&[data-side='left'] {
				&:hover {
					background-color: color-mix(in oklab, #4e2d4a 50%, #ffffff 100%);
					color: black;
				}
			}

			&[data-side='right'] {
				&:hover {
					background-color: color-mix(in oklab, #054830 50%, #ffffff 100%);
					color: black;
				}
			}
		}

		.button-back {
			transform: rotateX(180deg);
		}
	}

	.main {
		position: relative;
		color: white;
		overflow: hidden;

		> div {
			position: absolute;
			top: 0;
			height: 100dvh;
			width: 100%;
			overflow: visible;
			cursor: pointer;
			transition:
				height 0.6s ease,
				clip-path 0.6s ease,
				background-color 0.6s ease;

			&.expanded {
				position: relative;
				cursor: auto;
			}

			&.collapsed {
				pointer-events: none;
			}
		}

		.cover-all {
			position: absolute;
			height: 100dvh;
			width: 100%;
			z-index: 10;
			background-color: #b2a2a9;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;

			background-image: linear-gradient(
				to bottom,
				transparent 31px,
				#d4d4d4 31px,
				#d4d4d4 32px,
				transparent 32px
			);
			inset: 0;

			.cover-wrapper {
				width: 50dvw;
				flex-direction: column;
				transition: transform 0.3s ease;
				filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.2));
			}

			&:hover > .cover-wrapper {
				transform: scale(1.05);
			}

			p {
				text-align: center;
				width: fit-content;
				font-weight: 700;
				font-size: 20px;
				background-color: #4e2d4a;
				color: #cbbfc1;
				padding: 8px 16px;
				border-radius: var(--border-radius);
			}

			img {
				margin-top: 8px;
				width: 128px;
				height: 128px;
			}
		}

		.main-dev {
			background-color: hsla(307, 27%, 24%, 1);
			left: 0;
			clip-path: inset(0 50% 0 0);

			background-image: linear-gradient(
				to bottom,
				transparent 31px,
				#5e3458 31px,
				#5e3458 32px,
				transparent 32px
			);

			&.expanded {
				background-color: #4e2d4a;
				height: fit-content;
				clip-path: inset(0 0 0 0);
			}

			&.collapsed {
				background-color: hsl(307, 27%, 24%);
				clip-path: inset(0 100% 0 0);
			}
		}

		.main-art {
			background-color: #054830;
			right: 0;
			clip-path: inset(0 0 0 50%);

			background-image: linear-gradient(
				to bottom,
				transparent 31px,
				rgba(9, 92, 63, 0.7) 31px,
				rgba(9, 92, 63, 0.7) 32px,
				transparent 32px
			);

			&.expanded {
				background-color: hsl(159, 87%, 15%);
				height: fit-content;
				clip-path: inset(0 0 0 0);
			}

			&.collapsed {
				background-color: hsl(159, 87%, 15%);
				clip-path: inset(0 0 0 100%);
			}

			.cover-all {
				align-items: flex-end;
				background-color: #95ad9e;

				p {
					background-color: #054830;
					color: #b9c6ba;
				}
			}
		}

		.content-footer {
			position: relative;
			z-index: 5;
			background-color: rgba(0, 0, 0, 0.5);
			width: 100%;
			padding: 32px 0;
			margin-top: 56px;

			button {
				margin: auto;
				background-color: #e19898;
				color: #1c0e1a;
				font-size: 20px;
				font-weight: 700;
				padding: 12px 40px;
				border-radius: var(--border-radius);

				&:hover {
					background-color: #1c0e1a;
					color: #e19898;
				}
			}
		}

		.main-art {
			.content-footer button {
				background-color: #eed695;
				color: #1d413c;

				&:hover {
					background-color: #1d413c;
					color: #eed695;
				}
			}
		}
	}

	@media (max-width: 768px) {
		.main .content-footer {
			padding: 24px 0;

			button {
				font-size: 18px;
			}
		}

		.main .cover-all p {
			font-size: 16px;
		}

		.switch-side-button {
			margin-right: 20px;
			height: 40px;
			margin-bottom: -40px;

			svg {
				width: 20px;
			}

			.button-front,
			.button-back {
				font-size: 14px;
				padding: 0 20px;
			}

			.button-inner {
				bottom: 12px;
			}
		}
	}
</style>
