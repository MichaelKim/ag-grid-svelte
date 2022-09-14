<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    { field: 'athlete', hide: true },
    { field: 'age' },
    { field: 'country', rowGroup: true },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { sortable: true };

  const autoGroupColumnDef: ColDef<IOlympicData> = {
    comparator: (valueA, valueB, nodeA, nodeB, isDescending) =>
      valueA == valueB ? 0 : valueA > valueB ? 1 : -1,
    field: 'athlete',
    sort: 'asc'
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Custom Sorting Groups</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {autoGroupColumnDef} {onGridReady} />
</div>
