<script lang="ts">
  import type { Nav } from 'src/routes/guide/pages';
  import Chevron from '../icons/Chevron.svelte';
  import { slide } from './collapsible';
  import TreeView from './TreeView.svelte';

  export let selected: string;
  export let item: Nav;
  export let onOpen: () => void;

  $: if (item.title === selected) onOpen();

  let open = false;
  function itemOnOpen() {
    open = true;
    onOpen();
  }
</script>

<li>
  {#if 'href' in item}
    <a href={item.href} class="item" style:padding-left="8px">
      <span class:selected={selected === item.title}>{item.title}</span>
    </a>
  {:else}
    <div class="item" on:click={() => (open = !open)}>
      <span style:transition="transform 0.2s linear" class:down={open}><Chevron /></span>
      {item.title}
    </div>
    <div style:margin-left="24px" use:slide={{ open }}>
      <TreeView nav={item.pages} {selected} onOpen={itemOnOpen} />
    </div>
  {/if}
</li>

<style lang="scss">
  li {
    list-style: none;
    font-weight: bold;
  }
  .item {
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 4px 0;
    color: #454545;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
  .selected {
    color: #0000d0;
  }
  .down {
    transform: rotate(90deg);
  }
</style>
