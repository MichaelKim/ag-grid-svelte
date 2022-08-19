<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColGroupDef, ColumnApi, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    { field: 'athlete', colId: 'athlete' },
    { field: 'age', colId: 'age' },
    { field: 'country', colId: 'country' },
    { field: 'year', colId: 'year' },
    { field: 'date', colId: 'date' },
    { field: 'total', colId: 'total' },
    { field: 'gold', colId: 'gold' },
    { field: 'silver', colId: 'silver' },
    { field: 'bronze', colId: 'bronze' }
  ];

  const defaultColDef = {
    initialWidth: 150,
    sortable: true,
    resizable: true,
    filter: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let api: GridApi<IOlympicData>;
  let columnApi: ColumnApi;

  const onBtNoGroups = () => {
    const columnDefs: ColDef[] = [
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'year', colId: 'year' },
      { field: 'date', colId: 'date' },
      { field: 'total', colId: 'total' },
      { field: 'gold', colId: 'gold' },
      { field: 'silver', colId: 'silver' },
      { field: 'bronze', colId: 'bronze' }
    ];
    api.setColumnDefs(columnDefs);
  };

  const onMedalsInGroupOnly = () => {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'year', colId: 'year' },
      { field: 'date', colId: 'date' },
      {
        headerName: 'Medals',
        headerClass: 'medals-group',
        children: [
          { field: 'total', colId: 'total' },
          { field: 'gold', colId: 'gold' },
          { field: 'silver', colId: 'silver' },
          { field: 'bronze', colId: 'bronze' }
        ]
      }
    ];
    api.setColumnDefs(columnDefs);
  };

  const onParticipantInGroupOnly = () => {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      {
        headerName: 'Participant',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'age', colId: 'age' },
          { field: 'country', colId: 'country' },
          { field: 'year', colId: 'year' },
          { field: 'date', colId: 'date' }
        ]
      },
      { field: 'total', colId: 'total' },
      { field: 'gold', colId: 'gold' },
      { field: 'silver', colId: 'silver' },
      { field: 'bronze', colId: 'bronze' }
    ];
    api.setColumnDefs(columnDefs);
  };

  const onParticipantAndMedalsInGroups = () => {
    const columnDefs: (ColDef | ColGroupDef)[] = [
      {
        headerName: 'Participant',
        headerClass: 'participant-group',
        children: [
          { field: 'athlete', colId: 'athlete' },
          { field: 'age', colId: 'age' },
          { field: 'country', colId: 'country' },
          { field: 'year', colId: 'year' },
          { field: 'date', colId: 'date' }
        ]
      },
      {
        headerName: 'Medals',
        headerClass: 'medals-group',
        children: [
          { field: 'total', colId: 'total' },
          { field: 'gold', colId: 'gold' },
          { field: 'silver', colId: 'silver' },
          { field: 'bronze', colId: 'bronze' }
        ]
      }
    ];
    api.setColumnDefs(columnDefs);
  };
</script>

<h2>Group Changes</h2>
<div class="root">
  <div class="test-header">
    <label>
      <button on:click={onBtNoGroups}>No Groups</button>
    </label>
    <label>
      <div class="participant-group legend-box" />
      <button on:click={onParticipantInGroupOnly}>Participant in Group</button>
    </label>
    <label>
      <div class="medals-group legend-box" />
      <button on:click={onMedalsInGroupOnly}>Medals in Group</button>
    </label>
    <label>
      <div class="participant-group legend-box" />
      <div class="medals-group legend-box" />
      <button on:click={onParticipantAndMedalsInGroups}>Participant and Medals in Group</button>
    </label>
  </div>
  <div style:height="500px" class="ag-theme-alpine">
    <AgGridSvelte
      {rowData}
      {columnDefs}
      {defaultColDef}
      maintainColumnOrder
      {onGridReady}
      bind:api
      bind:columnApi
    />
  </div>
</div>

<style>
  .test-header {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 13px;
    margin-bottom: 1rem;
  }

  .test-header label {
    margin-left: 10px;
    margin-right: 10px;
  }

  .root :global(.participant-group) {
    background-color: #00e7b1 !important;
  }

  .root :global(.medals-group) {
    background-color: #5b9bd5 !important;
  }

  .legend-box {
    display: inline-block;
    width: 15px;
    height: 15px;
    position: relative;
    top: 3px;
  }
</style>
