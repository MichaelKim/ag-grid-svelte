<script lang="ts">
  import logo from '../icons/favicon.svg';
  import './main.scss';
</script>

<slot />

<svelte:head>
  <link rel="icon" href={logo} type="image/svg+xml" />
</svelte:head>
