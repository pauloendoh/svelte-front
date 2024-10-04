<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { popup, storePopup, type PopupSettings } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let text = 'Hello World!';

	let user: User = {
		id: 1,
		name: 'lmao',
		email: ''
	};

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'hover',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
</script>

<div class="container mx-auto flex h-full items-center justify-center">
	<div class="flex flex-col items-center space-y-10 text-center">
		<h2 class="h2">Welcome to Skeleton.</h2>

		<button class="variant-filled btn" use:popup={popupFeatured}>Show Popup</button>
		<div class="card w-72 p-4 shadow-xl" data-popup="popupFeatured">
			<div><p>Demo Content</p></div>
			<div class="bg-surface-100-800-token arrow" />
		</div>

		<!-- / -->
		<div class="flex justify-center space-x-2">
			<a class="variant-filled btn" href="https://skeleton.dev/" target="_blank" rel="noreferrer">
				Launch Documentation
			</a>
		</div>
		<div class="space-y-2">
			<p>Try editing the following:</p>
			<p><code class="code">/src/routes/+layout.svelte</code></p>
			<p><code class="code">/src/routes/+page.svelte</code></p>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply relative flex flex-col;
	}
	figure svg,
	.img-bg {
		@apply h-64 w-64 md:h-80 md:w-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}

  .show-popup-btn{
    font-size: 12px;
  }
</style>
