<script lang="ts">
  import logo from '../icons/favicon.svg';
</script>

<a href="/" class="logo" aria-label="Homepage">
  <img src={logo} alt="AG Grid Svelte logo" />
  <b>Svelte AG Grid</b>
</a>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  a {
    color: black;
    &:hover {
      text-decoration: none;
      color: #777;
    }
  }
  b {
    font-size: x-large;
  }
</style>
