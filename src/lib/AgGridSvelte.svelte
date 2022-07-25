<script lang="ts" context="module">
  const formatProperty: { [prop: string]: (value: unknown) => unknown } = {};
  for (const prop of ComponentUtil.BOOLEAN_PROPERTIES)
    formatProperty[prop] = ComponentUtil.toBoolean;
  for (const prop of ComponentUtil.NUMBER_PROPERTIES) formatProperty[prop] = ComponentUtil.toNumber;
</script>

<script lang="ts">
  import {
    ComponentUtil,
    Grid,
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

  /* Grid options props */
  // Columns
  export let columnDefs: NonNullable<GridOptions<TData>['columnDefs']> = [];
  export let defaultColDef: NonNullable<GridOptions<TData>['defaultColDef']> = {};
  export let defaultColGroupDef: NonNullable<GridOptions<TData>['defaultColGroupDef']> = {};
  export let columnTypes: NonNullable<GridOptions<TData>['columnTypes']> = {};
  export let maintainColumnOrder: NonNullable<GridOptions<TData>['maintainColumnOrder']> = false;
  export let suppressFieldDotNotation: NonNullable<GridOptions<TData>['suppressFieldDotNotation']> =
    false;

  export let rowData: NonNullable<GridOptions<TData>['rowData']> = [];
  /* Bound exports */
  export let api: GridOptions<TData>['api'] = null;
  export let columnApi: GridOptions<TData>['columnApi'] = null;
  /* Non-reactive */
  export let gridOptions: GridOptions<TData> = {};
  export let modules: Module[] = [];

  /* Svelte-specific additional props */
  export let className: string = '';
  export let style: string = '';

  let eGui: HTMLDivElement;

  onMount(() => {
    const _onGridReady = gridOptions.onGridReady;
    gridOptions = ComponentUtil.copyAttributesToGridOptions(gridOptions, {
      $$props,
      onGridReady(event: GridReadyEvent<TData>) {
        api = event.api;
        columnApi = event.columnApi;
        _onGridReady?.(event);
      }
    });

    const gridParams: GridParams = {
      providedBeanInstances: {
        frameworkComponentWrapper: new SvelteFrameworkComponentWrapper()
      },
      modules
    };

    const grid = new Grid(eGui, gridOptions, gridParams);

    return () => {
      grid.destroy();
    };
  });

  $: api?.setRowData(rowData);

  function updateProp(options: GridOptions<TData>) {
    const keys = Object.keys(options) as (keyof GridOptions<TData>)[];
    for (const key of keys) gridOptions[key] = formatProperty[key]?.(options[key]) ?? options[key];
  }

  $: api?.setColumnDefs(columnDefs, 'gridOptionsChanged');
  $: api?.setDefaultColDef(defaultColDef, 'gridOptionsChanged');
  $: updateProp({ defaultColGroupDef });
  $: updateProp({ columnTypes });
  $: updateProp({ maintainColumnOrder });
  $: updateProp({ suppressFieldDotNotation });

  // TODO: events
  // TODO: theme
</script>

<div bind:this={eGui} style:height="100%" {style} class="ag-theme-alpine {className}" />
