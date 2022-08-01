<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import { onMount } from 'svelte';
  import Layout from '../../Layout.svelte';

  const columnDefs = [
    { field: 'athlete' },
    {
      headerName: 'Athlete Details',
      children: [{ field: 'age' }, { field: 'country' }]
    },
    {
      headerName: 'Sports Results',
      children: [
        { field: 'sport' },
        { field: 'total', columnGroupShow: 'closed' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' }
      ]
    }
  ];

  let defaultColDef = {};
  function resize() {
    defaultColDef = { width: Math.round(Math.random() * 100 + 50) };
  }

  const defaultColGroupDef = {
    openByDefault: true
  };

  let rowData: unknown[] = [];
  onMount(() => {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  });
</script>

<Layout title="Columns">
  <button on:click={resize}>Random Width</button>
  <div style:height="500px" class="ag-theme-alpine">
    <AgGridSvelte {rowData} {columnDefs} {defaultColDef} {defaultColGroupDef} />
  </div>
</Layout>
