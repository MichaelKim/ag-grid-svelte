<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const colDefsMedalsIncluded = [
    { field: 'athlete', headerName: 'A Athlete' },
    { field: 'age', headerName: 'A Age' },
    { field: 'country', headerName: 'A Country' },
    { field: 'sport', headerName: 'A Sport' },
    { field: 'year', headerName: 'A Year' },
    { field: 'date', headerName: 'A Date' },
    { field: 'gold', headerName: 'A Gold' },
    { field: 'silver', headerName: 'A Silver' },
    { field: 'bronze', headerName: 'A Bronze' },
    { field: 'total', headerName: 'A Total' }
  ];

  const colDefsMedalsExcluded = [
    { field: 'gold', headerName: 'B Gold' },
    { field: 'silver', headerName: 'B Silver' },
    { field: 'bronze', headerName: 'B Bronze' },
    { field: 'total', headerName: 'B Total' },
    { field: 'athlete', headerName: 'B Athlete' },
    { field: 'age', headerName: 'B Age' },
    { field: 'country', headerName: 'B Country' },
    { field: 'sport', headerName: 'B Sport' },
    { field: 'year', headerName: 'B Year' },
    { field: 'date', headerName: 'B Date' }
  ];

  const defaultColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
    filter: true
  };

  let columnDefs = colDefsMedalsIncluded;

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let maintainColumnOrder = true;
  const setColsA = () => (columnDefs = colDefsMedalsIncluded);
  const setColsB = () => (columnDefs = colDefsMedalsExcluded);
  const clearColDefs = () => (columnDefs = []);
  const toggleMaintain = () => (maintainColumnOrder = !maintainColumnOrder);
</script>

<div>
  <button on:click={setColsA}>Column Set A</button>
  <button on:click={setColsB}>Column Set B</button>
  <button on:click={clearColDefs}>Clear</button>
  <button on:click={toggleMaintain}>{maintainColumnOrder ? 'Disable' : 'Enable'} Maintain</button>
</div>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {maintainColumnOrder} {onGridReady} />
</div>
