<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../types';

  function getColumnDefs(): ColDef[] {
    return [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
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
    resizable: true,
    filter: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnDefs = getColumnDefs();
  function setHeaderNames() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef, index) => {
      colDef.headerName = 'C' + index;
    });
    columnDefs = newDefs;
  }
  function removeHeaderNames() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.headerName = undefined;
    });
    columnDefs = newDefs;
  }
  function setValueFormatters() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.valueFormatter = (params) => `[ ${params.value} ]`;
    });
    columnDefs = newDefs;
  }
  function removeValueFormatters() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.valueFormatter = undefined;
    });
    columnDefs = newDefs;
  }
</script>

<h2>Updating Column Definitions</h2>
<div>
  <button on:click={setHeaderNames}>Set Header Names</button>
  <button on:click={removeHeaderNames}>Remove Header Names</button>
  <button on:click={setValueFormatters}>Set Value Formatters</button>
  <button on:click={removeValueFormatters}> Remove Value Formatters </button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
