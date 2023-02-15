<script lang="ts">
  import Highlight from '../../../../components/Highlight.svelte';
</script>

<h2>Getting Started</h2>

<p>AG Grid Svelte is designed to provide a seamless AG Grid integration to any Svelte project.</p>

<Highlight code="npm install ag-grid-svelte ag-grid-community" lang="plaintext" />

<h2>Usage</h2>

<p>
  All grid options are available as props to <code>{'<'}AGGridSvelte/{'>'}</code>
  and leverages Svelte's reactivity to update on changes.
</p>

<p>
  Check out the <a
    href="https://www.ag-grid.com/documentation/"
    target="_blank"
    rel="noopener noreferrer"
  >
    official AG Grid docs
  </a>
  for further documentation on AG Grid functionality. This page serves to provide the same AG Grid examples
  written instead using AG Grid Svelte, and any differences will be explicitly mentioned in the examples.
</p>

<h2>Theming</h2>

<p>Before loading the grid, import the relevant CSS files:</p>

<Highlight
  code={`import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS`}
  lang="typescript"
/>

<p>Then, apply the chosen theme by adding the corresponding class to the parent container:</p>

<Highlight
  code={`<div class="ag-theme-alpine" style:width="500px" style:height="500px">
  <AGGridSvelte ... />
</div>`}
/>

<h2>Accessing APIs</h2>

<p>The Grid API and Column API objects can be accessed via prop bindings:</p>

<Highlight
  code={`${'<'}script>
  let api, columnApi;

  const onClick = () => {
    api.deselectAll();
  };
</script>

<AGGridSvelte bind:api={api} bind:columnApi={columnApi} />
`}
/>

<p>Alternatively, the onGridReady event will provide the APIs as well</p>

<Highlight
  code={`${'<'}script>
  let api, columnApi;

  const onGridReady = (event) => {
    api = event.api;
    columnApi = event.columnApi;
  };
</script>

<AGGridSvelte {onGridReady} />`}
/>

<h2>Styling</h2>

<p>
  Since styles in Svelte are scoped to that component, make sure to apply styles globally when
  targeting inner class names:
</p>

<Highlight
  code={`<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

${'<'}style>
  .ag-theme-alpine {
    --ag-background-color: #ddd;
  }
  .ag-theme-alpine :global(.ag-header-cell-label) {
    font-style: italic;
  }
</style>`}
/>

<h2>Enterprise</h2>

<p>
  To use AG Grid Enterprise, import <code>ag-grid-enterprise</code>
  before any grid instance is created. Within Svelte, this can be done in a regular
  <code>{`<`}script></code>
  tag or (preferably) a
  <code>module</code>
  script:
</p>

<Highlight
  code={`${'<'}script context="module">
  // Will get called only once when this module is loaded
  import 'ag-grid-enterprise';
</script>`}
/>

<p>You can set a license key in a similar way:</p>

<Highlight
  code={`${'<'}script context="module">
  import { LicenseManager } from 'ag-grid-enterprise';

  LicenseManager.setLicenseKey("your license key");
</script>`}
/>

<p>
  For Vite / SvelteKit users, if you are getting a warning about the enterprise package missing, it
  may be due to Vite's dependency pre-bundling. Try
  <a
    href="https://vitejs.dev/guide/dep-pre-bundling.html#file-system-cache"
    target="_blank"
    rel="noopener noreferrer"
  >
    clearing your Vite cache
  </a>
  (run
  <code>vite dev --force</code>
  ) or adding
  <code>ag-grid-svelte</code>
  to
  <a
    href="https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-include"
    target="_blank"
    rel="noopener noreferrer"
  >
    <code>optimize.include</code>
  </a>
  in your Vite config.
</p>

<h2>Version Compatibility</h2>

<p>AG Grid Svelte requires Svelte 3, and has been tested with AG Grid 28 and 29.</p>
