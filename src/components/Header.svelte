<script lang="ts">
  import Github from '../icons/Github.svelte';

  let visible = true;
  let lastTop = 0;
  function onScroll() {
    const currTop = document.documentElement.scrollTop;
    if (lastTop) visible = lastTop > currTop;
    lastTop = currTop;
  }
</script>

<header style:transform="translateY({visible ? '0' : '-100%'}">
  <div class="container">
    <div class="left">
      <a href="/"><b>Svelte AG Grid</b></a>
      <a href="/guide">Docs</a>
    </div>
    <div>
      <a
        href="https://github.com/MichaelKim/ag-grid-svelte"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github repository"
      >
        <Github />
      </a>
    </div>
  </div>
</header>

<svelte:window on:scroll|passive={onScroll} />

<style>
  header {
    height: var(--header-height);
    border-bottom: 2px solid lightgrey;
    background-color: var(--bg-color);
    position: sticky;
    top: 0;
    z-index: 10;
    transition: transform 0.15s ease-in-out;
    box-sizing: border-box;
  }
  .container {
    max-width: var(--main-width);
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    justify-content: space-between;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  b {
    font-size: x-large;
  }
</style>
