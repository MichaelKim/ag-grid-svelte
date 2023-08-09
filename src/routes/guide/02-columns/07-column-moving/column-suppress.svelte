<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    {
      field: 'athlete',
      suppressMovable: true,
      cellClass: 'suppress-movable-col'
    },
    { field: 'age', lockPosition: 'left', cellClass: 'locked-col' },
    { field: 'country' },
    { field: 'year' },
    { field: 'total', lockPosition: 'right', cellClass: 'locked-col' }
  ];
  const defaultColDef: ColDef = {
    flex: 1,
    lockPinned: true // Dont allow pinning for this example
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Column Suppress & Lock</h2>

<div class="legend-bar">
  <span class="legend-box locked-col" />
  Position Locked Column
  <span class="legend-box suppress-movable-col" style:margin-left="16px" />
  Suppress Movable Column
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    suppressDragLeaveHidesColumns
    {onGridReady}
  />
</div>

<style>
  div :global(.locked-col) {
    background: #ddd;
  }

  div :global(.suppress-movable-col) {
    background: #f5f5dc;
  }

  .legend-box {
    border: 1px solid #aaa;
    width: 15px;
    height: 15px;
  }

  .legend-bar {
    margin-bottom: 1rem;
    display: flex;
    gap: 4px;
    align-items: center;
  }
</style>
