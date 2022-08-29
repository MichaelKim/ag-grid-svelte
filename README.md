# ag-grid-svelte

An unofficial Svelte wrapper for [AG Grid](http://www.ag-grid.com/).

## Usage

Install with `npm install ag-grid-svelte`

```svelte
<script>
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  const columnDefs = [{ field: 'athlete' }, { field: 'gold' }, { field: 'age' }];

  let rowData = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Column Definitions</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {onGridReady} />
</div>
```

## Developing

This is a [SvelteKit](https://kit.svelte.dev) project, and contains both the ag-grid-svelte package and the [documentation website](https://ag-grid-svelte.michael.kim):

- The package is in `src/lib`
- The docs website is in `src/routes`

Install dependencies with `yarn`, then:

```bash
yarn dev      # Run the docs locally
yarn build    # Build the docs
yarn preview  # View the built docs locally

yarn test     # Run library tests
yarn package  # Package the library
```

Icons are taken from Github's Octicons.
