<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi, GridApi } from 'ag-grid-community';
  import type { IOlympicData } from '../../types';

  function setIdText(id: string, value: string | number | undefined) {
    document.getElementById(id)!.innerHTML = value == undefined ? 'undefined' : value + '';
  }

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
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;
  let api: GridApi<IOlympicData>;

  const setPivotOn = () => {
    document.querySelector('#requiresPivot')!.className = '';
    document.querySelector('#requiresNotPivot')!.className = 'hidden';
    columnApi.setPivotMode(true);
    setIdText('pivot', 'on');
  };

  const setPivotOff = () => {
    document.querySelector('#requiresPivot')!.className = 'hidden';
    document.querySelector('#requiresNotPivot')!.className = '';
    columnApi.setPivotMode(false);
    setIdText('pivot', 'off');
  };

  const setHeaderHeight = (value?: number) => {
    api.setHeaderHeight(value);
    setIdText('headerHeight', value);
  };

  const setGroupHeaderHeight = (value?: number) => {
    api.setGroupHeaderHeight(value);
    setIdText('groupHeaderHeight', value);
  };

  const setFloatingFiltersHeight = (value?: number) => {
    api.setFloatingFiltersHeight(value);
    setIdText('floatingFiltersHeight', value);
  };

  const setPivotGroupHeaderHeight = (value?: number) => {
    api.setPivotGroupHeaderHeight(value);
    setIdText('pivotGroupHeaderHeight', value);
  };

  const setPivotHeaderHeight = (value?: number) => {
    api.setPivotHeaderHeight(value);
    setIdText('pivotHeaderHeight', value);
  };
</script>

<h2>Dynamic Header Heights</h2>
<table>
  <tbody>
    <tr>
      <td>
        pivot (
        <span id="pivot">off</span>
        )
      </td>
      <td>
        <button on:click={setPivotOn}>on</button>
        <button on:click={setPivotOff}>off</button>
      </td>
    </tr>
    <tr>
      <td>
        groupHeaderHeight (
        <span id="groupHeaderHeight">undefined</span>
        )
      </td>
      <td>
        <button on:click={() => setGroupHeaderHeight(40)}>40px</button>
        <button on:click={() => setGroupHeaderHeight(60)}>60px</button>
        <button on:click={() => setGroupHeaderHeight(undefined)}>undefined</button>
      </td>
      <td>
        headerHeight (
        <span id="headerHeight">undefined</span>
        )
      </td>
      <td>
        <button on:click={() => setHeaderHeight(70)}>70px</button>
        <button on:click={() => setHeaderHeight(80)}>80px</button>
        <button on:click={() => setHeaderHeight(undefined)}>undefined</button>
      </td>
    </tr>
    <tr id="requiresPivot" class="hidden">
      <td>
        {' '}
        pivotGroupHeaderHeight (
        <span id="pivotGroupHeaderHeight">undefined</span>
        )
      </td>
      <td>
        <button on:click={() => setPivotGroupHeaderHeight(50)}>50px</button>
        <button on:click={() => setPivotGroupHeaderHeight(70)}>70px</button>
        <button on:click={() => setPivotGroupHeaderHeight(undefined)}>undefined</button>
      </td>
      <td>
        pivotHeaderHeight (
        <span id="pivotHeaderHeight">undefined</span>
        )
      </td>
      <td>
        <button on:click={() => setPivotHeaderHeight(60)}>60px</button>
        <button on:click={() => setPivotHeaderHeight(80)}>80px</button>
        <button on:click={() => setPivotHeaderHeight(undefined)}>undefined</button>
      </td>
    </tr>
    <tr id="requiresNotPivot">
      <td>
        floatingFiltersHeight (
        <span id="floatingFiltersHeight">undefined</span>
        )
      </td>
      <td>
        <button on:click={() => setFloatingFiltersHeight(35)}>35px</button>
        <button on:click={() => setFloatingFiltersHeight(55)}>55px</button>
        <button on:click={() => setFloatingFiltersHeight(undefined)}>undefined</button>
      </td>
    </tr>
  </tbody>
</table>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte bind:api bind:columnApi {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
