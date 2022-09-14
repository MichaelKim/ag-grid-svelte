<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age', width: 100 },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { width: 170, sortable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady(params: GridReadyEvent) {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));

    const defaultSortModel: ColumnState[] = [
      { colId: 'country', sort: 'asc', sortIndex: 0 },
      { colId: 'athlete', sort: 'asc', sortIndex: 1 }
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }
</script>

<h2>Multi Column Sort</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} multiSortKey="ctrl" {onGridReady} />
</div>
