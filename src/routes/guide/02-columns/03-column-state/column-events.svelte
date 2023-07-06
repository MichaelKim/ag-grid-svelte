<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type {
    ColDef,
    ColumnApi,
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

  const columnDefs: ColDef<IOlympicData>[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' }
  ];
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

  let columnApi: ColumnApi;

  const onSortChanged = (e: SortChangedEvent) => {
    console.log('Event Sort Changed', e);
  };

  const onColumnResized = (e: ColumnResizedEvent) => {
    console.log('Event Column Resized', e);
  };

  const onColumnVisible = (e: ColumnVisibleEvent) => {
    console.log('Event Column Visible', e);
  };

  const onColumnPivotChanged = (e: ColumnPivotChangedEvent) => {
    console.log('Event Pivot Changed', e);
  };

  const onColumnRowGroupChanged = (e: ColumnRowGroupChangedEvent) => {
    console.log('Event Row Group Changed', e);
  };

  const onColumnValueChanged = (e: ColumnValueChangedEvent) => {
    console.log('Event Value Changed', e);
  };

  const onColumnMoved = (e: ColumnMovedEvent) => {
    console.log('Event Column Moved', e);
  };

  const onColumnPinned = (e: ColumnPinnedEvent) => {
    console.log('Event Column Pinned', e);
  };

  const onBtSortOn = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'age', sort: 'desc' },
        { colId: 'athlete', sort: 'asc' }
      ]
    });
  };

  const onBtSortOff = () => {
    columnApi.applyColumnState({
      defaultState: { sort: null }
    });
  };

  const onBtWidthNarrow = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'age', width: 100 },
        { colId: 'athlete', width: 100 }
      ]
    });
  };

  const onBtWidthNormal = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'age', width: 200 },
        { colId: 'athlete', width: 200 }
      ]
    });
  };

  const onBtHide = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'age', hide: true },
        { colId: 'athlete', hide: true }
      ]
    });
  };

  const onBtShow = () => {
    columnApi.applyColumnState({
      defaultState: { hide: false }
    });
  };

  const onBtPivotOn = () => {
    columnApi.setPivotMode(true);
    columnApi.applyColumnState({
      state: [{ colId: 'country', pivot: true }]
    });
  };

  const onBtPivotOff = () => {
    columnApi.setPivotMode(false);
    columnApi.applyColumnState({
      defaultState: { pivot: false }
    });
  };

  const onBtRowGroupOn = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'sport', rowGroup: true }]
    });
  };

  const onBtRowGroupOff = () => {
    columnApi.applyColumnState({
      defaultState: { rowGroup: false }
    });
  };

  const onBtAggFuncOn = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'gold', aggFunc: 'sum' },
        { colId: 'silver', aggFunc: 'sum' },
        { colId: 'bronze', aggFunc: 'sum' }
      ]
    });
  };

  const onBtAggFuncOff = () => {
    columnApi.applyColumnState({
      defaultState: { aggFunc: null }
    });
  };

  const onBtNormalOrder = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' }
      ],
      applyOrder: true
    });
  };

  const onBtReverseOrder = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'bronze' },
        { colId: 'silver' },
        { colId: 'gold' }
      ],
      applyOrder: true
    });
  };

  const onBtPinnedOn = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'athlete', pinned: 'left' },
        { colId: 'age', pinned: 'right' }
      ]
    });
  };

  const onBtPinnedOff = () => {
    columnApi.applyColumnState({
      defaultState: { pinned: null }
    });
  };
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
    <button on:click={onBtReverseOrder}>Reverse Medal Order</button>
    <button on:click={onBtNormalOrder}>Normal Medal Order</button>
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
    <button on:click={onBtPivotOn}>Pivot On</button>
    <button on:click={onBtPivotOff}>Pivot Off</button>
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
    {onGridReady}
    {onSortChanged}
    {onColumnResized}
    {onColumnVisible}
    {onColumnPivotChanged}
    {onColumnRowGroupChanged}
    {onColumnValueChanged}
    {onColumnMoved}
    {onColumnPinned}
    bind:columnApi
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
