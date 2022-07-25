<script lang="ts" context="module">
  const formatProperty = new Map<string, (value: unknown) => unknown>([
    ...ComponentUtil.BOOLEAN_PROPERTIES.map((prop) => [prop, ComponentUtil.toBoolean] as const),
    ...ComponentUtil.NUMBER_PROPERTIES.map((prop) => [prop, ComponentUtil.toNumber] as const)
  ]);
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
  type Options = GridOptions<TData>;

  /* Grid options props */
  // Accessories (enterprise)
  // Clipboard (enterprise)
  // Columns
  export let columnDefs: Options['columnDefs'] = undefined;
  export let defaultColDef: Options['defaultColDef'] = undefined;
  export let defaultColGroupDef: Options['defaultColGroupDef'] = undefined;
  export let columnTypes: Options['columnTypes'] = undefined;
  export let maintainColumnOrder: Options['maintainColumnOrder'] = undefined;
  export let suppressFieldDotNotation: Options['suppressFieldDotNotation'] = undefined;

  export let rowData: Options['rowData'] = undefined;
  /* Bound exports */
  export let api: Options['api'] = null;
  export let columnApi: Options['columnApi'] = null;
  /* Non-reactive */
  export let gridOptions: Options = {};
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

  function updateProp<K extends keyof Options>(key: K, prop: Options[K]) {
    gridOptions[key] = formatProperty.get(key)?.(prop) ?? prop;
  }

  // Columns
  $: api?.setColumnDefs(columnDefs ?? [], 'gridOptionsChanged');
  $: api?.setDefaultColDef(defaultColDef ?? {}, 'gridOptionsChanged');
  $: updateProp('defaultColGroupDef', defaultColGroupDef);
  $: updateProp('columnTypes', columnTypes);
  $: updateProp('maintainColumnOrder', maintainColumnOrder);
  $: updateProp('suppressFieldDotNotation', suppressFieldDotNotation);

  $: api?.setRowData(rowData ?? []);

  // TODO: events
  // TODO: theme
</script>

<div bind:this={eGui} style:height="100%" {style} class="ag-theme-alpine {className}" />
