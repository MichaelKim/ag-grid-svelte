<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColGroupDef, ColSpanParams } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import { onDestroy } from 'svelte';

  function colSpan(params: ColSpanParams) {
    return params.data === 2 ? 3 : 1;
  }

  let grid: HTMLDivElement;
  function fillAllCellsWithWidthMeasurement() {
    for (const cell of grid.querySelectorAll<HTMLElement>('.ag-cell')) {
      const width = cell.offsetWidth;
      const isFullWidthRow = cell.parentElement?.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? 'Total width: ' : '') + width + 'px';
    }
  }

  const rowData = [1, 2];
  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'A',
      field: 'author',
      width: 300,
      colSpan: colSpan
    },
    {
      headerName: 'Flexed Columns',
      children: [
        {
          headerName: 'B',
          minWidth: 200,
          maxWidth: 350,
          flex: 2
        },
        {
          headerName: 'C',
          flex: 1
        }
      ]
    }
  ];

  const defaultColDef = { resizable: true };

  let interval: number | undefined;
  function onGridReady() {
    interval = window.setInterval(fillAllCellsWithWidthMeasurement, 50);
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<h2>Column Flex</h2>
<div style:height="500px" class="ag-theme-alpine column-flex" bind:this={grid}>
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {onGridReady} />
</div>
