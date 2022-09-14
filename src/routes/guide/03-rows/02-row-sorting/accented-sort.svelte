<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  const columnDefs: ColDef[] = [{ field: 'accented', width: 150 }];

  const defaultColDef: ColDef = { sortable: true };

  const rowData = [{ accented: 'aáàä' }, { accented: 'aàáä' }, { accented: 'aäàá' }];

  const sortingOrder: ('asc' | 'desc' | null)[] = ['desc', 'asc', null];
</script>

<h2>Accented Sort</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} {defaultColDef} animateRows {sortingOrder} accentedSort />
</div>
