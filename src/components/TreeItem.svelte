<script lang="ts">
  import type { Nav } from '../routes/guide/pages';
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

  function onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') open = !open;
  }
</script>

<li>
  {#if 'href' in item}
    <a
      href={item.href}
      class="item"
      class:selected={selected === item.title}
      style:padding-left="8px"
    >
      <span>{item.title}</span>
    </a>
  {:else}
    <div
      class="item"
      role="link"
      tabindex="0"
      on:click={() => (open = !open)}
      on:keypress={onKeyPress}
    >
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
    font-size: 14px;
  }
  .item {
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 6px 0;
    color: #454545;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
  .selected {
    color: #0000d0;
    background-color: #eee;
  }
  .down {
    transform: rotate(90deg);
  }
</style>
