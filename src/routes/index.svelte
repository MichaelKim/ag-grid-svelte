<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';

  let rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  let columnDefs = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];
</script>

<div class="app">
  <h1>ag-grid-svelte</h1>
  <AgGridSvelte {rowData} {columnDefs} />
</div>

<style>
  :global(html, body) {
    margin: 0;
    height: 100%;
  }
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
