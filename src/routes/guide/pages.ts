import type { ComponentType } from 'svelte';

type ComponentImport = { default: ComponentType };

const toCamelCase = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');
const formatSlug = (slug: string) => slug.split('-').map(toCamelCase).join(' ');
const parseFile = ([path, importer]: [string, () => Promise<ComponentImport>]): FileData => {
  const [, section, filename] = path.split('/');
  const slug = filename.slice(3); // Strip prefix
  // TODO: cannot represent non-camelcase in titles
  const title = slug === 'row-ids' ? 'Row IDs' : formatSlug(slug);

  return {
    section, // [#]-[section]
    filename, // [#]-[slug].svelte
    slug,
    title,
    importer
  };
};

type FileData = {
  section: string;
  filename: string;
  slug: string;
  title: string;
  importer: () => Promise<ComponentImport>;
};

// Filepath format: ./[#]-[section]/[#]-[slug]/index.svelte
const files = import.meta.glob<ComponentImport>('./*/*/index.svelte');
export const filedata = Object.entries(files).map(parseFile);

// Generate sidebar nav
const sections = filedata.reduce((acc, data) => {
  acc[data.section] ??= [];
  acc[data.section].push(data);
  return acc;
}, {} as Record<string, FileData[]>);

// Sort by prefix
const sectionTitles = Object.keys(sections).sort();

export type Nav = { title: string; pages: Nav[] } | { title: string; href: string };

export const nav: Nav[] = sectionTitles.map((title) => {
  const pages = sections[title].map((data) => ({
    title: data.title,
    href: '/guide/' + data.slug
  }));
  return {
    title: formatSlug(title.slice(3)), // Strip prefix
    pages
  };
});
