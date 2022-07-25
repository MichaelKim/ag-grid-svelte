<script lang="ts">
  export let title = '';
</script>

<div class="app">
  <nav>
    <ul>
      <li><a href="/">Svelte Ag Grid</a></li>
      <li><a href="/columns">Columns</a></li>
    </ul>
  </nav>
  <div class="main">
    <h1>Svelte Data Grid - {title}</h1>
    <slot />
  </div>
</div>

<svelte:head>
  <title>Svelte Data Grid - {title}</title>
</svelte:head>

<style>
  :global(html, body) {
    margin: 0;
    height: 100%;
    font-family: sans-serif;
  }
  .app {
    display: flex;
    height: 100%;
  }
  nav {
    width: 300px;
    overflow: auto;
    border-right: 1px solid gray;
    padding: 4px;
    font-size: larger;
  }
  .main {
    flex: 1;
    padding: 0 30px;
  }
</style>
