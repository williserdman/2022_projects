<script context="module" lang="ts">
	import "bulma";
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/a2e98ca178.js" crossorigin="anonymous"></script>
</svelte:head>

<html lang="html">
	<section class="hero is-fullheight">
		<div class="hero-head">
			<div class="columns is-mobile is-marginless">
				<div class="column left">
					<figure class="navbar-item image has-text-black center">
						<img
							src="src/routes/screen/images/tesla.svg"
							alt="TESLA"
							style="width: 6.25rem; height: 1rem;"
						/>
					</figure>
				</div>
				<div class="column center desktop">
					<p class="navbar-item">MODEL S</p>
					<p class="navbar-item">MODEL X</p>
					<p class="navbar-item">MODEL 3</p>
					<p class="navbar-item has-text-white">ROADSTER</p>
					<p class="navbar-item">ENERGY</p>
				</div>
				<div class="column right">
					<p class="navbar-item desktop">SHOP</p>
					<p class="navbar-item desktop">SIGN IN</p>
					<figure class="navbar-item image">
						<i class="fa-solid fa-bars" style="width: 1rem; height: 1rem;" />
					</figure>
				</div>
				<div class="hero-body">
					<div class="is-overlay has-text-centered single-spaced" style="top: 82px">
						<h1 class="subtitle has-text-weight-light is-4 has-text-black">Tesla</h1>
						<h2 class="title is-1 has-text-black">Roadster</h2>
					</div>
				</div>
			</div>
		</div>
		<div class="hero-foot center" style="padding: 2rem">
			<div class="grid" style="width: 768px">
				<div id="grid" style="width: 768px;">
					<div id="a" class="center-column">
						<p class="has-text-centered has-text-white">
							​The quickest car in the world, with record-setting<br />
							acceleration, range and performance.
						</p>
					</div>
					<div id="b" class="center-column">
						<p class="title has-text-white has-text-weight-light">
							<i
								class="fas fa-tachometer-alt has-text-grey-light"
								style="width: 0.75em; height: 0.75em;"
							/>
							1.9<span class="is-size-5">s</span>
						</p>
						<p class="subtitle has-text-white is-7">0-60 mph</p>
					</div>
					<div id="c" class="center-column" style="border-left: 1px solid gray;">
						<p class="title has-text-white">
							<span class="is-size-5">+</span>250<span class="is-size-5">mph</span>
						</p>
						<p class="subtitle is-7 has-text-white">Top Speed</p>
					</div>
					<div id="d" class="center-column" style="border-left: 1px solid gray;">
						<p class="title has-text-white">620<span class="is-size-5">mi</span></p>
						<p class="subtitle is-7 has-text-white">Mile Range</p>
					</div>
					<div id="e" class="center-column">
						<a
							class="button is-danger is-inverted is-rounded is-outlined has-text-weight-bold"
							style="width: 100%; border: 0.15em solid white;"
						>
							Reserve Now
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</html>

<style>
	#a {
		grid-area: a;
	}
	#b {
		grid-area: b;
	}
	#c {
		grid-area: c;
	}
	#d {
		grid-area: d;
	}
	#e {
		grid-area: e;
	}
	#grid {
		display: grid;
		grid-template-areas:
			"a a a a"
			"b c d e";

		grid-row-gap: 1rem;
	}

	@media (max-width: 512px) {
		#grid {
			grid-template-areas:
				"a a a"
				"b c d"
				"e e e";
		}
	}
	/*! debug.css | MIT License | zaydek.github.com/debug.css */
	/* *:not(path):not(g) {
		color: hsla(210, 100%, 100%, 0.9) !important;
		background: hsla(210, 100%, 50%, 0.5) !important;
		outline: solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;

		box-shadow: none !important;
	} */
	.hero {
		background: black url(images/hero-1.jpg) center / cover;
	}

	@media (max-width: 1024px) {
		.hero {
			background: url(images/hero-2.jpg) center / cover;
		}
	}
	@media (max-width: 768px) {
		.hero {
			background: url(images/hero-3.jpg) center / cover;
		}
	}
	.center,
	.center-column,
	.top,
	.right,
	.bottom,
	.left {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center-column {
		flex-direction: column;
	}

	.top {
		align-items: flex-start;
	}
	.right {
		justify-content: flex-end;
	}
	.bottom {
		align-items: flex-end;
	}
	.left {
		justify-content: flex-start;
	}

	.single-spaced,
	.single-spaced * {
		line-height: 1;
	}

	@media (max-width: 1024px) {
		.desktop {
			display: none;
		}
	}

	p {
		color: black;
		font-weight: bold;
	}
</style>
