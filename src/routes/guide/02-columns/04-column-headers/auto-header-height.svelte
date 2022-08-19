<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    { field: 'athlete', headerName: 'The full Name of the athlete' },
    {
      field: 'age',
      headerName: 'The number of Years since the athlete was born',
      initialWidth: 120
    },
    { field: 'country', headerName: 'The Country the athlete was born in' },
    { field: 'sport', headerName: 'The Sport the athlete participated in' },
    {
      field: 'total',
      headerName: 'The Total number of medals won by the athlete'
    }
  ];

  const defaultColDef = {
    resizable: true,
    initialWidth: 200,
    wrapHeaderText: true,
    autoHeaderHeight: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Auto Header Height</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
