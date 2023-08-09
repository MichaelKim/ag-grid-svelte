<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColGroupDef, SideBarDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Athlete',
      children: [
        { field: 'athlete', width: 150 },
        { field: 'age', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'country', width: 150 },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' }
      ]
    },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'silver', lockVisible: true, cellClass: 'locked-visible' },
        { field: 'bronze', lockVisible: true, cellClass: 'locked-visible' },
        {
          field: 'total',
          lockVisible: true,
          cellClass: 'locked-visible',
          hide: true
        }
      ]
    }
  ];

  const sideBar: SideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true
        }
      }
    ]
  };

  const defaultColDef: ColDef = {
    width: 100
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Lock Visible</h2>

<div class="legend-bar">
  <span class="legend-box locked-visible" />
  Locked Visible Column
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {sideBar} {defaultColDef} {onGridReady} />
</div>

<style>
  div :global(.locked-visible) {
    background: #008b8b;
  }

  .legend-box {
    border: 1px solid #aaa;
    width: 15px;
    height: 15px;
  }

  .legend-bar {
    margin-bottom: 1rem;
    display: flex;
    gap: 4px;
    align-items: center;
  }
</style>
