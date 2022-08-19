<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true
  };

  const sideBar = {
    toolPanels: ['columns']
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;

  const onBtSortAthlete = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'athlete', sort: 'asc' }]
    });
  };

  const onBtSortCountryThenSportClearOthers = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'country', sort: 'asc', sortIndex: 0 },
        { colId: 'sport', sort: 'asc', sortIndex: 1 }
      ],
      defaultState: { sort: null }
    });
  };

  const onBtClearAllSorting = () => {
    columnApi.applyColumnState({
      defaultState: { sort: null }
    });
  };

  const onBtRowGroupCountryThenSport = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroupIndex: 0 },
        { colId: 'sport', rowGroupIndex: 1 }
      ],
      defaultState: { rowGroup: false }
    });
  };

  const onBtRemoveCountryRowGroup = () => {
    columnApi.applyColumnState({
      state: [{ colId: 'country', rowGroup: false }]
    });
  };

  const onBtClearAllRowGroups = () => {
    columnApi.applyColumnState({
      defaultState: { rowGroup: false }
    });
  };

  const onBtOrderColsMedalsFirst = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
        { colId: 'total' },
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'year' },
        { colId: 'date' }
      ],
      applyOrder: true
    });
  };

  const onBtOrderColsMedalsLast = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'athlete' },
        { colId: 'age' },
        { colId: 'country' },
        { colId: 'sport' },
        { colId: 'year' },
        { colId: 'date' },
        { colId: 'gold' },
        { colId: 'silver' },
        { colId: 'bronze' },
        { colId: 'total' }
      ],
      applyOrder: true
    });
  };

  const onBtHideMedals = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'gold', hide: true },
        { colId: 'silver', hide: true },
        { colId: 'bronze', hide: true },
        { colId: 'total', hide: true }
      ]
    });
  };

  const onBtShowMedals = () => {
    columnApi.applyColumnState({
      state: [
        { colId: 'gold', hide: false },
        { colId: 'silver', hide: false },
        { colId: 'bronze', hide: false },
        { colId: 'total', hide: false }
      ]
    });
  };
</script>

<h2>Apply Partial State</h2>

<table>
  <tbody>
    <tr>
      <td>Sort:</td>
      <td>
        <button on:click={onBtSortAthlete}>Sort Athlete</button>
        <button on:click={onBtSortCountryThenSportClearOthers}>
          Sort Country, then Sport - Clear Others
        </button>
        <button on:click={onBtClearAllSorting}>Clear All Sorting</button>
      </td>
    </tr>
    <tr>
      <td>Column Order:</td>
      <td>
        <button on:click={onBtOrderColsMedalsFirst}>Show Medals First</button>
        <button on:click={onBtOrderColsMedalsLast}>Show Medals Last</button>
      </td>
    </tr>
    <tr>
      <td>Column Visibility:</td>
      <td>
        <button on:click={onBtHideMedals}>Hide Medals</button>
        <button on:click={onBtShowMedals}>Show Medals</button>
      </td>
    </tr>
    <tr>
      <td>Row Group:</td>
      <td>
        <button on:click={onBtRowGroupCountryThenSport}>Group Country then Sport</button>
        <button on:click={onBtRemoveCountryRowGroup}>Remove Country</button>
        <button on:click={onBtClearAllRowGroups}>Clear All Groups</button>
      </td>
    </tr>
  </tbody>
</table>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {sideBar}
    rowGroupPanelShow={'always'}
    pivotPanelShow={'always'}
    {onGridReady}
    bind:columnApi
  />
</div>
