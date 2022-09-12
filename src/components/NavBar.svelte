<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import Sidebar from './Sidebar.svelte';

  export let selected: string;
  export let open: boolean;

  $: if (browser) document.body.style.overflow = open ? 'hidden' : 'visible';

  afterNavigate(() => {
    // Close nav bar when a link is clicked
    open = false;
  });
</script>

{#if open}
  <div class="backdrop" on:click={() => (open = false)} transition:fade={{ duration: 150 }} />
  <div class="nav-bar" transition:fly={{ x: -200, duration: 200 }}>
    <a href="/"><b>Svelte AG Grid</b></a>
    <Sidebar visible {selected} />
  </div>
{/if}

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') open = false;
  }}
/>

<style>
  b {
    font-size: x-large;
  }
  .backdrop {
    position: fixed;
    inset: 0;
    background-color: black;
    opacity: 50%;
    z-index: 10;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    background-color: white;
    z-index: 10;
    padding: 1rem 1rem 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
