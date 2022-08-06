<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  let rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  let columnDefs = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

  function addRow() {
    rowData = rowData.concat({
      make: 'Make-' + rowData.length,
      model: 'Model-' + rowData.length,
      price: Math.floor(Math.random() * 100000)
    });
  }
</script>

<section>
  <button on:click={addRow}>Add Row</button>
  <div style:height="500px" class="ag-theme-alpine">
    <AgGridSvelte {rowData} {columnDefs} />
  </div>
</section>

<svelte:head>
  <title>Svelte AG Grid - Svelte Data Grid</title>
</svelte:head>

<style>
  section {
    width: 100%;
  }
</style>
