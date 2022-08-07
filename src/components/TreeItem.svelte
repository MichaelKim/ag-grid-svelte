<script lang="ts">
  import type { Nav } from './TreeView.svelte';
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
    <a href={item.href}><p class:selected={selected === item.title}>{item.title}</p></a>
  {:else}
    <p on:click={() => (open = !open)} style:cursor="pointer">{open ? 'v' : '>'} {item.title}</p>
    <div style:display={open ? 'block' : 'none'} style:margin-left="32px">
      <TreeView nav={item.pages} {selected} onOpen={itemOnOpen} />
    </div>
  {/if}
</li>

<style lang="scss">
  li {
    list-style: none;
    font-weight: bold;
  }
  div {
    cursor: pointer;
  }
  p {
    margin: 0;
    color: #454545;
    padding: 4px 0 4px 4px;
    border-radius: 4px;

    &:hover {
      background-color: #eee;
    }
  }
  .selected {
    color: #0000d0;
  }
</style>
