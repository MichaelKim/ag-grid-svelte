<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColumnApi, ColumnPinnedEvent, ColumnState } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';
  import ControlsCellRenderer from './ControlsCellRenderer.svelte';

  const columnDefs: ColDef[] = [
    {
      lockPosition: 'left',
      valueGetter: 'node.rowIndex',
      cellClass: 'locked-col',
      width: 60,
      suppressNavigable: true
    },
    {
      lockPosition: 'left',
      cellRenderer: ControlsCellRenderer,
      cellClass: 'locked-col',
      width: 120,
      suppressNavigable: true
    },
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
  const defaultColDef: ColDef = {
    width: 150,
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;

  const onColumnPinned = (event: ColumnPinnedEvent) => {
    const allCols = event.columnApi.getAllGridColumns();
    const allFixedCols = allCols.filter((col) => col.getColDef().lockPosition);
    const allNonFixedCols = allCols.filter((col) => !col.getColDef().lockPosition);
    const pinnedCount = allNonFixedCols.filter((col) => col.getPinned() === 'left').length;
    const pinFixed = pinnedCount > 0;
    const columnStates: ColumnState[] = [];
    allFixedCols.forEach((col) => {
      if (pinFixed !== col.isPinned()) {
        columnStates.push({
          colId: col.getId(),
          pinned: pinFixed ? 'left' : null
        });
      }
    });
    if (columnStates.length > 0) {
      event.columnApi.applyColumnState({ state: columnStates });
    }
  };

  const onPinAthlete = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: 'left' }]
    });
  };

  const onUnpinAthlete = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: null }]
    });
  };
</script>

<h2>Advanced Lock</h2>

<div class="legend-bar">
  <button on:click={onPinAthlete}>Pin Athlete</button>
  <button on:click={onUnpinAthlete}>Un-Pin Athlete</button>
  <span class="locked-col legend-box" />
  Position Locked Column
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    suppressDragLeaveHidesColumns
    {onGridReady}
    {onColumnPinned}
    bind:columnApi
  />
</div>

<style>
  div :global(.locked-col) {
    background: #ddd;
    border: 1px solid #aaa;
  }

  .legend-bar {
    margin-bottom: 1rem;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .legend-box {
    width: 15px;
    height: 15px;
    margin-left: 16px;
  }
</style>
