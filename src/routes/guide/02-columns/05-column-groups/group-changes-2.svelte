<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  function createNormalColDefs() {
    return [
      {
        headerName: 'Athlete Details',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'country', colId: 'country' }
        ]
      },
      { field: 'age', colId: 'age' },
      {
        headerName: 'Sports Results',
        headerClass: 'medals-group',
        children: [
          { field: 'sport', colId: 'sport' },
          { field: 'gold', colId: 'gold' }
        ]
      }
    ];
  }

  function createExtraColDefs() {
    return [
      {
        headerName: 'Athlete Details',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'country', colId: 'country' },
          { field: 'region1', colId: 'region1' },
          { field: 'region2', colId: 'region2' }
        ]
      },
      { field: 'age', colId: 'age' },
      { field: 'distance', colId: 'distance' },
      {
        headerName: 'Sports Results',
        headerClass: 'medals-group',
        children: [
          { field: 'sport', colId: 'sport' },
          { field: 'gold', colId: 'gold' }
        ]
      }
    ];
  }

  const columnDefs = createNormalColDefs();

  const defaultColDef = {
    resizable: true,
    width: 150
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let api: GridApi<IOlympicData>;
  const onBtNormalCols = () => {
    api.setColumnDefs(createNormalColDefs());
  };

  const onBtExtraCols = () => {
    api.setColumnDefs(createExtraColDefs());
  };
</script>

<h2>Group Changes 2</h2>
<div>
  <button on:click={onBtNormalCols}>Normal Cols</button>
  <button on:click={onBtExtraCols}>Extra Cols</button>
</div>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {defaultColDef} {columnDefs} {onGridReady} bind:api />
</div>

<style>
  .ag-theme-alpine :global(.participant-group) {
    background-color: #00e7b1 !important;
  }

  .ag-theme-alpine :global(.medals-group) {
    background-color: #5b9bd5 !important;
  }
</style>
