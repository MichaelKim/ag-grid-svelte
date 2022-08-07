<script lang="ts">
  import Header from '../components/Header.svelte';
</script>

<Header />
<main>
  <slot />
</main>

<style lang="scss">
  :global(body) {
    --main-width: 1440px;
    --header-height: 4rem;
    --bg-color: #fcfcff;

    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: var(--bg-color);
    font-size: 16px;
  }
  :global(a) {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  main {
    display: flex;
    max-width: var(--main-width);
    margin: 0 auto;
  }
</style>
