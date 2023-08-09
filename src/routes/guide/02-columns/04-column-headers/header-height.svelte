<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 150,
          suppressSizeToFit: true,
          enableRowGroup: true,
          rowGroupIndex: 0
        },
        {
          field: 'age',
          width: 90,
          minWidth: 75,
          maxWidth: 100,
          enableRowGroup: true
        },
        {
          field: 'country',
          width: 120,
          enableRowGroup: true
        },
        {
          field: 'year',
          width: 90,
          enableRowGroup: true,
          pivotIndex: 0
        },
        { field: 'sport', width: 110, enableRowGroup: true },
        {
          field: 'gold',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'silver',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'bronze',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'total',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        }
      ]
    }
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Header Height and Text Orientation</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    groupHeaderHeight={75}
    headerHeight={150}
    floatingFiltersHeight={50}
    pivotGroupHeaderHeight={50}
    pivotHeaderHeight={100}
    {onGridReady}
  />
</div>

<style lang="scss">
  .ag-theme-alpine {
    :global(.ag-cell-label-container) {
      /*Necessary to allow for text to grow vertically*/
      height: 100%;
    }

    :global(.ag-header-cell-label) {
      /*Necessary to allow for text to grow vertically*/
      height: 100%;
      padding: 0 !important;
    }

    :global(.ag-header-cell-label .ag-header-cell-text) {
      /*Force the width corresponding at how much width
    we need once the text is laid out vertically*/
      width: 55px;
      writing-mode: vertical-lr;
      -ms-writing-mode: tb-lr;
      line-height: 2em;
      margin-top: 60px;
    }

    :global(.ag-pivot-off .ag-header-group-cell) {
      font-size: 50px;
    }

    :global(.ag-pivot-on .ag-header-group-cell) {
      font-size: 10px;
      color: green;
    }

    :global(.ag-pivot-off .ag-header-cell-label) {
      color: #8a6d3b;
    }

    :global(.ag-pivot-on .ag-header-cell-label) {
      font-size: 10px;
      height: 90px;
      padding-top: 36px;
      margin-left: 0px;
      color: #1b6d85;
      font-weight: bold;
    }

    :global(.ag-pivot-on .ag-header-cell-label .ag-header-cell-text) {
      /*There is empty space left at the top from the menu and sort
    icons not used*/
      margin-top: 25px;
    }

    /*Floating filters*/
    :global(.ag-floating-filter-body) {
      height: 50px;
    }

    :global(.ag-floating-filter-body input) {
      height: 49px;
    }

    :global(.ag-floating-filter-button) {
      margin-top: -49px;
    }

    :global(.ag-floating-filter-button button) {
      height: 49px;
    }

    :global(.ag-floating-filter-body input) {
      font-size: 15px;
      font-weight: bold;
    }
  }
</style>
