<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { Column, ColumnApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef = {
    width: 150
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;

  const onMedalsFirst = () => {
    columnApi.moveColumns(['gold', 'silver', 'bronze', 'total'], 0);
  };

  const onMedalsLast = () => {
    columnApi.moveColumns(['gold', 'silver', 'bronze', 'total'], 6);
  };

  const onCountryFirst = () => {
    columnApi.moveColumn('country', 0);
  };

  const onSwapFirstTwo = () => {
    columnApi.moveColumnByIndex(0, 1);
  };

  const onPrintColumns = () => {
    const cols = columnApi.getAllGridColumns();
    const colToNameFunc = (col: Column, index: number) => index + ' = ' + col.getId();
    const colNames = cols.map(colToNameFunc).join(', ');
    console.log('columns are: ' + colNames);
  };
</script>

<h2>Column Moving</h2>

<div style:margin-bottom="1rem">
  <button on:click={onMedalsFirst}>Medals First</button>
  <button on:click={onMedalsLast}>Medals Last</button>
  <button on:click={onCountryFirst}>Country First</button>
  <button on:click={onSwapFirstTwo}>Swap First Two</button>
  <button on:click={onPrintColumns}>Print Columns</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    suppressDragLeaveHidesColumns
    {onGridReady}
    bind:columnApi
  />
</div>
