<script lang="ts">
  import type { Nav } from 'src/routes/guide/pages';
  import TreeItem from './TreeItem.svelte';

  export let selected: string;
  export let nav: Nav[];
  export let onOpen = () => {};
</script>

<ul>
  {#each nav as item}
    <TreeItem {item} {selected} {onOpen} />
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    user-select: none;
  }
</style>
