<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefsMedalsIncluded: ColDef[] = [
    { field: 'athlete' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' }
  ];

  const colDefsMedalsExcluded: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' }
  ];

  let columnDefs = columnDefsMedalsIncluded;

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

  function onBtExcludeMedalColumns() {
    columnDefs = colDefsMedalsExcluded;
  }

  function onBtIncludeMedalColumns() {
    columnDefs = columnDefsMedalsIncluded;
  }
</script>

<h2>Adding & Removing Columns</h2>
<div>
  <button on:click={onBtExcludeMedalColumns}>Exclude Medal Columns</button>
  <button on:click={onBtIncludeMedalColumns}>Include Medal Columns</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
