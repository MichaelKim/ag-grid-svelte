<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    {
      headerName: 'Athlete (locked as pinned)',
      field: 'athlete',
      width: 240,
      pinned: 'left',
      lockPinned: true,
      cellClass: 'lock-pinned'
    },
    {
      headerName: 'Age (locked as not pinnable)',
      field: 'age',
      width: 260,
      lockPinned: true,
      cellClass: 'lock-pinned'
    },
    { field: 'country', width: 150 },
    { field: 'year', width: 90 },
    { field: 'date', width: 150 },
    { field: 'sport', width: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { resizable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Lock Pinned</h2>

<div class="legend-bar">
  <span class="legend-box lock-pinned" />
  Locked Column
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

<style>
  .legend-bar {
    margin-bottom: 1rem;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .legend-box {
    border: 1px solid #aaa;
    width: 15px;
    height: 15px;
  }

  div :global(.lock-pinned) {
    background: #ddd;
  }
</style>
