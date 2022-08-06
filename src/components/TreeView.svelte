<script lang="ts" context="module">
  export type Nav = { title: string; pages: Nav[] } | { title: string; href: string };
</script>

<script lang="ts">
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
