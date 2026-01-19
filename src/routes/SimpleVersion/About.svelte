<script>
	import { getContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	// let { greenVisible } = $props();

	const images = getContext('images');

	let scrollY = $state(0);

	const socials = {
		github: 'https://github.com/sen-trie',
		youtube: 'https://www.youtube.com/@sen-trie',
		reddit: 'https://www.reddit.com/u/IAM_Sentry'
	};

	const discordUsername = '.sentrie';
	let showCopied = $state(false);
	let copyTimer = $state(null);

	async function copyText(textCopy) {
		try {
			await navigator.clipboard.writeText(textCopy);
			showCopied = true;
			clearTimeout(copyTimer);

			copyTimer = setTimeout(() => {
				showCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:window bind:scrollY />

<div class="flexbox about-block content-block">
	<div class="flexbox profile-blurb">
		<img src={images['dev_pp.png']} alt="dev profile" />
		<h1>Sentrie's Portfolio</h1>
		<img src={images['art_pp.png']} alt="art profile" />
	</div>
	<div>
		<h2>About</h2>
		<h3>
			I'm a self-taught <strong>frontend web developer</strong> focused on building
			<u>clean, functional interfaces</u>. I enjoy <u>learning through projects</u> and consistently
			push myself to pick up new frameworks, programming languages, and development methods as I
			work.
			<br /><br />
			Alongside my dev work, I'm also a self-taught <strong>3D animator</strong>,
			<u>specializing in character animation</u>. What started with a few tutorials turned into a
			love for
			<u>storytelling through movement</u>. It's a process that has taught me to be patient and to
			focus on the tiny details that make a story feel alive and believable.
			<br /><br />
			Personally, I'm at my best when I can blend creativity with technical precision. Most of my work
			is about taking a creative vision and building the systems needed to make it a reality, keeping
			things simple and reliable along the way.
		</h3>
	</div>
	<div class="social-block">
		<p>Based in Singapore 🇸🇬</p>
		<div class="flexbox social-links">
			{#each Object.entries(socials) as social}
				<a href={social[1]} target="_blank" aria-label="link" rel="noopener noreferrer">
					<img class="social-link" src={images[`${social[0]}.svg`]} alt="{social[0]} logo" />
				</a>
			{/each}
			<button onclick={() => copyText(discordUsername)} aria-label="copy discord username">
				<img class="social-link" src={images[`discord.svg`]} alt="discord logo" />
			</button>
		</div>
		{#if showCopied}
			<div transition:fly={{ duration: 300, y: -10 }} class="copied-notification">
				Copied <i>@{discordUsername}</i> to clipboard!
			</div>
		{/if}
		<div class="flexbox social-links">
			<a
				href="mailto:backupsentrie@gmail.com"
				target="_blank"
				aria-label="link"
				rel="noopener noreferrer"
			>
				<img class="social-link" src={images[`gmail.svg`]} alt="gmail logo" />
			</a>
			<p>backupsentrie@gmail</p>
		</div>
	</div>

	{#if scrollY < 100}
		<div transition:fade={{ duration: 300 }} class="scroll-container">
			<svg
				fill="#000000"
				version="1.1"
				id="Capa_1"
				width="24"
				height="24"
				viewBox="0 0 30.727 30.727"
				xml:space="preserve"
			>
				<g>
					<path
						d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0   l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"
					/>
				</g>
			</svg>
		</div>
	{/if}
</div>

<style lang="scss">
	.profile-blurb {
		height: 80px;
		width: fit-content;
		gap: 32px;
		border: 2px solid rgba(0, 0, 0, 0.7);
		border-radius: var(--border-radius);
		margin-bottom: 16px;

		img {
			height: 100%;
			width: auto;
			aspect-ratio: 1;
			object-fit: contain;
			background-color: #333;
		}
	}

	h2,
	h1 {
		width: 100%;
		text-align: left;
	}

	h2 {
		margin: 24px 0 8px;
	}

	.about-block {
		flex-direction: column;
		justify-content: center;
		height: 100%;

		h3 {
			margin-top: 4px;
			line-height: 32px;
		}
	}

	.social-block {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		margin: 64px 0 16px;
		gap: 8px;
		align-items: center;

		> .social-links:nth-child(2) {
			justify-self: center;
		}

		> .social-links:last-child {
			justify-self: end;
		}
	}

	.social-links {
		position: relative;
		width: fit-content;
		border: 2px solid rgba(0, 0, 0, 0.7);
		border-radius: var(--border-radius);
		gap: 8px;
		padding: 4px;

		a,
		button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background: none;
			border: none;
			padding: 0;
			cursor: pointer;
		}

		.social-link {
			width: 44px;
			height: 44px;
			background-color: wheat;
			padding: 8px;
			border-radius: var(--border-radius);
			display: block;
		}

		p {
			font-size: 14px;
			margin-right: 8px;
			font-weight: 600;
		}
	}

	.copied-notification {
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #333;
		color: white;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 14px;
		white-space: nowrap;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.scroll-container {
		position: absolute;
		bottom: 40px;

		svg {
			animation-name: floating;
			animation-duration: 2s;
			animation-iteration-count: infinite;
			animation-timing-function: ease-in-out;
		}
	}

	@keyframes floating {
		0% {
			transform: translate(0);
		}
		50% {
			transform: translateY(15px);
		}
		100% {
			transform: translate(0);
		}
	}
</style>
