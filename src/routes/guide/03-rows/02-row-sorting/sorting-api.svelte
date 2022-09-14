<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColumnApi, ColumnState } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age', width: 90 },
    { field: 'country' },
    { field: 'year', width: 90 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { sortable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;
  let savedSort: ColumnState[];
  const sortByAthleteAsc = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'athlete', sort: 'asc' }],
      defaultState: { sort: null }
    });
  };

  const sortByAthleteDesc = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'athlete', sort: 'desc' }],
      defaultState: { sort: null }
    });
  };

  const sortByCountryThenSport = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'country', sort: 'asc', sortIndex: 0 },
        { colId: 'sport', sort: 'asc', sortIndex: 1 }
      ],
      defaultState: { sort: null }
    });
  };

  const sortBySportThenCountry = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'country', sort: 'asc', sortIndex: 1 },
        { colId: 'sport', sort: 'asc', sortIndex: 0 }
      ],
      defaultState: { sort: null }
    });
  };

  const clearSort = () => {
    columnApi.applyColumnState({ defaultState: { sort: null } });
  };

  const saveSort = () => {
    const colState = columnApi.getColumnState();
    const sortState = colState
      .filter((s) => s.sort != null)
      .map((s) => ({ colId: s.colId, sort: s.sort, sortIndex: s.sortIndex }));
    savedSort = sortState;
    console.log('saved sort', sortState);
  };

  const restoreFromSave = () => {
    columnApi.applyColumnState({
      state: savedSort,
      defaultState: { sort: null }
    });
  };
</script>

<h2>Sorting API</h2>

<div style:margin-bottom="1rem">
  <div>
    <button on:click={sortByAthleteAsc}>Athlete Ascending</button>
    <button on:click={sortByAthleteDesc}>Athlete Descending</button>
    <button on:click={sortByCountryThenSport}>Country, then Sport</button>
    <button on:click={sortBySportThenCountry}>Sport, then Country</button>
  </div>
  <div style:margin-top="0.25rem">
    <button on:click={clearSort}>Clear Sort</button>
    <button on:click={saveSort}>Save Sort</button>
    <button on:click={restoreFromSave}>Restore from Save</button>
  </div>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} bind:columnApi />
</div>
