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
    <div class="left">
      <h1><a href="/">Svelte AG Grid</a></h1>
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
    border-bottom: 2px solid lightgrey;
    background-color: #fcfcff;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: transform 0.15s ease-in-out;
  }
  .container {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
  .left {
    flex: 1;
  }
</style>
