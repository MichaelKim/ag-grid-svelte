<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';
  import type { ColDef, ColGroupDef } from 'ag-grid-community';

  const columnDefs: (ColDef<IOlympicData> | ColGroupDef<IOlympicData>)[] = [
    {
      headerName: 'Athlete Details',
      marryChildren: true,
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' }
      ]
    },
    { field: 'age', colId: 'age' },
    {
      headerName: 'Sports Results',
      marryChildren: true,
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'total', colId: 'total' },
        { field: 'gold', colId: 'gold' },
        { field: 'silver', colId: 'silver' },
        { field: 'bronze', colId: 'bronze' }
      ]
    }
  ];

  const defaultColDef = {
    resizable: true,
    width: 160
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Marry Children</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

<style>
  .ag-theme-alpine :global(.ag-header-group-cell-with-group) {
    background-color: #00e7b1 !important;
  }
</style>
