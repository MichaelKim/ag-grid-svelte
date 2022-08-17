<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi, ColumnState } from 'ag-grid-community';
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
    width: 100,
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

  let sortState: ColumnState[];
  let orderAndVisibilityState: ColumnState[];
  let columnApi: ColumnApi;

  const onBtSaveSortState = () => {
    const allState = columnApi.getColumnState();
    sortState = allState.map((state) => ({
      colId: state.colId,
      sort: state.sort,
      sortIndex: state.sortIndex
    }));
    console.log('sort state saved', sortState);
  };

  const onBtRestoreSortState = () => {
    if (!sortState) {
      console.log('no sort state to restore, you must save sort state first');
      return;
    }
    columnApi.applyColumnState({
      state: sortState
    });
    console.log('sort state restored');
  };

  const onBtSaveOrderAndVisibilityState = () => {
    const allState = columnApi.getColumnState();
    orderAndVisibilityState = allState.map((state) => ({
      colId: state.colId,
      hide: state.hide
    }));
    console.log('order and visibility state saved', orderAndVisibilityState);
  };

  const onBtRestoreOrderAndVisibilityState = () => {
    if (!orderAndVisibilityState) {
      console.log(
        'no order and visibility state to restore by, you must save order and visibility state first'
      );
      return;
    }
    columnApi.applyColumnState({
      state: orderAndVisibilityState,
      applyOrder: true
    });
    console.log('column state restored');
  };
</script>

<h2>Saving Partial State</h2>
<div style:display="flex" style:gap="20px">
  <div>
    <button on:click={onBtSaveSortState}>Save Sort</button>
    <button on:click={onBtRestoreSortState}>Restore Sort</button>
  </div>
  <div>
    <button on:click={onBtSaveOrderAndVisibilityState}>Save Order & Visibility</button>
    <button on:click={onBtRestoreOrderAndVisibilityState}>Restore Order & Visibility</button>
  </div>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {sideBar}
    rowGroupPanelShow="always"
    pivotPanelShow="always"
    {onGridReady}
    bind:columnApi
  />
</div>
