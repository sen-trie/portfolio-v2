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
		console.log(1);
		clicked = true;
		selectedSide = side;
		greenSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

{#snippet switchSideButton()}
	<button onclick={() => handleClick(selectedSide === 'left' ? 'right' : 'left')}>
		Switch Side
	</button>
{/snippet}

<div>
	<section class="about">
		<About />
	</section>
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
				{#if selectedSide === 'left'}
					<div transition:fade={{ delay: 200, duration: 300 }}>
						<Dev {switchSideButton} />
					</div>
				{/if}
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
				{#if selectedSide === 'right'}
					<div transition:fade={{ delay: 200, duration: 300 }}>
						<Art {switchSideButton} />
					</div>
				{/if}
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
			height: 100dvh;
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
				cursor: auto;
			}

			&.collapsed {
				pointer-events: none;
			}
		}

		.main-dev {
			background-color: hsla(307, 27%, 24%, 0.7);
			left: 0;
			clip-path: inset(0 50% 0 0);

			&.expanded {
				background-color: hsl(307, 27%, 24%);
				height: 200dvh;
				clip-path: inset(0 0 0 0);
			}

			&.collapsed {
				clip-path: inset(0 100% 0 0);
			}
		}

		.main-art {
			background-color: hsl(159, 87%, 15%, 0.7);
			right: 0;
			clip-path: inset(0 0 0 50%);

			&.expanded {
				background-color: hsl(159, 87%, 15%);
				height: 200dvh;
				clip-path: inset(0 0 0 0);
			}

			&.collapsed {
				clip-path: inset(0 0 0 100%);
			}
		}
	}
</style>
