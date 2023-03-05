<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { FirstDataRenderedEvent, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    {
      field: 'athlete',
      width: 150,
      suppressSizeToFit: true
    },
    { field: 'age', width: 90, minWidth: 50, maxWidth: 100 },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 }
  ];

  const defaultColDef = { resizable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let api: GridApi<IOlympicData>;
  const onFirstDataRendered = (_: FirstDataRenderedEvent) => {
    api.sizeColumnsToFit();
  };
</script>

<h2>Default Resizing</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {onGridReady}
    {onFirstDataRendered}
    bind:api
  />
</div>
