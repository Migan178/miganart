<script lang="ts">
	import mandalaArtName from "../stores/name";
	import { subNames } from "../stores/name";
	import Input from "./Input.svelte";
</script>

<div>
	<div class="flex">
		{#each { length: 3 }, i}
			<Input bind:value={$subNames[i]} sub />
		{/each}
	</div>
	<div class="flex">
		<Input bind:value={$subNames[3]} sub />
		<Input bind:value={$mandalaArtName} />
		<Input bind:value={$subNames[4]} sub />
	</div>
	<div class="flex">
		{#each { length: 3 }, i}
			<Input bind:value={$subNames[i + 5]} sub />
		{/each}
	</div>
</div>
