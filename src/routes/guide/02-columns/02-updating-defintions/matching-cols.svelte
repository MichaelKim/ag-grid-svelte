<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ValueGetterParams } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const athleteColumn = {
    headerName: 'Athlete',
    valueGetter: (params: ValueGetterParams<IOlympicData>) => {
      return params.data?.athlete;
    }
  };

  function getColDefsMedalsIncluded() {
    return [
      athleteColumn,
      {
        colId: 'myAgeCol',
        headerName: 'Age',
        valueGetter(params: ValueGetterParams<IOlympicData>) {
          return params.data?.age;
        }
      },
      {
        headerName: 'Country',
        headerClass: 'country-header',
        valueGetter(params: ValueGetterParams<IOlympicData>) {
          return params.data?.country;
        }
      },
      { field: 'sport' },
      { field: 'year' },
      { field: 'date' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' }
    ];
  }

  function getColDefsMedalsExcluded() {
    return [
      athleteColumn,
      {
        colId: 'myAgeCol',
        headerName: 'Age',
        valueGetter(params: ValueGetterParams<IOlympicData>) {
          return params.data?.age;
        }
      },
      {
        headerName: 'Country',
        headerClass: 'country-header',
        valueGetter(params: ValueGetterParams<IOlympicData>) {
          return params.data?.country;
        }
      },
      { field: 'sport' },
      { field: 'year' },
      { field: 'date' }
    ];
  }

  const defaultColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnDefs = getColDefsMedalsIncluded();
  function onBtIncludeMedalColumns() {
    columnDefs = getColDefsMedalsIncluded();
  }
  function onBtExcludeMedalColumns() {
    columnDefs = getColDefsMedalsExcluded();
  }
</script>

<h2>Matching Columns</h2>
<div>
  <button on:click={onBtIncludeMedalColumns}>Include Medal Columns</button>
  <button on:click={onBtExcludeMedalColumns}>Exclude Medal Columns</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
