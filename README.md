# [<img src="https://github.com/MichaelKim/ag-grid-svelte/blob/main/src/icons/favicon.svg?raw=true" width="32" alt="AG Grid Svelte logo">](https://ag-grid-svelte.michael.kim) ag-grid-svelte

[![NPM Version](https://img.shields.io/npm/v/ag-grid-svelte?color=40b3ff)](https://npmjs.org/package/ag-grid-svelte) [![license](https://img.shields.io/github/license/michaelkim/ag-grid-svelte)](LICENSE)

NB: This is a temporary fork of ag-grid-svelte until that package updates to Svelte 4.

An unofficial Svelte wrapper for [AG Grid](http://www.ag-grid.com/). Tested with v28 to v30.

## Usage

Install with `npm install ag-grid-svelte ag-grid-community`

```svelte
<script>
  import AgGridSvelte from 'ag-grid-svelte';
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

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {onGridReady} />
</div>

<style>
  .ag-theme-alpine {
    --ag-background-color: #ddd;
  }
</style>
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

Icons are taken from [Github's Octicons](https://primer.style/octicons/).
