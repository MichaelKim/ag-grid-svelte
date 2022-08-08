<script lang="ts">
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
    <div>
      <a href="/"><b>Svelte AG Grid</b></a>
    </div>
    <div>
      <a
        href="https://github.com/MichaelKim/ag-grid-svelte"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
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
    padding: 0 16px;
    justify-content: space-between;
  }
  b {
    font-size: xx-large;
  }
</style>
