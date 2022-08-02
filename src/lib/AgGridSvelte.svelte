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
  import { onMount } from 'svelte';
  import {
    SvelteFrameworkComponentWrapper,
    SvelteFrameworkOverrides
  } from './SvelteFrameworkComponentWrapper';

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
  // Column Headers
  export let headerHeight: Options['headerHeight'] = undefined;
  export let groupHeaderHeight: Options['groupHeaderHeight'] = undefined;
  export let floatingFiltersHeight: Options['floatingFiltersHeight'] = undefined;
  export let pivotHeaderHeight: Options['pivotHeaderHeight'] = undefined;
  export let pivotGroupHeaderHeight: Options['pivotGroupHeaderHeight'] = undefined;
  // Column Moving
  export let allowDragFromColumnsToolPanel: Options['allowDragFromColumnsToolPanel'] = undefined;
  export let suppressMovableColumns: Options['suppressMovableColumns'] = undefined;
  export let suppressColumnMoveAnimation: Options['suppressColumnMoveAnimation'] = undefined;
  export let suppressDragLeaveHidesColumns: Options['suppressDragLeaveHidesColumns'] = undefined;
  export let suppressRowGroupHidesColumns: Options['suppressRowGroupHidesColumns'] = undefined;
  // Column Sizing
  export let colResizeDefault: Options['colResizeDefault'] = undefined;
  export let suppressAutoSize: Options['suppressAutoSize'] = undefined;
  export let autoSizePadding: Options['autoSizePadding'] = undefined;
  export let skipHeaderOnAutoSize: Options['skipHeaderOnAutoSize'] = undefined;
  // Components (TODO)
  // Editing
  export let editType: Options['editType'] = undefined;
  export let singleClickEdit: Options['singleClickEdit'] = undefined;
  export let suppressClickEdit: Options['suppressClickEdit'] = undefined;
  export let stopEditingWhenCellsLoseFocus: Options['stopEditingWhenCellsLoseFocus'] = undefined;
  export let enterMovesDown: Options['enterMovesDown'] = undefined;
  export let enterMovesDownAfterEdit: Options['enterMovesDownAfterEdit'] = undefined;
  export let undoRedoCellEditing: Options['undoRedoCellEditing'] = undefined;
  export let undoRedoCellEditingLimit: Options['undoRedoCellEditingLimit'] = undefined;
  export let readOnlyEdit: Options['readOnlyEdit'] = undefined;
  // Export (TODO)
  // Filtering
  export let quickFilterText: Options['quickFilterText'] = undefined;
  export let cacheQuickFilter: Options['cacheQuickFilter'] = undefined;
  export let isExternalFilterPresent: Options['isExternalFilterPresent'] = undefined;
  export let doesExternalFilterPass: Options['doesExternalFilterPass'] = undefined;
  export let excludeChildrenWhenTreeDataFiltering: Options['excludeChildrenWhenTreeDataFiltering'] =
    undefined;

  // Events
  export let onGridReady: Options['onGridReady'] = undefined;

  // RowModel: Client-Side
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
        onGridReady?.(event);
        _onGridReady?.(event);
      }
    });

    const gridParams: GridParams = {
      providedBeanInstances: {
        frameworkComponentWrapper: new SvelteFrameworkComponentWrapper()
      },
      frameworkOverrides: new SvelteFrameworkOverrides(),
      modules
    };

    const grid = new Grid(eGui, gridOptions, gridParams);

    return () => {
      grid.destroy();
    };
  });

  const updateProp = <K extends keyof Options>(key: K, prop: Options[K]) => {
    const setterName = `set${key.charAt(0).toUpperCase()}${key.substring(1)}`;
    const setters = api as unknown as Record<string, (value: unknown) => void>;
    const formattedProp = formatProperty.get(key)?.(prop) ?? prop;
    if (setters[setterName]) setters[setterName](formattedProp);
    gridOptions[key] = formattedProp;
  };

  // Columns
  $: if (api) updateProp('defaultColDef', defaultColDef);
  $: if (api) updateProp('defaultColGroupDef', defaultColGroupDef);
  $: if (api) updateProp('columnTypes', columnTypes);
  $: if (api) updateProp('maintainColumnOrder', maintainColumnOrder);
  $: if (api) updateProp('suppressFieldDotNotation', suppressFieldDotNotation);
  $: if (api) updateProp('columnDefs', columnDefs); // Update columnDefs last
  // Column Headers
  $: if (api) updateProp('headerHeight', headerHeight);
  $: if (api) updateProp('groupHeaderHeight', groupHeaderHeight);
  $: if (api) updateProp('floatingFiltersHeight', floatingFiltersHeight);
  $: if (api) updateProp('pivotHeaderHeight', pivotHeaderHeight);
  $: if (api) updateProp('pivotGroupHeaderHeight', pivotGroupHeaderHeight);
  // Column Moving
  $: if (api) updateProp('allowDragFromColumnsToolPanel', allowDragFromColumnsToolPanel);
  $: if (api) updateProp('suppressMovableColumns', suppressMovableColumns);
  $: if (api) updateProp('suppressColumnMoveAnimation', suppressColumnMoveAnimation);
  $: if (api) updateProp('suppressDragLeaveHidesColumns', suppressDragLeaveHidesColumns);
  $: if (api) updateProp('suppressRowGroupHidesColumns', suppressRowGroupHidesColumns);
  // Column Sizing
  $: if (api) updateProp('colResizeDefault', colResizeDefault);
  $: if (api) updateProp('suppressAutoSize', suppressAutoSize);
  $: if (api) updateProp('autoSizePadding', autoSizePadding);
  $: if (api) updateProp('skipHeaderOnAutoSize', skipHeaderOnAutoSize);
  // Editing
  $: if (api) updateProp('editType', editType);
  $: if (api) updateProp('singleClickEdit', singleClickEdit);
  $: if (api) updateProp('suppressClickEdit', suppressClickEdit);
  $: if (api) updateProp('stopEditingWhenCellsLoseFocus', stopEditingWhenCellsLoseFocus);
  $: if (api) updateProp('enterMovesDown', enterMovesDown);
  $: if (api) updateProp('enterMovesDownAfterEdit', enterMovesDownAfterEdit);
  $: if (api) updateProp('undoRedoCellEditing', undoRedoCellEditing);
  $: if (api) updateProp('undoRedoCellEditingLimit', undoRedoCellEditingLimit);
  $: if (api) updateProp('readOnlyEdit', readOnlyEdit);
  // Filtering
  $: if (api) updateProp('quickFilterText', quickFilterText);
  $: if (api) updateProp('cacheQuickFilter', cacheQuickFilter);
  $: if (api) updateProp('isExternalFilterPresent', isExternalFilterPresent);
  $: if (api) updateProp('doesExternalFilterPass', doesExternalFilterPass);
  $: if (api)
    updateProp('excludeChildrenWhenTreeDataFiltering', excludeChildrenWhenTreeDataFiltering);

  // RowModel: Client-Side
  $: if (api) updateProp('rowData', rowData);

  // TODO: events
  // TODO: custom row model
</script>

<div bind:this={eGui} style:height="100%" {style} class={className} />
