<h2>Getting Started</h2>

<p>AG Grid Svelte is designed to provide a seamless AG Grid integration to any Svelte project.</p>

<code>
  <pre>
  npm install ag-grid-svelte
  npm install ag-grid-community
</pre>
</code>

<h2>Usage</h2>

<p>
  All grid options are available as props to <code>{'<'}AGGridSvelte/{'>'}</code>
  and leverages Svelte's reactivity to update on changes.
</p>

<h2>Theming</h2>

<p>Before loading the grid, import the relevant CSS files:</p>

<code>
  <pre>
  import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
  import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
</pre>
</code>

<p>Then, apply the chosen theme by adding the corresponding class to the parent container:</p>

<code>
  <pre>
  {`<div className="ag-theme-alpine" style:width="500px" style:height="500px">
    <AGGridSvelte ... />
  </div>`}</pre>
</code>

<h2>Accessing APIs</h2>

<p>The Grid API and Column API objects can be accessed via prop bindings:</p>

<code>
  <pre>
  {'<'}{`script>
    let api, columnApi;

    const onClick = () => {
      api.deselectAll();
    };
  </script>
  
  <AGGridSvelte
    bind:api={api}
    bind:columnApi={columnApi}
  />`}
</pre>
</code>

<p>Alternatively, the onGridReady event will provide the APIs as well</p>

<code>
  <pre>
  {'<'}{`script>
    let api, columnApi;

    const onGridReady = (event) => {
      api = event.api;
      columnApi = event.columnApi;
    };
  </script>
  
  <AGGridSvelte {onGridReady} />`}
</pre>
</code>
