<script>
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import About from './SimpleVersion/About.svelte';
	import Dev from './SimpleVersion/Dev.svelte';
	import Art from './SimpleVersion/Art.svelte';

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

		return () => {
			observer.disconnect();
		};
	});

	function handleClick(side) {
		clicked = true;
		selectedSide = side;
		greenSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

{#snippet switchSideButton()}
	<button
		class="switch-side-button flexbox"
		onclick={() => handleClick(selectedSide === 'left' ? 'right' : 'left')}
	>
		Switch Side
	</button>
{/snippet}

<div>
	<section class="about">
		<About />
	</section>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<section class="main flexbox" class:clicked bind:this={greenSection}>
		{#if greenVisible}
			<div
				class="main-dev"
				class:expanded={selectedSide === 'left'}
				class:collapsed={selectedSide === 'right'}
				in:fly|global={{ x: -window.innerWidth, duration: 600 }}
				onclick={() => (selectedSide === null ? handleClick('left') : void 0)}
				role="button"
				tabindex="0"
			>
				{#if !clicked}
					<div class="cover-all flexbox" transition:fade={{ delay: 200, duration: 300 }}>
						Explore Dev Work
					</div>
				{/if}
				{@render switchSideButton()}
				<div class="content-wrapper">
					<Dev />
				</div>
			</div>
			<div
				class="main-art"
				class:expanded={selectedSide === 'right'}
				class:collapsed={selectedSide === 'left'}
				in:fly|global={{ x: window.innerWidth, duration: 600 }}
				onclick={() => (selectedSide === null ? handleClick('right') : void 0)}
				role="button"
				tabindex="0"
			>
				{#if !clicked}
					<div class="cover-all flexbox" transition:fade={{ delay: 200, duration: 300 }}>
						Explore Art Work
					</div>
				{/if}
				{@render switchSideButton()}
				<div class="content-wrapper">
					<Art />
				</div>
			</div>
		{/if}
	</section>
</div>

<style lang="scss">
	.about {
		div {
			height: 100px;
			width: 300px;
		}
	}

	section {
		background-color: #f5f0e8;
		color: #000;

		&.about {
			height: 100dvh;
		}

		&.main {
			min-height: 100dvh;
			transition: height 0.6s ease;
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

		.content-wrapper {
			width: 1000px;
			margin: 0 auto;
		}

		.cover-all {
			text-align: center;
			position: absolute;
			height: 100dvh;
			width: 100%;
			z-index: 10;
			background-color: hsl(37, 39%, 80%);
			color: hsla(307, 27%, 24%, 1);
			inset: 0;
		}

		.main-dev {
			background-color: hsla(307, 27%, 24%, 1);
			left: 0;
			clip-path: inset(0 50% 0 0);

			&.expanded {
				background-color: hsl(307, 27%, 24%);
				height: fit-content;
				clip-path: inset(0 0 0 0);
			}

			&.collapsed {
				background-color: hsl(307, 27%, 24%);
				clip-path: inset(0 100% 0 0);
			}
		}

		.main-art {
			background-color: hsl(159, 87%, 15%, 1);
			right: 0;
			clip-path: inset(0 0 0 50%);

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
				flex-direction: row-reverse;
			}
		}
	}
</style>
