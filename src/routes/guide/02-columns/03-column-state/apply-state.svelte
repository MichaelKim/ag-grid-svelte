<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi, ColumnState } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  const defaultColDef = {
    sortable: true,
    resizable: true,
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true
  };

  const sideBar = {
    toolPanels: ['columns']
  };

  let columnDefs = [
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

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let colState: ColumnState[];
  let columnApi: ColumnApi;
  const saveState = () => {
    colState = columnApi.getColumnState();
    console.log('column state saved');
  };

  const restoreState = () => {
    if (!colState) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }
    columnApi.applyColumnState({
      state: colState,
      applyOrder: true
    });
    console.log('column state restored');
  };

  const resetState = () => {
    columnApi.resetColumnState();
    console.log('column state reset');
  };
</script>

<h2>Save and Apply State</h2>
<div>
  <button on:click={saveState}>Save State</button>
  <button on:click={restoreState}>Restore State</button>
  <button on:click={resetState}>Reset State</button>
</div>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {sideBar}
    rowGroupPanelShow="always"
    pivotPanelShow="always"
    {onGridReady}
    bind:columnApi
  />
</div>
