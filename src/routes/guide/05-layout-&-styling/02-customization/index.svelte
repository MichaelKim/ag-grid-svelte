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
  modifier on the theme class. Certain variables require global rules to be applied properly (e.g.
  <code>--ag-list-item-height</code>
  ), and targeting inner class names won't work without it since unused CSS rules are automatically removed.
</p>

<Highlight
  code={`<style>
  :global(.ag-theme-alpine) {
    --ag-background-color: orange;
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
  Svelte's style props won't work for the same reason, as the CSS variables need to be applied to
  the theme's class.
</p>

<Highlight
  code={`<div class="ag-theme-alpine">
  <AgGridSvelte --ag-background-color="#ddd" />
</div>

<!-- is equivalent to -->

<div class="ag-theme-alpine">
  <div style="display: contents; --ag-background-color:#ddd;"> <!-- :( -->
    <AgGridSvelte />
  </div>
</div>`}
  lang="html"
/>

<p>
  Alternatively, if you're using <a
    href="https://github.com/sveltejs/svelte-preprocess"
    rel="noreferrer"
    target="_blank"
  >
    svelte-preprocess
  </a>
  , the
  <code>global</code>
  attribute and
  <code>:global</code>
  rule work as well:
</p>

<Highlight
  code={`${'<'}style global>
    .ag-theme-alpine {
      --ag-background-color: chocolate;
    }
${'<'}/style>

<style>
  :global {
    .ag-theme-alpine {
      --ag-background-color: lemonchiffon;
    }
  }
${'<'}/style>`}
  lang="html"
/>

<p>
  If your styles are coming from outside of Svelte (i.e. an imported CSS file), then you can ignore
  the note above.
</p>

<h2>
  Styling Rows and Cells <a
    href="https://www.ag-grid.com/javascript-data-grid/row-styles/"
    rel="noreferrer"
  >
    <AgGrid />
  </a>
</h2>

<p>
  Similarly, if you define custom row and cell classes inside Svelte, make sure to the global
  modifier to prevent Svelte from removing them:
</p>

<Highlight
  code={`<AgGridSvelte rowClass="my-row-class" />

<style>
  :global(.my-row-class) {
    background-color: tomato;
  }
${'<'}/style>`}
  lang="html"
/>
