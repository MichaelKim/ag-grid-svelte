<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, GridReadyEvent } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  const rowData = createRowData();
  function createRowData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        height: Math.floor(Math.random() * 100),
        width: Math.floor(Math.random() * 100),
        depth: Math.floor(Math.random() * 100)
      });
    }
    return data;
  }

  const columnDefs: ColDef[] = [
    { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
    { headerName: 'Col 2', colId: 'firstCol', field: 'height' },
    { headerName: 'Col 3', field: 'height' },
    { headerName: 'Col 4', field: 'height' },
    { headerName: 'Col 5', valueGetter: 'data.width' },
    { headerName: 'Col 6', valueGetter: 'data.width' }
  ];

  const onGridReady = (params: GridReadyEvent) => {
    var cols = params.columnApi.getColumns()!;
    cols.forEach((col) => {
      const colDef = col.getColDef();
      console.log(colDef.headerName + ', Column ID = ' + col.getId(), JSON.stringify(colDef));
    });
  };
</script>

<h2>Column IDs</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {onGridReady} />
</div>
