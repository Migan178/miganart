<script lang="ts">
	import MDA from "./lib/MDA.svelte";
	import mandalartName, { loadMandalArt, saveMandalart } from "./stores/name";
	import { domToPng } from "modern-screenshot";
	import { onMount } from "svelte";

	let captureArea: any | null;

	async function handleSave() {
		if (!captureArea) {
			return;
		}

		const downloadElement = document.createElement("a");
		downloadElement.href = await domToPng(captureArea, {
			scale: 2,
		});
		downloadElement.download = "mandalart.png";
		downloadElement.click();
	}

	function handleBlur() {
		saveMandalart();
	}

	async function handleShare() {
		navigator.clipboard.writeText(window.location.href);
	}

	onMount(() => {
		loadMandalArt();
	});
</script>

<main
	class="flex h-screen w-screen flex-col gap-y-10 md:flex-row md:items-center md:justify-center md:gap-x-10 md:gap-y-0"
>
	<MDA bind:area={captureArea} />
	<div>
		<h1 class="mb-2 text-3xl font-semibold text-black dark:text-zinc-200">
			<a href="https://miganbox.com">미간</a>라트
		</h1>
		<div>
			<div class="mb-2">
				<label for="name" class="dark:text-zinc-300">이름</label>
				<input
					id="name"
					type="text"
					class="rounded-4xl px-4 py-2"
					bind:value={$mandalartName}
					onblur={handleBlur}
				/>
			</div>
			<div
				class="flex flex-col gap-y-1 md:flex-row md:gap-x-1 md:gap-y-0"
			>
				<button onclick={handleSave} class="btn">
					이미지 파일로 저장하기
				</button>
				<button onclick={handleShare} class="btn">
					클립보드에 링크 복사
				</button>
			</div>
		</div>
	</div>
</main>
