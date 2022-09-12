<script lang="ts">
  import { nav } from '../routes/guide/pages';
  import TreeView from './TreeView.svelte';

  export let selected: string;
  export let visible = false;
</script>

<aside class:visible>
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
  .visible {
    display: block;
    height: 100vh;
  }
</style>
