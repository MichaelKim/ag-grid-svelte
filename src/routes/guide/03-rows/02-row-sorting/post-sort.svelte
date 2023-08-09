<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, PostSortRowsParams } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age', width: 100 },
    { field: 'country', sort: 'asc' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  const defaultColDef: ColDef = { width: 170, sortable: true };

  const postSortRows = (params: PostSortRowsParams<IOlympicData>) => {
    const rowNodes = params.nodes;
    // here we put Ireland rows on top while preserving the sort order
    let nextInsertPos = 0;
    for (let i = 0; i < rowNodes.length; i++) {
      const country = rowNodes[i].data?.country;
      if (country === 'Ireland') {
        rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
        nextInsertPos++;
      }
    }
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    void fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => (rowData = data));
  }
</script>

<h2>Post Sort</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {postSortRows} {onGridReady} />
</div>
