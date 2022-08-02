<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColGroupDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../types';

  function createColSetA(): ColGroupDef[] {
    return [
      {
        headerName: 'Group A',
        groupId: 'groupA',
        children: [
          { field: 'athlete' },
          { field: 'age' },
          { field: 'country', columnGroupShow: 'open' }
        ]
      },
      {
        headerName: 'Group B',
        children: [
          { field: 'sport' },
          { field: 'year' },
          { field: 'date', columnGroupShow: 'open' }
        ]
      },
      {
        headerName: 'Group C',
        groupId: 'groupC',
        children: [
          { field: 'total' },
          { field: 'gold', columnGroupShow: 'open' },
          { field: 'silver', columnGroupShow: 'open' },
          { field: 'bronze', columnGroupShow: 'open' }
        ]
      }
    ];
  }

  function createColSetB(): ColGroupDef[] {
    return [
      {
        headerName: 'GROUP A',
        groupId: 'groupA',
        children: [
          { field: 'athlete' },
          { field: 'age' },
          { field: 'country', columnGroupShow: 'open' }
        ]
      },
      {
        headerName: 'Group B',
        children: [
          { field: 'sport' },
          { field: 'year' },
          { field: 'date', columnGroupShow: 'open' }
        ]
      },
      {
        headerName: 'Group C',
        groupId: 'groupC',
        children: [
          { field: 'total' },
          { field: 'gold', columnGroupShow: 'open' },
          { field: 'silver', columnGroupShow: 'open' },
          { field: 'bronze', columnGroupShow: 'open' },
          { field: 'extraA' },
          { field: 'extraB', columnGroupShow: 'open' }
        ]
      }
    ];
  }

  const defaultColDef: ColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true
  };

  let columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Group A',
      groupId: 'groupA',
      children: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country', columnGroupShow: 'open' }
      ]
    },
    {
      headerName: 'Group B',
      children: [{ field: 'sport' }, { field: 'year' }, { field: 'date', columnGroupShow: 'open' }]
    },
    {
      headerName: 'Group C',
      groupId: 'groupC',
      children: [
        { field: 'total' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' }
      ]
    }
  ];

  function onBtSetA() {
    columnDefs = createColSetA();
  }

  function onBtSetB() {
    columnDefs = createColSetB();
  }

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Column Groups</h2>
<div>
  <button on:click={onBtSetA}>First Column Set</button>
  <button on:click={onBtSetB}>Second Column Set</button>
</div>

<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
