import { error } from '@sveltejs/kit';
import { filedata } from '../pages';
import type { PageLoad } from './$types';

export const prerender = true;

// Load page component from slug
export const load: PageLoad = async ({ params: { slug } }) => {
  const data = filedata.find((data) => data.slug === slug);
  if (data == null) throw error(404);

  const component = (await data.importer()).default;
  return { title: data.title, component };
};
