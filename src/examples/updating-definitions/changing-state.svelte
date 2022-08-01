<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../types';

  function getColumnDefs(): ColDef[] {
    return [
      { field: 'athlete', initialWidth: 100, initialSort: 'asc' },
      { field: 'age' },
      { field: 'country', initialPinned: 'left' },
      { field: 'sport' },
      { field: 'year' },
      { field: 'date' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' }
    ];
  }

  const defaultColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnDefs = getColumnDefs();
  function onBtWithDefault() {
    columnDefs = getColumnDefs();
  }
  function onBtRemove() {
    columnDefs = [];
  }
</script>

<h2>Updating Column Initial Attributes</h2>
<div>
  <button on:click={onBtWithDefault}>Set Columns with Initials</button>
  <button on:click={onBtRemove}>Remove Columns</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
