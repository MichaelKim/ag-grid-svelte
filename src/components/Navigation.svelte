<script lang="ts">
  import { goto } from '$app/navigation';
  import { scrollToHash } from '../util';

  export let headings: string[];

  function onClick(heading: string) {
    goto('#' + heading, { noscroll: true }).then(scrollToHash);
  }
</script>

<nav>
  <ul>
    {#each headings as heading}
      <li>
        <a href="#{heading}" on:click|preventDefault={() => onClick(heading)}>
          <span>{heading}</span>
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
  li {
    list-style: none;
    padding: 4px;
  }
  span {
    color: #555;
  }
</style>
