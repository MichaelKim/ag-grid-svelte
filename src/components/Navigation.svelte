<script lang="ts">
  import { goto } from '$app/navigation';
  import { scrollToHash } from '../util';

  export let headings: string[];

  function onClick(heading: string) {
    goto('#' + heading, { noScroll: true }).then(scrollToHash);
  }
</script>

<nav>
  <ul>
    {#each headings as heading}
      <li>
        <a href="#{heading}" on:click|preventDefault={() => onClick(heading)}>
          {heading}
        </a>
      </li>
    {/each}
  </ul>
</nav>
<svelte:window on:hashchange={scrollToHash} />

<style>
  nav {
    position: sticky;
    top: var(--header-height);
    width: 200px;
    height: calc(100vh - var(--header-height));
    overflow: auto;
    padding-top: 20px;
  }
  ul {
    padding-left: 4px;
    border-left: 2px solid lightgray;
  }
  li {
    list-style: none;
    padding: 4px;
  }
  a {
    color: #555;
    font-size: small;
  }
  @media (max-width: 1000px) {
    nav {
      display: none;
    }
  }
</style>
