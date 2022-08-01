<script lang="ts">
  export let title: string = '';
</script>

<div class="app">
  <nav>
    <h4><a href="/">Svelte AG Grid</a></h4>
    <ul>
      <li><a href="/columns/definitions">Columns</a></li>
      <li><a href="/columns/groups">Groups</a></li>
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
    width: 200px;
    overflow: auto;
    border-right: 1px solid gray;
    padding: 16px 4px;
    font-size: larger;
  }
  h4 {
    text-align: center;
    margin: 0;
  }
  .main {
    flex: 1;
    padding: 0 30px;
    overflow: auto;
  }
</style>
