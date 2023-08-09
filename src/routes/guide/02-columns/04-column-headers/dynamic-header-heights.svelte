<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi, GridApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
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
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'silver',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'bronze',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum'
        },
        {
          field: 'total',
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
    resizable: true,
    floatingFilter: true,
    width: 120
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }

  let columnApi: ColumnApi;
  let api: GridApi<IOlympicData>;

  let pivotStatus = false;
  let headerHeight: number | undefined;
  let groupHeaderHeight: number | undefined;
  let floatingFiltersHeight: number | undefined;
  let pivotGroupHeaderHeight: number | undefined;
  let pivotHeaderHeight: number | undefined;

  const setPivotOn = () => {
    columnApi.setPivotMode(true);
    pivotStatus = true;
  };

  const setPivotOff = () => {
    columnApi.setPivotMode(false);
    pivotStatus = false;
  };

  const setHeaderHeight = (value?: number) => {
    api.setHeaderHeight(value);
    headerHeight = value;
  };

  const setGroupHeaderHeight = (value?: number) => {
    api.setGroupHeaderHeight(value);
    groupHeaderHeight = value;
  };

  const setFloatingFiltersHeight = (value?: number) => {
    api.setFloatingFiltersHeight(value);
    floatingFiltersHeight = value;
  };

  const setPivotGroupHeaderHeight = (value?: number) => {
    api.setPivotGroupHeaderHeight(value);
    pivotGroupHeaderHeight = value;
  };

  const setPivotHeaderHeight = (value?: number) => {
    api.setPivotHeaderHeight(value);
    pivotHeaderHeight = value;
  };
</script>

<h2>Dynamic Header Heights</h2>
<table>
  <tbody>
    <tr>
      <td>pivot ({pivotStatus ? 'on' : 'off'})</td>
      <td>
        <button on:click={setPivotOn}>on</button>
        <button on:click={setPivotOff}>off</button>
      </td>
    </tr>
    <tr>
      <td>groupHeaderHeight ({groupHeaderHeight})</td>
      <td>
        <button on:click={() => setGroupHeaderHeight(40)}>40px</button>
        <button on:click={() => setGroupHeaderHeight(60)}>60px</button>
        <button on:click={() => setGroupHeaderHeight(undefined)}>undefined</button>
      </td>
      <td>headerHeight ({headerHeight})</td>
      <td>
        <button on:click={() => setHeaderHeight(70)}>70px</button>
        <button on:click={() => setHeaderHeight(80)}>80px</button>
        <button on:click={() => setHeaderHeight(undefined)}>undefined</button>
      </td>
    </tr>
    <tr>
      {#if pivotStatus}
        <td>pivotGroupHeaderHeight ({pivotGroupHeaderHeight})</td>
        <td>
          <button on:click={() => setPivotGroupHeaderHeight(50)}>50px</button>
          <button on:click={() => setPivotGroupHeaderHeight(70)}>70px</button>
          <button on:click={() => setPivotGroupHeaderHeight(undefined)}>undefined</button>
        </td>
        <td>pivotHeaderHeight ({pivotHeaderHeight})</td>
        <td>
          <button on:click={() => setPivotHeaderHeight(60)}>60px</button>
          <button on:click={() => setPivotHeaderHeight(80)}>80px</button>
          <button on:click={() => setPivotHeaderHeight(undefined)}>undefined</button>
        </td>
      {:else}
        <td>floatingFiltersHeight ({floatingFiltersHeight})</td>
        <td>
          <button on:click={() => setFloatingFiltersHeight(35)}>35px</button>
          <button on:click={() => setFloatingFiltersHeight(55)}>55px</button>
          <button on:click={() => setFloatingFiltersHeight(undefined)}>undefined</button>
        </td>
      {/if}
    </tr>
  </tbody>
</table>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte bind:api bind:columnApi {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
