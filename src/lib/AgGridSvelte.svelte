<script lang="ts">
  import {
    ColumnApi,
    ComponentUtil,
    Grid,
    GridApi,
    type ColDef,
    type ColGroupDef,
    type GridOptions,
    type GridParams,
    type GridReadyEvent,
    type Module
  } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import { onMount } from 'svelte';
  import { SvelteFrameworkComponentWrapper } from './SvelteFrameworkComponentWrapper';

  type TData = $$Generic;

  // Grid options props
  export let rowData: TData[];
  export let columnDefs: (ColDef<TData> | ColGroupDef<TData>)[];
  // Non-reactive
  export let gridOptions: GridOptions<TData> = {};
  export let modules: Module[] = [];
  // Additional props
  export let className: string = '';
  export let style: string = '';

  let eGui: HTMLDivElement;
  let api: GridApi<TData>;
  let columnApi: ColumnApi;

  onMount(() => {
    const options: GridOptions<TData> = ComponentUtil.copyAttributesToGridOptions(
      gridOptions,
      $$props
    );

    function onGridReady(event: GridReadyEvent<TData>) {
      // Once initialized, api and columnApi available in columnApi
      gridOptions.api = api = event.api;
      gridOptions.columnApi = columnApi = event.columnApi;
      gridOptions.onGridReady?.(event);
    }

    const gridParams: GridParams = {
      providedBeanInstances: {
        frameworkComponentWrapper: new SvelteFrameworkComponentWrapper()
      },
      modules
    };

    const grid = new Grid(eGui, { ...options, onGridReady }, gridParams);

    return () => {
      grid.destroy();
    };
  });

  $: if (api) api.setRowData(rowData);
  $: if (api) api.setColumnDefs(columnDefs);
</script>

<div bind:this={eGui} style:height="100%" {style} class="ag-theme-alpine {className}" />
