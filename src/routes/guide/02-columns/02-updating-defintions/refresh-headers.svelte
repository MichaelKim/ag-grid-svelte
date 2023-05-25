<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import CustomHeader from './CustomHeader.svelte';
  import type { IOlympicData } from '../../types';

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  const defaultColDef = {
    headerComponent: CustomHeader
  };

  function getColumnDefs(): ColDef[] {
    return [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' }
    ];
  }

  let columnDefs = getColumnDefs();

  function onBtUpperNames() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.headerName = c.field?.toUpperCase();
    });
    columnDefs = newDefs;
  }

  function onBtLowerNames() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.headerName = c.field;
    });
    columnDefs = newDefs;
  }

  function onBtFilterOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.filter = true;
    });
    columnDefs = newDefs;
  }

  function onBtFilterOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.filter = false;
    });
    columnDefs = newDefs;
  }

  function onBtResizeOn() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.resizable = true;
    });
    columnDefs = newDefs;
  }

  function onBtResizeOff() {
    const newDefs = getColumnDefs();
    newDefs.forEach((c) => {
      c.resizable = false;
    });
    columnDefs = newDefs;
  }
</script>

<h2>Refresh Headers</h2>

<div class="buttons">
  <div>
    <button on:click={onBtUpperNames}>Upper Header Names</button>
    <button on:click={onBtLowerNames}>Lower Lower Names</button>
  </div>
  <div>
    <button on:click={onBtFilterOn}>Filter On</button>
    <button on:click={onBtFilterOff}>Filter Off</button>
  </div>
  <div>
    <button on:click={onBtResizeOn}>Resize On</button>
    <button on:click={onBtResizeOff}>Resize Off</button>
  </div>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

<style>
  .buttons {
    display: flex;
    gap: 4px;
  }
  .buttons > div {
    display: flex;
    flex-direction: column;
  }
</style>
