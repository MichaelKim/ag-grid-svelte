<script lang="ts">
  import Highlight from '../../../../components/Highlight.svelte';
  import AgGrid from '../../../../icons/AgGrid.svelte';
</script>

<h2>
  Themes <a href="https://www.ag-grid.com/javascript-data-grid/themes/" rel="noreferrer">
    <AgGrid />
  </a>
</h2>

<p>
  Just like the official AG Grid packages, you can use one of the provided themes or create your own
  theme.
</p>

<h2>Importing a Theme</h2>

<p>
  If you're using Vite / SvelteKit, simply import the CSS file in your app, for example, in the
  component that uses the grid.
</p>

<Highlight
  code={`<script>
  import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
  import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
${'<'}/script>`}
  lang="ts"
/>

<p>Alternatively, load the CSS files from a CDN:</p>

<Highlight
  code={`<svelte:window> <!-- or add this directly in your HTML file -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/ag-grid-community@28.0.0/styles/ag-grid.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/ag-grid-community@28.0.0/styles/ag-theme-alpine.css"
  />
${'<'}/svelte:window>
`}
  lang="html"
/>

<p>Just make sure the CSS files are imported before any grids are loaded.</p>

<h2>Applying a Theme</h2>

<p>
  Add the theme class name to the outer <code>{'<'}div{'>'}</code>
  containing the grid.
</p>

<Highlight
  code={`<div class="ag-theme-alpine">
  <AgGridSvelte ... />
</div>
`}
  lang="svelte"
/>

<p>To support dark mode, you can leverage Svelte's class directives to switch between the two:</p>

<Highlight
  code={`<div class="ag-theme-alpine" class:ag-theme-alpine-dark={isDarkMode}>
  <AgGridSvelte ... />
</div>
`}
  lang="svelte"
/>
