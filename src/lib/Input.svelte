<script lang="ts">
	import { saveMandalaArt } from "../stores/name";

	let {
		value = $bindable(),
		sub = false,
	}: {
		value?: string;
		sub?: boolean;
	} = $props();

	function handleBlur() {
		saveMandalaArt();
	}
</script>

<div
	contenteditable="true"
	class={`h-10 w-10 text-center text-[8px] md:h-20 md:w-20 md:text-base
	${sub ? "bg-yellow-300 text-white dark:bg-mauve-900" : null}`}
	onblur={handleBlur}
	bind:textContent={value}
></div>
