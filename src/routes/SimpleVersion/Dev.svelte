<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import devItems from '$lib/db/dev-items.json';

	const images = getContext('images');
</script>

<h1 class="content-title">Projects</h1>
{#each devItems as project}
	<div class="dev-block">
		<div class="block-text">
			<div class="block-top">
				<div class="flexbox block-title">
					<h2 class="block-name">{project.name}</h2>
					<h4 class="block-date"><i>{project.year}</i></h4>
				</div>
				<div class="block-ingredients">
					{#each project.tech as tech}
						<span class="flexbox">
							<img
								class="tech-svg"
								src={images[`dev/${tech.toLowerCase()}.svg`]}
								alt="{tech} logo"
							/>
							{tech}
						</span>
					{/each}
				</div>
			</div>
			<h3 class="block-desc">{project.desc}</h3>
		</div>
		<div class="block-pic flexbox">
			<img src={images[`dev/${project.image}.png`]} alt={project.imageAlt} />
			<div class="flexbox">
				<a class="visit-link click-button" href={project.repo} target="_blank">Visit Repo</a>
				{#if project.site}
					<a class="visit-link click-button" href={project.site} target="_blank">Visit Site</a>
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

		.block-desc {
			padding-top: 16px;
			font-weight: 400;
		}
	}

	.block-ingredients {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: fit-content;
		margin-top: 6px;

		.tech-svg {
			height: 24px;
			width: 24px;
			margin-right: 8px;
		}

		span {
			margin-right: 8px;
			background-color: rgba(0, 0, 0, 0.3);
			color: #e19898;
			font-weight: 700;
			padding: 4px 10px;
			border-radius: calc(var(--border-radius) / 2);
		}
	}

	.block-text {
		width: 50%;
		padding: 0.1rem 0 0 0;
		margin-bottom: 6px;

		.block-title {
			justify-content: space-between;

			.block-date {
				color: rgba(255, 255, 255, 0.5);
			}
		}

		.block-top {
			border-bottom: 2px solid var(--text-main);
			padding-bottom: 12px;
			justify-content: space-between;
			align-items: flex-start;
			width: 100%;
		}
	}

	.block-pic {
		height: 100%;
		width: 45%;
		aspect-ratio: 1.27;
		flex-direction: column;
		justify-content: flex-start;
		gap: 16px;

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
			gap: 32px;

			.visit-link {
				background-color: #e19898;
				color: #1c0e1a;
				transition: all 0.3s ease;

				&:hover {
					background-color: #1c0e1a;
					color: #e19898;
				}
			}
		}
	}
</style>
