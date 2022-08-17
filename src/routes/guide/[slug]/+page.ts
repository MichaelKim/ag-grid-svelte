import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import type { Nav } from '../../../components/TreeView.svelte';
import type { PageLoad } from './$types';

const toCamelCase = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');
const formatSlug = (slug: string) => slug.split('-').map(toCamelCase).join(' ');
const parseFile = ([path, importer]: [
  string,
  () => Promise<{ default: SvelteComponent }>
]): Data => {
  const [, section, filename] = path.split('/');
  const slug = filename.slice(3); // Strip prefix
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

// Filepath format: ./[#]-[section]/[#]-[slug]/index.svelte
const files = import.meta.glob<{ default: SvelteComponent }>('../*/*/index.svelte');
const filedata = Object.entries(files).map(parseFile);

// Generate sidebar nav
const sections = filedata.reduce((acc, data) => {
  acc[data.section] ??= [];
  acc[data.section].push(data);
  return acc;
}, {} as Record<string, Data[]>);

// Sort by prefix
const sectionTitles = Object.keys(sections).sort();
const nav: Nav[] = sectionTitles.map((title) => {
  const pages = sections[title].map((data) => ({
    title: data.title,
    href: '/guide/' + data.slug
  }));
  return {
    title: formatSlug(title.slice(3)), // Strip prefix
    pages
  };
});

// Load page component from slug
export const load: PageLoad = async ({ params: { slug } }) => {
  const data = filedata.find((data) => data.slug === slug);
  if (data == null) throw error(404);

  const component = (await data.importer()).default;
  return { title: data.title, component, nav };
};
