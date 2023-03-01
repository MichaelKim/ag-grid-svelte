<script lang="ts">
  import Highlight from '../../../../components/Highlight.svelte';
  import AgGrid from '../../../../icons/AgGrid.svelte';
</script>

<h2>
  Global Styles <a
    href="https://www.ag-grid.com/javascript-data-grid/global-style-customisation/"
    rel="noreferrer"
  >
    <AgGrid />
  </a>
</h2>

<p>Since AG Grid v28, you can customize the styling using CSS variables.</p>

<p>
  Since CSS rules in Svelte are scoped to their components, make sure to use the <code>
    :global(...)
  </code>
  modifier. Certain variables require global rules to be applied properly (e.g.
  <code>--ag-list-item-height</code>
  ), and targeting inner class names won't work without it since unused CSS rules are automatically removed.
</p>

<Highlight
  code={`<style>
  :global(.ag-theme-alpine) {
    --ag-background-color: #ddd;
  }

  /* Individual element */
  :global(.ag-theme-alpine .ag-header-cell-label) {
    font-style: italic;
  }

  /* Alternative (if .ag-theme-alpine is in scope) */
  .ag-theme-alpine :global(.ag-header-cell-label) {
  }

  /* Multiple themes */
  :global(.ag-theme-alpine, .ag-theme-alpine-dark) {
    --ag-grid-size: 3px;
  }
${'<'}/style>`}
  lang="html"
/>

<p>
  If your styles are coming from outside of Svelte (i.e. an imported CSS file), then you can ignore
  the note above.
</p>
