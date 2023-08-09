<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColumnApi } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-enterprise';
  import type { IOlympicData } from '../../types';

  const columnDefs = [
    {
      headerName: 'Athlete',
      children: [
        { field: 'athlete' },
        { field: 'country', columnGroupShow: 'open' },
        { field: 'sport', columnGroupShow: 'open' },
        { field: 'year', columnGroupShow: 'open' },
        { field: 'date', columnGroupShow: 'open' }
      ]
    },
    {
      headerName: 'Medals',
      children: [
        { field: 'total', columnGroupShow: 'closed' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' }
      ]
    }
  ];
  const defaultColDef = {
    width: 150,
    resizable: true
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }

  let columnApi: ColumnApi;
  let groupState: { groupId: string; open: boolean }[];

  const saveState = () => {
    groupState = columnApi.getColumnGroupState();
    console.log('group state saved', groupState);
    console.log('column state saved');
  };

  const restoreState = () => {
    if (!groupState) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }
    columnApi.setColumnGroupState(groupState);
    console.log('column state restored');
  };

  const resetState = () => {
    columnApi.resetColumnGroupState();
    console.log('column state reset');
  };
</script>

<h2>Column Group State</h2>

<div>
  <button on:click={saveState}>Save State</button>
  <button on:click={restoreState}>Restore State</button>
  <button on:click={resetState}>Reset State</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} bind:columnApi />
</div>
