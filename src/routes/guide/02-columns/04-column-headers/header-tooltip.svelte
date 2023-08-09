<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';
  import type { ColDef } from 'ag-grid-community';

  const columnDefs: ColDef<IOlympicData>[] = [
    { field: 'athlete', headerTooltip: "The athlete's name" },
    { field: 'age', headerTooltip: 'The athlete`s age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date', headerTooltip: 'The date of the Olympics' },
    { field: 'sport', headerTooltip: 'The sport the medal was for' },
    { field: 'gold', headerTooltip: 'How many gold medals' },
    { field: 'silver', headerTooltip: 'How many silver medals' },
    { field: 'bronze', headerTooltip: 'How many bronze medals' },
    { field: 'total', headerTooltip: 'The total number of medals' }
  ];

  const defaultColDef = {
    width: 150
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Header Tooltip</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} tooltipShowDelay={500} {onGridReady} />
</div>
