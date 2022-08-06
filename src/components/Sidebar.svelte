<script lang="ts">
  import TreeView, { type Nav } from './TreeView.svelte';

  export let nav: Nav[];
  export let selected: string;
</script>

<aside>
  <TreeView {selected} {nav} />
</aside>

<style>
  aside {
    width: 200px;
    padding-top: 12px;
    overflow: auto;
    font-size: larger;
  }
</style>
