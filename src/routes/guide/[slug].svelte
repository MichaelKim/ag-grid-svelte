<script lang="ts" context="module">
  const toCamelCase = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');
  const formatSlug = (slug: string) => slug.split('-').map(toCamelCase).join(' ');
  const parseFile = ([path, importer]: [
    string,
    () => Promise<{ default: SvelteComponent }>
  ]): Data => {
    const [, section, filename] = path.split('/');
    const slug = filename.slice(3, -7); // Strip prefix and extension
    return {
      section, // [#]-[section]
      filename, // [#]-[slug].svelte
      slug,
      title: formatSlug(slug),
      importer
    };
  };

  type Data = {
    section: string;
    filename: string;
    slug: string;
    title: string;
    importer: () => Promise<{ default: SvelteComponent }>;
  };

  // Filepath format: ./[#]-[section]/[#]-[slug].svelte
  const files = import.meta.glob<{ default: SvelteComponent }>('./*/*.svelte');
  const filedata = Object.entries(files).map(parseFile);

  // Load page component from slug
  export const load: Load = async ({ params: { slug } }) => {
    const data = filedata.find((data) => data.slug === slug);
    if (data == null) return { status: 404 };

    const component = (await data.importer()).default;
    return { props: { title: data.title, component } };
  };

  // Generate sidebar nav
  const sections = filedata.reduce((acc, data) => {
    acc[data.section] ??= [];
    acc[data.section].push(data);
    return acc;
  }, {} as Record<string, Data[]>);

  // Sort by prefix
  const sectionTitles = Object.keys(sections).sort();
  export const nav: Nav[] = sectionTitles.map((title) => {
    const pages = sections[title].map((data) => ({
      title: data.title,
      href: '/guide/' + data.slug
    }));
    return {
      title: toCamelCase(title.slice(3)), // Strip prefix
      pages
    };
  });
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { afterUpdate, type SvelteComponent } from 'svelte';
  import Navigation from '../../components/Navigation.svelte';
  import Sidebar from '../../components/Sidebar.svelte';
  import type { Nav } from '../../components/TreeView.svelte';
  import { scrollToHash } from '../../util';
  import type { Load } from './__types/[slug]';

  export let title: string;
  export let component: SvelteComponent;

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

<div class="main">
  <Sidebar selected={title} {nav} />
  <div style:flex="1">
    <h1>Svelte AG Grid - {title}</h1>
    <section bind:this={section}>
      {#if browser}
        <!-- Dynamic import breaks in SSR; render only in browser -->
        <svelte:component this={component} />
      {/if}
    </section>
  </div>
  <Navigation {headings} />
</div>

<svelte:head>
  <title>Svelte AG Grid - {title}</title>
</svelte:head>

<style lang="scss">
  .main {
    display: flex;
    gap: 32px;
  }
</style>
