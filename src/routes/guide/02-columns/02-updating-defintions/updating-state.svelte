<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  function getColumnDefs(): ColDef[] {
    return [
      { field: 'athlete', width: 150, sort: 'asc' },
      { field: 'age' },
      { field: 'country', pinned: 'left' },
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
    width: 100,
    sortable: true,
    resizable: true,
    pinned: null,
    sort: null
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnDefs = getColumnDefs();
  function onBtWithState() {
    columnDefs = getColumnDefs();
  }
  function onBtRemove() {
    columnDefs = [];
  }
</script>

<h2>Updating Column State</h2>
<div>
  <button on:click={onBtWithState}>Set Columns with State</button>
  <button on:click={onBtRemove}>Remove Columns</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
