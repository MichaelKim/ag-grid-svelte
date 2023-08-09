<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    {
      headerName: 'Everything Resizes',
      children: [
        {
          field: 'athlete',
          headerClass: 'resizable-header'
        },
        { field: 'age', headerClass: 'resizable-header' },
        {
          field: 'country',
          headerClass: 'resizable-header'
        }
      ]
    },
    {
      headerName: 'Only Year Resizes',
      children: [
        { field: 'year', headerClass: 'resizable-header' },
        {
          field: 'date',
          resizable: false,
          headerClass: 'fixed-size-header'
        },
        {
          field: 'sport',
          resizable: false,
          headerClass: 'fixed-size-header'
        }
      ]
    },
    {
      headerName: 'Nothing Resizes',
      children: [
        {
          field: 'gold',
          resizable: false,
          headerClass: 'fixed-size-header'
        },
        {
          field: 'silver',
          resizable: false,
          headerClass: 'fixed-size-header'
        },
        {
          field: 'bronze',
          resizable: false,
          headerClass: 'fixed-size-header'
        },
        {
          field: 'total',
          resizable: false,
          headerClass: 'fixed-size-header'
        }
      ]
    }
  ];

  const defaultColDef = { width: 150, resizable: true };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Resizing Groups</h2>
<div class="legend-bar">
  <div class="legend-item">
    <span class="legend-box resizable-header" />
    Resizable Column
  </div>
  <div class="legend-item">
    <span class="legend-box fixed-size-header" />
    Fixed Width Column
  </div>
</div>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>

<style>
  * :global(.fixed-size-header) {
    background-color: #ffdddd !important;
  }
  * :global(.resizable-header) {
    background-color: #ddffdd !important;
  }
  .legend-bar {
    display: flex;
    gap: 20px;
    margin-bottom: 1rem;
  }
  .legend-item {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .legend-box {
    display: inline-block;
    border: 1px solid #aaa;
    height: 15px;
    width: 15px;
  }
</style>
