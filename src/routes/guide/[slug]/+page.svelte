<script lang="ts">
  import { browser } from '$app/environment';
  import { afterUpdate, SvelteComponentTyped } from 'svelte';
  import Header from '../../../components/Header.svelte';
  import Navigation from '../../../components/Navigation.svelte';
  import Sidebar from '../../../components/Sidebar.svelte';
  import AgGrid from '../../../icons/AgGrid.svelte';
  import { scrollToHash } from '../../../util';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ title, component } = data);

  let headings: string[] = [];
  let section: HTMLElement;
  afterUpdate(() => {
    headings = [];
    for (const h2 of section.querySelectorAll('h2')) {
      const text = h2.textContent?.trim();
      if (text) {
        headings.push(text);
        h2.id = text;
      }
    }

    scrollToHash();
  });

  let instance: SvelteComponentTyped;
  $: agGridLink = instance?.aggrid;
</script>

<Header selected={title} />
<main class="main">
  <Sidebar selected={title} />
  <div class="inner">
    <h1>
      Svelte AG Grid - {title}
      {#if agGridLink}<a href={agGridLink} rel="noreferrer"><AgGrid /></a>{/if}
    </h1>
    <section bind:this={section}>
      {#if browser}
        <!-- Dynamic import breaks in SSR; render only in browser -->
        <svelte:component this={component} bind:this={instance} />
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
    padding: 0 1rem 1rem 1rem;
  }
</style>
