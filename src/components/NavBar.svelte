<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import Logo from './Logo.svelte';
  import Sidebar from './Sidebar.svelte';

  export let selected: string;
  export let open: boolean;

  $: if (browser) document.body.style.overflow = open ? 'hidden' : 'visible';

  afterNavigate(() => {
    // Close nav bar when a link is clicked
    open = false;
  });

  let start: HTMLDivElement;
  let end: HTMLDivElement;

  $: if (open) start?.focus();
</script>

{#if open}
  <div
    class="backdrop"
    on:click={() => (open = false)}
    aria-hidden="true"
    transition:fade|global={{ duration: 150 }}
  />
  <div class="nav-bar" transition:fly|global={{ x: -200, duration: 200 }}>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" bind:this={start} />
    <Logo />
    <Sidebar visible {selected} />
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" bind:this={end} />
  </div>
{/if}

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') open = false;
    else if (open && e.key === 'Tab') {
      if (start === document.activeElement && e.shiftKey) {
        end.focus();
      } else if (end === document.activeElement && !e.shiftKey) {
        start.focus();
      }
    }
  }}
/>

<style>
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
