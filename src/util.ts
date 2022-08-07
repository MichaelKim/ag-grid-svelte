export const scrollToHash = () => {
  const hash = decodeURIComponent(location.hash.slice(1));
  const h2 = document.getElementById(hash);
  if (!h2) return;

  // Go past header height
  scrollTo({ top: h2.offsetTop - 64, behavior: 'smooth' });
};
