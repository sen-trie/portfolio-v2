<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	const images = getContext('images');

	const devItems = [
		{
			name: 'Basil Club - Recipe Site',
			desc: 'A personal recipe collection. Adapted recipes from well-known sources, organized for easy reference while baking.',
			tech: ['Svelte', 'JavaScript'],
			repo: 'https://github.com/sen-trie/basil-main',
			site: 'https://www.basilclub.cafe/',
			image: 'proj7',
			imageAlt: 'Basil Club Recipe Project'
		},
		{
			name: 'Basil Club - 3D Webapp',
			desc: 'An interactive 3D café. Contains multiple interactables and references, inspired by personal experiences.',
			tech: ['Threlte', 'Three'],
			repo: 'https://github.com/sen-trie/basil-club',
			site: 'https://explore.basilclub.cafe/',
			image: 'proj6',
			imageAlt: 'Basil Club 3D Project'
		},
		{
			name: 'BrushHub',
			desc: 'A frontend showcase aimed at demonstrating the concept and user experience of an artwork commissioning platform.',
			tech: ['Svelte', 'Tailwind', 'TypeScript'],
			repo: 'https://github.com/sen-trie/brushhub',
			site: 'https://sen-trie.github.io/brushhub/',
			image: 'proj5',
			imageAlt: 'BrushHub Project'
		},
		{
			name: 'nahidaQuest!',
			desc: 'An incremental game based on the popular hit Genshin Impact, built entirely from scratch. Playable on modern desktop and mobile browsers.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			repo: 'https://github.com/sen-trie/nahidaQuest',
			site: 'https://nahidaquest.com/',
			image: 'proj1',
			imageAlt: 'nahidaQuest Project'
		},
		{
			name: '2D Heat Diffusion',
			desc: 'Simulates heat transfer by conduction through a two dimensional plate. Computationally solves the heat partial differential equation and visualizes the solution as a heatmap.',
			tech: ['MATLAB'],
			repo: 'https://github.com/sen-trie/2d-heat-diffusion',
			site: null,
			image: 'proj2',
			imageAlt: 'Matlab Project'
		},
		{
			name: 'The Lair',
			desc: 'A fictional online storefront set in a world populated by vampires.',
			tech: ['React', 'JavaScript'],
			repo: 'https://github.com/sen-trie/shopping-cart',
			site: 'https://sen-trie.github.io/shopping-cart/',
			image: 'proj3',
			imageAlt: 'Storefront Project'
		}
	];
</script>

<h1 class="content-title">Projects</h1>
{#each devItems as project}
	<div class="dev-block">
		<div class="block-text">
			<h2 class="block-name">{project.name}</h2>
			<div class="block-ingredients">
				{#each project.tech as tech}
					<span class="flexbox">
						<img class="tech-svg" src={images[`dev/${tech.toLowerCase()}.svg`]} alt="{tech} logo" />
						{tech}
					</span>
				{/each}
			</div>
			<h3 class="block-desc">{project.desc}</h3>
		</div>
		<div class="block-pic flexbox">
			<img src={images[`dev/${project.image}.png`]} alt={project.imageAlt} />
			<div class="flexbox">
				<a class="visit-link" href={project.repo} target="_blank">Visit Repo</a>
				{#if project.site}
					<a class="visit-link" href={project.site} target="_blank">Visit Site</a>
				{/if}
			</div>
		</div>
	</div>
{/each}

<style lang="scss">
	.content-title {
		padding-bottom: 16px;
		border-bottom: 2px solid white;
	}

	.dev-block {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 32px 0;
		min-height: 350px;
		padding: 16px 24px;
		overflow: hidden;
		background-color: hsla(0, 0%, 18%, 0.74);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--border-radius);

		h3 {
			padding-top: 8px;
		}
	}

	.block-ingredients {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: fit-content;
		border-bottom: 2px solid var(--text-main);
		padding-bottom: 12px;
		margin: 6px 0 8px;

		.tech-svg {
			height: 24px;
			width: 24px;
			margin-right: 8px;
		}

		span {
			margin-right: 8px;
			background-color: #e19898;
			color: #1c0e1a;
			font-weight: 700;
			padding: 4px 10px;
			border-radius: calc(var(--border-radius) / 2);
		}
	}

	.block-text {
		width: 50%;
		padding: 0.1rem 0 0 0;
	}

	.block-pic {
		height: 100%;
		width: 45%;
		aspect-ratio: 1.27;
		flex-direction: column;
		justify-content: flex-start;

		img {
			height: auto;
			width: 100%;
			aspect-ratio: 16 / 10;
			object-fit: cover;
			filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.7));
		}

		div {
			height: fit-content;
			flex-grow: 1;
			gap: 20px;

			.visit-link {
				background-color: rgba(0, 0, 0, 0.3);
				padding: 10px 24px;
				margin-top: 16px;
				border: none;
				border-radius: var(--border-radius);
				transition: all 0.3s ease;
			}
		}
	}
</style>
