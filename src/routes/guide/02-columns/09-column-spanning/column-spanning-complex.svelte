<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type {
    CellClassRules,
    ColDef,
    ColSpanParams,
    GridReadyEvent,
    RowHeightParams
  } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  const rowData = [
    { section: 'big-title', jan: 'Warehouse 1' },
    { section: 'quarters', jan: 'Q1', apr: 'Q2' },
    { jan: 534, feb: 612, mar: 243, apr: 231, may: 428, jun: 231 },
    { jan: 765, feb: 146, mar: 243, apr: 231, may: 428, jun: 231 },
    { jan: 335, feb: 122, mar: 243, apr: 231, may: 428, jun: 231 },
    { jan: 35, feb: 342, mar: 243, apr: 231, may: 428, jun: 231 },
    { jan: 568, feb: 531, mar: 243, apr: 231, may: 428, jun: 231 },
    { jan: 365, feb: 361, mar: 243, apr: 231, may: 428, jun: 231 },
    { section: 'big-title', jan: 'Warehouse 2' },
    { section: 'quarters', jan: 'Q1', apr: 'Q2' },
    { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
    { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
    { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
    { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
    { jan: 2, feb: 32, mar: 24, apr: 31, may: 48, jun: 21 },
    { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 }
  ];

  const cellClassRules: CellClassRules = {
    'header-cell': 'data.section === "big-title"',
    'quarters-cell': 'data.section === "quarters"'
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Jan',
      field: 'jan',
      colSpan: (params: ColSpanParams) => {
        if (isHeaderRow(params)) {
          return 6;
        } else if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules
    },
    { headerName: 'Feb', field: 'feb' },
    { headerName: 'Mar', field: 'mar' },
    {
      headerName: 'Apr',
      field: 'apr',
      colSpan: (params: ColSpanParams) => {
        if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules
    },
    { headerName: 'May', field: 'may' },
    { headerName: 'Jun', field: 'jun' }
  ];

  const defaultColDef: ColDef = { width: 100 };

  function onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  const getRowHeight = (params: RowHeightParams) => {
    if (isHeaderRow(params)) return 60;
  };

  function isHeaderRow(params: RowHeightParams | ColSpanParams) {
    return params.data.section === 'big-title';
  }

  function isQuarterRow(params: ColSpanParams) {
    return params.data.section === 'quarters';
  }
</script>

<h2>Column Spanning Complex</h2>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {getRowHeight} {defaultColDef} {onGridReady} />
</div>

<style>
  .ag-theme-alpine :global(.header-cell) {
    background-color: #a6e1ec;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }

  .ag-theme-alpine :global(.quarters-cell) {
    background-color: #5bc0de;
    font-weight: bold;
  }
</style>
