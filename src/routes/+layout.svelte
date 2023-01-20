<slot />

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
  :global(main) {
    max-width: var(--main-width);
    margin: 0 auto;
  }
  :global(a) {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      text-decoration-color: black;
    }
  }
  :global(pre) {
    white-space: break-spaces;
  }
  :global(*::-webkit-scrollbar) {
    background-color: transparent;
    width: 12px;
    height: 12px;
  }
  :global(*::-webkit-scrollbar-thumb) {
    background-color: #bbb;
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    &:hover {
      background-color: #777;
    }
  }
  :global(*::-webkit-scrollbar-track) {
    background-color: #f0f0f0;
  }
</style>
