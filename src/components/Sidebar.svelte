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
    height: calc(100vh - var(--header-height));
    padding-left: 1rem;
    overflow: auto;
    position: sticky;
    top: var(--header-height);
  }
  @media (max-width: 1000px) {
    aside {
      display: none;
    }
  }
</style>
