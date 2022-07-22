<script lang="ts">
  import {
    ColumnApi,
    Grid,
    GridApi,
    type ColDef,
    type ColGroupDef,
    type GridOptions
  } from 'ag-grid-community';
  import { onMount } from 'svelte';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';

  type TData = $$Generic;

  // Grid options props
  export let rowData: TData[];
  export let columnDefs: (ColDef<TData> | ColGroupDef<TData>)[];
  // All in one (non-reactive, bind for apis)
  export let gridOptions: GridOptions<TData> = {};
  // Additional props
  export let className: string = '';
  export let style: string = '';

  let eGui: HTMLDivElement;
  let api: GridApi<TData>;
  let columnApi: ColumnApi;

  onMount(() => {
    const options: GridOptions<TData> = {
      ...gridOptions,
      rowData,
      columnDefs,
      onGridReady(event) {
        ({ api, columnApi } = event);
        // Once initialized, api and columnApi available in columnApi
        gridOptions.api = api;
        gridOptions.columnApi = columnApi;
        gridOptions.onGridReady?.(event);
      }
    };
    const grid = new Grid(eGui, options);

    return () => {
      grid.destroy();
    };
  });

  $: if (api) api.setRowData(rowData);
  $: if (api) api.setColumnDefs(columnDefs);
</script>

<div bind:this={eGui} style:height="100%" {style} class="ag-theme-alpine {className}" />
