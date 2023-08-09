<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    { field: 'athlete', sortingOrder: ['asc', 'desc'] },
    { field: 'age', width: 90, sortingOrder: ['desc', 'asc'] },
    { field: 'country', sortingOrder: ['desc', null] },
    { field: 'year', width: 90, sortingOrder: ['asc'] },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { width: 170, sortable: true };

  const sortingOrder: ('asc' | 'desc' | null)[] = ['desc', 'asc', null];

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Sorting Order and Animation</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} animateRows {sortingOrder} {onGridReady} />
</div>
