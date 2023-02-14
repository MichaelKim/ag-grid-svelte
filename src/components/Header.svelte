<script lang="ts">
  import Github from '../icons/Github.svelte';
  import Menu from '../icons/Menu.svelte';
  import Logo from './Logo.svelte';
  import NavBar from './NavBar.svelte';

  export let selected: string = '';

  let visible = true;
  let lastTop = 0;
  function onScroll() {
    const currTop = document.documentElement.scrollTop;
    if (lastTop) visible = lastTop > currTop;
    lastTop = currTop;
  }

  let open = false;
</script>

<header style:transform="translateY({visible ? '0' : '-100%'}">
  <div class="container">
    <div class="left">
      <button class="menu-btn" aria-label="Toggle navigation" on:click={() => (open = !open)}>
        <Menu />
      </button>
      <Logo />
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

<NavBar {selected} bind:open />

<svelte:window on:scroll|passive={onScroll} />

<style lang="scss">
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
  .menu-btn {
    display: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    .menu-btn {
      display: inherit;
    }
  }
  a {
    color: black;
    &:hover {
      text-decoration: none;
      color: #777;
    }
  }
</style>
