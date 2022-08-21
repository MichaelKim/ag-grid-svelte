<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi, ColumnResizedEvent, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    { field: 'athlete', width: 150, suppressSizeToFit: true },
    {
      field: 'age',
      headerName: 'Age of Athlete',
      width: 90,
      minWidth: 50,
      maxWidth: 150
    },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 }
  ];

  const defaultColDef = {
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let api: GridApi<IOlympicData>;
  let columnApi: ColumnApi;
  const onColumnResized = (params: ColumnResizedEvent) => {
    console.log(params);
  };

  const sizeToFit = () => {
    api.sizeColumnsToFit();
  };

  const autoSizeAll = (skipHeader: boolean) => {
    const allColumnIds: string[] = [];
    columnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    columnApi.autoSizeColumns(allColumnIds, skipHeader);
  };
</script>

<h2>Column Resizing</h2>
<div>
  <button on:click={sizeToFit}>Size to Fit</button>
  <button on:click={() => autoSizeAll(false)}>Auto-Size All</button>
  <button on:click={() => autoSizeAll(true)}>Auto-Size All (Skip Header)</button>
</div>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {onGridReady}
    {onColumnResized}
    bind:api
    bind:columnApi
  />
</div>
