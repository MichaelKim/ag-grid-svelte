<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import { onMount } from 'svelte';

  const columnDefs = [{ field: 'athlete' }, { field: 'gold' }, { field: 'age' }];

  let rowData: unknown[] = [];
  onMount(() => {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  });
</script>

<h2>Column Definitions</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte {rowData} {columnDefs} />
</div>
