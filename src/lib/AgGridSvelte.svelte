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
  // Miscellaneous
  export let api: Options['api'] = undefined;
  export let columnApi: Options['columnApi'] = undefined;
  // RowModel
  export let rowModelType: Options['rowModelType'] = undefined;
  // RowModel: Client-Side
  export let rowData: Options['rowData'] = undefined;

  // Events
  export let onGridReady: Options['onGridReady'] = undefined;

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

  const _update = <K extends keyof Options>(
    setters: Record<string, (value: unknown) => void>,
    key: K,
    prop: Options[K]
  ) => {
    const setterName = `set${key.charAt(0).toUpperCase()}${key.substring(1)}`;
    const formattedProp = formatProperty.get(key)?.(prop) ?? prop;
    if (setters[setterName]) setters[setterName](formattedProp);
    gridOptions[key] = formattedProp;
  };

  $: updateProp = <K extends keyof Options>(key: K, prop: Options[K]) => {
    // Pull into separate function so this doesn't react on gridOptions
    if (api) _update(api as any, key, prop);
  };

  // Columns
  $: updateProp('defaultColDef', defaultColDef);
  $: updateProp('defaultColGroupDef', defaultColGroupDef);
  $: updateProp('columnTypes', columnTypes);
  $: updateProp('maintainColumnOrder', maintainColumnOrder);
  $: updateProp('suppressFieldDotNotation', suppressFieldDotNotation);
  $: updateProp('columnDefs', columnDefs); // Update columnDefs last
  // Column Headers
  $: updateProp('headerHeight', headerHeight);
  $: updateProp('groupHeaderHeight', groupHeaderHeight);
  $: updateProp('floatingFiltersHeight', floatingFiltersHeight);
  $: updateProp('pivotHeaderHeight', pivotHeaderHeight);
  $: updateProp('pivotGroupHeaderHeight', pivotGroupHeaderHeight);
  // Column Moving
  $: updateProp('allowDragFromColumnsToolPanel', allowDragFromColumnsToolPanel);
  $: updateProp('suppressMovableColumns', suppressMovableColumns);
  $: updateProp('suppressColumnMoveAnimation', suppressColumnMoveAnimation);
  $: updateProp('suppressDragLeaveHidesColumns', suppressDragLeaveHidesColumns);
  $: updateProp('suppressRowGroupHidesColumns', suppressRowGroupHidesColumns);
  // Column Sizing
  $: updateProp('colResizeDefault', colResizeDefault);
  $: updateProp('suppressAutoSize', suppressAutoSize);
  $: updateProp('autoSizePadding', autoSizePadding);
  $: updateProp('skipHeaderOnAutoSize', skipHeaderOnAutoSize);
  // Editing
  $: updateProp('editType', editType);
  $: updateProp('singleClickEdit', singleClickEdit);
  $: updateProp('suppressClickEdit', suppressClickEdit);
  $: updateProp('stopEditingWhenCellsLoseFocus', stopEditingWhenCellsLoseFocus);
  $: updateProp('enterMovesDown', enterMovesDown);
  $: updateProp('enterMovesDownAfterEdit', enterMovesDownAfterEdit);
  $: updateProp('undoRedoCellEditing', undoRedoCellEditing);
  $: updateProp('undoRedoCellEditingLimit', undoRedoCellEditingLimit);
  $: updateProp('readOnlyEdit', readOnlyEdit);
  // Filtering
  $: updateProp('quickFilterText', quickFilterText);
  $: updateProp('cacheQuickFilter', cacheQuickFilter);
  $: updateProp('isExternalFilterPresent', isExternalFilterPresent);
  $: updateProp('doesExternalFilterPass', doesExternalFilterPass);
  $: updateProp('excludeChildrenWhenTreeDataFiltering', excludeChildrenWhenTreeDataFiltering);
  // RowModel: Client-Side
  $: isClientSide = rowModelType == null || rowModelType === 'clientSide';
  $: if (isClientSide) updateProp('rowData', rowData);

  // TODO: events
  // TODO: custom row model
</script>

<div bind:this={eGui} style:height="100%" {style} class={className} />
