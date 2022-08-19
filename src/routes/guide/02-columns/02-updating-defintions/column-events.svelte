<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type {
    ColDef,
    ColumnMovedEvent,
    ColumnPinnedEvent,
    ColumnPivotChangedEvent,
    ColumnResizedEvent,
    ColumnRowGroupChangedEvent,
    ColumnValueChangedEvent,
    ColumnVisibleEvent,
    SortChangedEvent
  } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  function getColumnDefs(): ColDef[] {
    return [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' }
    ];
  }

  const defaultColDef = {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnDefs = getColumnDefs();
  let pivotMode = false;

  function onSortChanged(e: SortChangedEvent) {
    console.log('Event Sort Changed', e);
  }

  function onColumnResized(e: ColumnResizedEvent) {
    console.log('Event Column Resized', e);
  }

  function onColumnVisible(e: ColumnVisibleEvent) {
    console.log('Event Column Visible', e);
  }

  function onColumnPivotChanged(e: ColumnPivotChangedEvent) {
    console.log('Event Pivot Changed', e);
  }

  function onColumnRowGroupChanged(e: ColumnRowGroupChangedEvent) {
    console.log('Event Row Group Changed', e);
  }

  function onColumnValueChanged(e: ColumnValueChangedEvent) {
    console.log('Event Value Changed', e);
  }

  function onColumnMoved(e: ColumnMovedEvent) {
    console.log('Event Column Moved', e);
  }

  function onColumnPinned(e: ColumnPinnedEvent) {
    console.log('Event Column Pinned', e);
  }

  function onBtSortOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'age') {
        colDef.sort = 'desc';
      }
      if (colDef.field === 'athlete') {
        colDef.sort = 'asc';
      }
    });
    columnDefs = newDefs;
  }

  function onBtSortOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.sort = null;
    });
    columnDefs = newDefs;
  }

  function onBtWidthNarrow() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.width = 100;
      }
    });
    columnDefs = newDefs;
  }

  function onBtWidthNormal() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.width = 200;
    });
    columnDefs = newDefs;
  }

  function onBtHide() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.hide = true;
      }
    });
    columnDefs = newDefs;
  }

  function onBtShow() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.hide = false;
    });
    columnDefs = newDefs;
  }

  function onBtPivotOn() {
    pivotMode = true;
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'country') {
        colDef.pivot = true;
      }
    });
    columnDefs = newDefs;
  }

  function onBtPivotOff() {
    pivotMode = false;
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.pivot = false;
    });
    columnDefs = newDefs;
  }

  function onBtRowGroupOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'sport') {
        colDef.rowGroup = true;
      }
    });
    columnDefs = newDefs;
  }

  function onBtRowGroupOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.rowGroup = false;
    });
    columnDefs = newDefs;
  }

  function onBtAggFuncOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'gold' || colDef.field === 'silver' || colDef.field === 'bronze') {
        colDef.aggFunc = 'sum';
      }
    });
    columnDefs = newDefs;
  }

  function onBtAggFuncOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.aggFunc = null;
    });
    columnDefs = newDefs;
  }

  function onBtPinnedOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      if (colDef.field === 'athlete') {
        colDef.pinned = 'left';
      }
      if (colDef.field === 'age') {
        colDef.pinned = 'right';
      }
    });
    columnDefs = newDefs;
  }

  function onBtPinnedOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((colDef) => {
      colDef.pinned = null;
    });
    columnDefs = newDefs;
  }
</script>

<h2>Column Events</h2>
<div class="buttons">
  <div>
    <button on:click={onBtSortOn}>Sort On</button>
    <button on:click={onBtSortOff}>Sort Off</button>
  </div>
  <div>
    <button on:click={onBtWidthNarrow}>Width Narrow</button>
    <button on:click={onBtWidthNormal}>Width Normal</button>
  </div>
  <div>
    <button on:click={onBtHide}>Hide Cols</button>
    <button on:click={onBtShow}>Show Cols</button>
  </div>
  <div>
    <button on:click={onBtPivotOn}>Pivot On</button>
    <button on:click={onBtPivotOff}>Pivot Off</button>
  </div>
  <div>
    <button on:click={onBtRowGroupOn}>Row Group On</button>
    <button on:click={onBtRowGroupOff}>Row Group Off</button>
  </div>
  <div>
    <button on:click={onBtAggFuncOn}>Agg Func On</button>
    <button on:click={onBtAggFuncOff}>Agg Func Off</button>
  </div>
  <div>
    <button on:click={onBtPinnedOn}>Pinned On</button>
    <button on:click={onBtPinnedOff}>Pinned Off</button>
  </div>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {pivotMode}
    {onGridReady}
    {onSortChanged}
    {onColumnResized}
    {onColumnVisible}
    {onColumnPivotChanged}
    {onColumnRowGroupChanged}
    {onColumnValueChanged}
    {onColumnMoved}
    {onColumnPinned}
  />
</div>

<style>
  .buttons {
    display: flex;
    gap: 4px;
  }
  .buttons > div {
    display: flex;
    flex-direction: column;
  }
</style>
