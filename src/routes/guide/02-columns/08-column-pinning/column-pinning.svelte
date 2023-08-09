<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    {
      headerName: '#',
      colId: 'rowNum',
      valueGetter: 'node.id',
      width: 80,
      pinned: 'left'
    },
    { field: 'athlete', width: 150, pinned: 'left' },
    { field: 'age', width: 90, pinned: 'left' },
    { field: 'country', width: 150 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 150 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100, pinned: 'right' }
  ];

  const defaultColDef: ColDef = { resizable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }

  let api: GridApi;
  let columnApi: ColumnApi;
  const clearPinned = () => {
    columnApi.applyColumnState({ defaultState: { pinned: null } });
  };

  const resetPinned = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'rowNum', pinned: 'left' },
        { colId: 'athlete', pinned: 'left' },
        { colId: 'age', pinned: 'left' },
        { colId: 'total', pinned: 'right' }
      ],
      defaultState: { pinned: null }
    });
  };

  const pinCountry = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'country', pinned: 'left' }],
      defaultState: { pinned: null }
    });
  };

  const jumpToCol = (event: Event & { currentTarget: HTMLInputElement }) => {
    const index = Number(event.currentTarget.value);
    if (isNaN(index)) return;

    // it's actually a column the api needs, so look the column up
    const column = columnApi.getColumns()?.[index];
    if (column) api.ensureColumnVisible(column);
  };

  const jumpToRow = (event: Event & { currentTarget: HTMLInputElement }) => {
    const index = Number(event.currentTarget.value);
    if (isNaN(index)) return;

    api.ensureIndexVisible(index);
  };
</script>

<h2>Column Pinning</h2>

<div style:padding="4px">
  <button on:click={clearPinned}>Clear Pinned</button>
  <button on:click={resetPinned}>Left = #, Athlete, Age; Right = Total</button>
  <button on:click={pinCountry}>Left = Country</button>
</div>
<div style:padding="4px">
  Jump to:
  <input placeholder="row" type="text" on:input={jumpToRow} />
  <input placeholder="col" type="text" on:input={jumpToCol} />
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} bind:api bind:columnApi />
</div>

<style>
  input {
    width: 40px;
  }
</style>
