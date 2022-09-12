<script lang="ts">
  import { browser } from '$app/environment';
  import { afterUpdate } from 'svelte';
  import Header from '../../../components/Header.svelte';
  import Navigation from '../../../components/Navigation.svelte';
  import Sidebar from '../../../components/Sidebar.svelte';
  import { scrollToHash } from '../../../util';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ title, component } = data);

  let headings: string[] = [];
  let section: HTMLElement;
  afterUpdate(() => {
    headings = [];
    section.querySelectorAll('h2').forEach((h2) => {
      const text = h2.textContent!;
      headings.push(text);
      h2.id = text;
    });

    scrollToHash();
  });
</script>

<Header selected={title} />
<main class="main">
  <Sidebar selected={title} />
  <div class="inner">
    <h1>Svelte AG Grid - {title}</h1>
    <section bind:this={section}>
      {#if browser}
        <!-- Dynamic import breaks in SSR; render only in browser -->
        <svelte:component this={component} />
      {/if}
    </section>
  </div>
  <Navigation {headings} />
</main>

<svelte:head>
  <title>Svelte AG Grid - {title}</title>
</svelte:head>

<style lang="scss">
  .main {
    display: flex;
    gap: 1rem;
  }
  .inner {
    flex: 1;
    padding: 0 1rem;
  }
</style>
