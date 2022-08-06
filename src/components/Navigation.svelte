<script lang="ts">
  export let headings: string[];
</script>

<nav>
  <ul>
    {#each headings as heading}
      <li>
        <p on:click={() => (location.hash = heading)}>
          {heading}
        </p>
      </li>
    {/each}
  </ul>
</nav>
