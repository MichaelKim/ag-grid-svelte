<script lang="ts">
  import Header from '../components/Header.svelte';
</script>

<Header />
<main>
  <slot />
</main>

<style lang="scss">
  :global(*) {
    margin: 0;
  }
  :global(html, body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: #fcfcff;
  }
  :global(p) {
    font-size: 16px;
    line-height: 20px;
  }
  :global(a) {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  main {
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
    padding: 8px;
  }
</style>
