<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef<IOlympicData>[] = [
    { field: 'athlete', pinned: 'left' },
    { field: 'age', pinned: 'left' },
    {
      field: 'country',
      colSpan: (params) => {
        const country = params.data?.country;
        if (country === 'Russia') {
          // have all Russia age columns width 2
          return 2;
        } else if (country === 'United States') {
          // have all United States column width 4
          return 4;
        } else {
          // all other rows should be just normal
          return 1;
        }
      }
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { width: 150, resizable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Column Spanning Simple</h2>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

<style>
  .ag-theme-alpine :global(.ag-body-viewport [col-id='country']) {
    background-color: #a6e1ec;
  }
</style>
