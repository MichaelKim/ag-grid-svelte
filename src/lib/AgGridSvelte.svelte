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
  // Accessories
  export let statusBar: Options['statusBar'] = undefined;
  export let sideBar: Options['sideBar'] = undefined;
  export let getContextMenuItems: Options['getContextMenuItems'] = undefined;
  export let suppressContextMenu: Options['suppressContextMenu'] = undefined;
  export let preventDefaultOnContextMenu: Options['preventDefaultOnContextMenu'] = undefined;
  export let allowContextMenuWithControlKey: Options['allowContextMenuWithControlKey'] = undefined;
  export let getMainMenuItems: Options['getMainMenuItems'] = undefined;
  export let suppressMenuHide: Options['suppressMenuHide'] = undefined;
  export let popupParent: Options['popupParent'] = undefined;
  export let postProcessPopup: Options['postProcessPopup'] = undefined;
  // Clipboard
  export let copyHeadersToClipboard: Options['copyHeadersToClipboard'] = undefined;
  export let copyGroupHeadersToClipboard: Options['copyGroupHeadersToClipboard'] = undefined;
  export let clipboardDelimiter: Options['clipboardDelimiter'] = undefined;
  export let suppressCopyRowsToClipboard: Options['suppressCopyRowsToClipboard'] = undefined;
  export let suppressCopySingleCellRanges: Options['suppressCopySingleCellRanges'] = undefined;
  export let suppressLastEmptyLineOnPaste: Options['suppressLastEmptyLineOnPaste'] = undefined;
  export let suppressClipboardPaste: Options['suppressClipboardPaste'] = undefined;
  export let suppressClipboardApi: Options['suppressClipboardApi'] = undefined;
  export let processCellForClipboard: Options['processCellForClipboard'] = undefined;
  export let processHeaderForClipboard: Options['processHeaderForClipboard'] = undefined;
  export let processGroupHeaderForClipboard: Options['processGroupHeaderForClipboard'] = undefined;
  export let processCellFromClipboard: Options['processCellFromClipboard'] = undefined;
  export let sendToClipboard: Options['sendToClipboard'] = undefined;
  export let processDataFromClipboard: Options['processDataFromClipboard'] = undefined;
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
  // export let components: Options['components'] = undefined;
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
  // Export
  export let defaultCsvExportParams: Options['defaultCsvExportParams'] = undefined;
  export let suppressCsvExport: Options['suppressCsvExport'] = undefined;
  export let defaultExcelExportParams: Options['defaultExcelExportParams'] = undefined;
  export let suppressExcelExport: Options['suppressExcelExport'] = undefined;
  export let excelStyles: Options['excelStyles'] = undefined;
  // Filtering
  export let quickFilterText: Options['quickFilterText'] = undefined;
  export let cacheQuickFilter: Options['cacheQuickFilter'] = undefined;
  export let isExternalFilterPresent: Options['isExternalFilterPresent'] = undefined;
  export let doesExternalFilterPass: Options['doesExternalFilterPass'] = undefined;
  export let excludeChildrenWhenTreeDataFiltering: Options['excludeChildrenWhenTreeDataFiltering'] =
    undefined;
  // Integrated Charts
  export let enableCharts: Options['enableCharts'] = undefined;
  export let getChartToolbarItems: Options['getChartToolbarItems'] = undefined;
  export let createChartContainer: Options['createChartContainer'] = undefined;
  export let chartThemes: Options['chartThemes'] = undefined;
  export let customChartThemes: Options['customChartThemes'] = undefined;
  export let chartThemeOverrides: Options['chartThemeOverrides'] = undefined;
  // Keyboard Navigation
  export let navigateToNextHeader: Options['navigateToNextHeader'] = undefined;
  export let tabToNextHeader: Options['tabToNextHeader'] = undefined;
  export let navigateToNextCell: Options['navigateToNextCell'] = undefined;
  export let tabToNextCell: Options['tabToNextCell'] = undefined;
  // Loading Cell Renderers
  export let loadingCellRenderer: Options['loadingCellRenderer'] = undefined;
  export let loadingCellRendererParams: Options['loadingCellRendererParams'] = undefined;
  export let loadingCellRendererSelector: Options['loadingCellRendererSelector'] = undefined;
  // Localisation
  export let localeText: Options['localeText'] = undefined;
  export let getLocaleText: Options['getLocaleText'] = undefined;
  // Master Detail
  export let masterDetail: Options['masterDetail'] = undefined;
  export let isRowMaster: Options['isRowMaster'] = undefined;
  export let detailCellRenderer: Options['detailCellRenderer'] = undefined;
  export let detailCellRendererParams: Options['detailCellRendererParams'] = undefined;
  export let detailRowHeight: Options['detailRowHeight'] = undefined;
  export let detailRowAutoHeight: Options['detailRowAutoHeight'] = undefined;
  export let embedFullWidthRows: Options['embedFullWidthRows'] = undefined;
  export let keepDetailRows: Options['keepDetailRows'] = undefined;
  export let keepDetailRowsCount: Options['keepDetailRowsCount'] = undefined;
  // Miscellaneous
  export let api: Options['api'] = undefined;
  export let columnApi: Options['columnApi'] = undefined;
  export let alignedGrids: Options['alignedGrids'] = undefined;
  export let context: Options['context'] = undefined;
  export let tabIndex: Options['tabIndex'] = undefined;
  export let rowBuffer: Options['rowBuffer'] = undefined;
  export let valueCache: Options['valueCache'] = undefined;
  export let valueCacheNeverExpires: Options['valueCacheNeverExpires'] = undefined;
  export let enableCellExpressions: Options['enableCellExpressions'] = undefined;
  export let getDocument: Options['getDocument'] = undefined;
  export let suppressParentsInRowNodes: Options['suppressParentsInRowNodes'] = undefined;
  export let suppressTouch: Options['suppressTouch'] = undefined;
  export let suppressFocusAfterRefresh: Options['suppressFocusAfterRefresh'] = undefined;
  export let suppressAsyncEvents: Options['suppressAsyncEvents'] = undefined;
  export let suppressBrowserResizeObserver: Options['suppressBrowserResizeObserver'] = undefined;
  export let suppressPropertyNamesCheck: Options['suppressPropertyNamesCheck'] = undefined;
  export let suppressChangeDetection: Options['suppressChangeDetection'] = undefined;
  export let debug: Options['debug'] = undefined;
  // Overlays
  export let overlayLoadingTemplate: Options['overlayLoadingTemplate'] = undefined;
  export let loadingOverlayComponent: Options['loadingOverlayComponent'] = undefined;
  export let loadingOverlayComponentParams: Options['loadingOverlayComponentParams'] = undefined;
  export let suppressLoadingOverlay: Options['suppressLoadingOverlay'] = undefined;
  export let overlayNoRowsTemplate: Options['overlayNoRowsTemplate'] = undefined;
  export let noRowsOverlayComponent: Options['noRowsOverlayComponent'] = undefined;
  export let noRowsOverlayComponentParams: Options['noRowsOverlayComponentParams'] = undefined;
  export let suppressNoRowsOverlay: Options['suppressNoRowsOverlay'] = undefined;
  // Pagination
  export let pagination: Options['pagination'] = undefined;
  export let paginationPageSize: Options['paginationPageSize'] = undefined;
  export let paginationNumberFormatter: Options['paginationNumberFormatter'] = undefined;
  export let paginationAutoPageSize: Options['paginationAutoPageSize'] = undefined;
  export let paginateChildRows: Options['paginateChildRows'] = undefined;
  export let suppressPaginationPanel: Options['suppressPaginationPanel'] = undefined;
  // Pivot and Aggregation
  export let pivotMode: Options['pivotMode'] = undefined;
  export let pivotPanelShow: Options['pivotPanelShow'] = undefined;
  export let pivotColumnGroupTotals: Options['pivotColumnGroupTotals'] = undefined;
  export let pivotRowTotals: Options['pivotRowTotals'] = undefined;
  export let pivotSuppressAutoColumn: Options['pivotSuppressAutoColumn'] = undefined;
  export let processPivotResultColDef: Options['processPivotResultColDef'] = undefined;
  export let processPivotResultColGroupDef: Options['processPivotResultColGroupDef'] = undefined;
  export let suppressExpandablePivotGroups: Options['suppressExpandablePivotGroups'] = undefined;
  export let functionsReadOnly: Options['functionsReadOnly'] = undefined;
  export let aggFuncs: Options['aggFuncs'] = undefined;
  export let getGroupRowAgg: Options['getGroupRowAgg'] = undefined;
  export let suppressAggFuncInHeader: Options['suppressAggFuncInHeader'] = undefined;
  export let suppressAggAtRootLevel: Options['suppressAggAtRootLevel'] = undefined;
  export let aggregateOnlyChangedColumns: Options['aggregateOnlyChangedColumns'] = undefined;
  export let suppressAggFilteredOnly: Options['suppressAggFilteredOnly'] = undefined;
  export let groupAggFiltering: Options['groupAggFiltering'] = undefined;
  export let removePivotHeaderRowWhenSingleValueColumn: Options['removePivotHeaderRowWhenSingleValueColumn'] =
    undefined;
  // Rendering
  export let animateRows: Options['animateRows'] = undefined;
  export let enableCellChangeFlash: Options['enableCellChangeFlash'] = undefined;
  export let cellFlashDelay: Options['cellFlashDelay'] = undefined;
  export let cellFadeDelay: Options['cellFadeDelay'] = undefined;
  export let allowShowChangeAfterFilter: Options['allowShowChangeAfterFilter'] = undefined;
  export let domLayout: Options['domLayout'] = undefined;
  export let ensureDomOrder: Options['ensureDomOrder'] = undefined;
  export let getBusinessKeyForNode: Options['getBusinessKeyForNode'] = undefined;
  export let processRowPostCreate: Options['processRowPostCreate'] = undefined;
  export let enableRtl: Options['enableRtl'] = undefined;
  export let suppressColumnVirtualisation: Options['suppressColumnVirtualisation'] = undefined;
  export let suppressRowVirtualisation: Options['suppressRowVirtualisation'] = undefined;
  export let suppressMaxRenderedRowRestriction: Options['suppressMaxRenderedRowRestriction'] =
    undefined;
  // Row Drag and Drop
  export let rowDragManaged: Options['rowDragManaged'] = undefined;
  export let rowDragEntireRow: Options['rowDragEntireRow'] = undefined;
  export let rowDragMultiRow: Options['rowDragMultiRow'] = undefined;
  export let suppressRowDrag: Options['suppressRowDrag'] = undefined;
  export let suppressMoveWhenRowDragging: Options['suppressMoveWhenRowDragging'] = undefined;
  // Row Full Width
  export let fullWidthCellRenderer: Options['fullWidthCellRenderer'] = undefined;
  export let fullWidthCellRendererParams: Options['fullWidthCellRendererParams'] = undefined;
  // Row Grouping
  export let groupDisplayType: Options['groupDisplayType'] = undefined;
  export let groupDefaultExpanded: Options['groupDefaultExpanded'] = undefined;
  export let autoGroupColumnDef: Options['autoGroupColumnDef'] = undefined;
  export let groupMaintainOrder: Options['groupMaintainOrder'] = undefined;
  export let groupSelectsChildren: Options['groupSelectsChildren'] = undefined;
  export let groupIncludeFooter: Options['groupIncludeFooter'] = undefined;
  export let groupIncludeTotalFooter: Options['groupIncludeTotalFooter'] = undefined;
  export let groupSuppressBlankHeader: Options['groupSuppressBlankHeader'] = undefined;
  export let groupRowsSticky: Options['groupRowsSticky'] = undefined;
  export let groupSelectsFiltered: Options['groupSelectsFiltered'] = undefined;
  export let showOpenedGroup: Options['showOpenedGroup'] = undefined;
  export let isGroupOpenByDefault: Options['isGroupOpenByDefault'] = undefined;
  export let initialGroupOrderComparator: Options['initialGroupOrderComparator'] = undefined;
  export let groupRemoveSingleChildren: Options['groupRemoveSingleChildren'] = undefined;
  export let groupRemoveLowestSingleChildren: Options['groupRemoveLowestSingleChildren'] =
    undefined;
  export let groupHideOpenParents: Options['groupHideOpenParents'] = undefined;
  export let rowGroupPanelShow: Options['rowGroupPanelShow'] = undefined;
  export let groupRowRenderer: Options['groupRowRenderer'] = undefined;
  export let groupRowRendererParams: Options['groupRowRendererParams'] = undefined;
  // export let suppressDragLeaveHidesColumns: Options['suppressDragLeaveHidesColumns'] = undefined;
  // export let suppressRowGroupHidesColumns: Options['suppressRowGroupHidesColumns'] = undefined;
  export let suppressMakeColumnVisibleAfterUnGroup: Options['suppressMakeColumnVisibleAfterUnGroup'] =
    undefined;
  export let treeData: Options['treeData'] = undefined;
  export let getDataPath: Options['getDataPath'] = undefined;
  // Row Pinning
  export let pinnedTopRowData: Options['pinnedTopRowData'] = undefined;
  export let pinnedBottomRowData: Options['pinnedBottomRowData'] = undefined;
  // RowModel
  export let rowModelType: Options['rowModelType'] = undefined;
  export let getRowId: Options['getRowId'] = undefined;
  // RowModel: Client-Side
  export let rowData: Options['rowData'] = undefined;
  export let resetRowDataOnUpdate: Options['resetRowDataOnUpdate'] = undefined;
  export let asyncTransactionWaitMillis: Options['asyncTransactionWaitMillis'] = undefined;
  export let suppressModelUpdateAfterUpdateTransaction: Options['suppressModelUpdateAfterUpdateTransaction'] =
    undefined;
  // RowModel: Infinite
  export let datasource: Options['datasource'] = undefined;
  export let cacheOverflowSize: Options['cacheOverflowSize'] = undefined;
  export let maxConcurrentDatasourceRequests: Options['maxConcurrentDatasourceRequests'] =
    undefined;
  export let cacheBlockSize: Options['cacheBlockSize'] = undefined;
  export let maxBlocksInCache: Options['maxBlocksInCache'] = undefined;
  export let infiniteInitialRowCount: Options['infiniteInitialRowCount'] = undefined;
  // RowModel: Server-Side
  export let serverSideDatasource: Options['serverSideDatasource'] = undefined;
  export let serverSideInfiniteScroll: Options['serverSideInfiniteScroll'] = undefined;
  // export let cacheBlockSize: Options['cacheBlockSize'] = undefined;
  // export let maxBlocksInCache: Options['maxBlocksInCache'] = undefined;
  // export let maxConcurrentDatasourceRequests: Options['maxConcurrentDatasourceRequests'] =
  undefined;
  export let blockLoadDebounceMillis: Options['blockLoadDebounceMillis'] = undefined;
  export let purgeClosedRowNodes: Options['purgeClosedRowNodes'] = undefined;
  export let serverSideSortAllLevels: Options['serverSideSortAllLevels'] = undefined;
  export let serverSideFilterAllLevels: Options['serverSideFilterAllLevels'] = undefined;
  export let serverSideSortOnServer: Options['serverSideSortOnServer'] = undefined;
  export let serverSideFilterOnServer: Options['serverSideFilterOnServer'] = undefined;
  export let serverSideInitialRowCount: Options['serverSideInitialRowCount'] = undefined;
  export let getChildCount: Options['getChildCount'] = undefined;
  export let getServerSideGroupLevelParams: Options['getServerSideGroupLevelParams'] = undefined;
  export let isServerSideGroupOpenByDefault: Options['isServerSideGroupOpenByDefault'] = undefined;
  export let isApplyServerSideTransaction: Options['isApplyServerSideTransaction'] = undefined;
  export let isServerSideGroup: Options['isServerSideGroup'] = undefined;
  export let getServerSideGroupKey: Options['getServerSideGroupKey'] = undefined;
  // RowModel: Viewport
  export let viewportDatasource: Options['viewportDatasource'] = undefined;
  export let viewportRowModelPageSize: Options['viewportRowModelPageSize'] = undefined;
  export let viewportRowModelBufferSize: Options['viewportRowModelBufferSize'] = undefined;
  // Scrolling
  export let alwaysShowHorizontalScroll: Options['alwaysShowHorizontalScroll'] = undefined;
  export let alwaysShowVerticalScroll: Options['alwaysShowVerticalScroll'] = undefined;
  export let debounceVerticalScrollbar: Options['debounceVerticalScrollbar'] = undefined;
  export let suppressHorizontalScroll: Options['suppressHorizontalScroll'] = undefined;
  export let suppressScrollOnNewData: Options['suppressScrollOnNewData'] = undefined;
  export let suppressScrollWhenPopupsAreOpen: Options['suppressScrollWhenPopupsAreOpen'] =
    undefined;
  export let suppressAnimationFrame: Options['suppressAnimationFrame'] = undefined;
  export let suppressMiddleClickScrolls: Options['suppressMiddleClickScrolls'] = undefined;
  export let suppressPreventDefaultOnMouseWheel: Options['suppressPreventDefaultOnMouseWheel'] =
    undefined;
  export let scrollbarWidth: Options['scrollbarWidth'] = undefined;
  // Selection
  export let rowSelection: Options['rowSelection'] = undefined;
  export let rowMultiSelectWithClick: Options['rowMultiSelectWithClick'] = undefined;
  export let isRowSelectable: Options['isRowSelectable'] = undefined;
  export let suppressRowDeselection: Options['suppressRowDeselection'] = undefined;
  export let suppressRowClickSelection: Options['suppressRowClickSelection'] = undefined;
  export let suppressCellFocus: Options['suppressCellFocus'] = undefined;
  export let suppressMultiRangeSelection: Options['suppressMultiRangeSelection'] = undefined;
  export let enableCellTextSelection: Options['enableCellTextSelection'] = undefined;
  export let enableRangeSelection: Options['enableRangeSelection'] = undefined;
  export let enableRangeHandle: Options['enableRangeHandle'] = undefined;
  export let enableFillHandle: Options['enableFillHandle'] = undefined;
  export let fillHandleDirection: Options['fillHandleDirection'] = undefined;
  export let fillOperation: Options['fillOperation'] = undefined;
  export let suppressClearOnFillReduction: Options['suppressClearOnFillReduction'] = undefined;
  // Sorting
  export let sortingOrder: Options['sortingOrder'] = undefined;
  export let accentedSort: Options['accentedSort'] = undefined;
  export let unSortIcon: Options['unSortIcon'] = undefined;
  export let suppressMultiSort: Options['suppressMultiSort'] = undefined;
  export let alwaysMultiSort: Options['alwaysMultiSort'] = undefined;
  export let multiSortKey: Options['multiSortKey'] = undefined;
  export let suppressMaintainUnsortedOrder: Options['suppressMaintainUnsortedOrder'] = undefined;
  export let postSortRows: Options['postSortRows'] = undefined;
  export let deltaSort: Options['deltaSort'] = undefined;
  // Styling
  export let icons: Options['icons'] = undefined;
  export let rowHeight: Options['rowHeight'] = undefined;
  export let getRowHeight: Options['getRowHeight'] = undefined;
  export let rowStyle: Options['rowStyle'] = undefined;
  export let getRowStyle: Options['getRowStyle'] = undefined;
  export let rowClass: Options['rowClass'] = undefined;
  export let getRowClass: Options['getRowClass'] = undefined;
  export let rowClassRules: Options['rowClassRules'] = undefined;
  export let isFullWidthRow: Options['isFullWidthRow'] = undefined;
  export let suppressRowHoverHighlight: Options['suppressRowHoverHighlight'] = undefined;
  export let suppressRowTransform: Options['suppressRowTransform'] = undefined;
  export let columnHoverHighlight: Options['columnHoverHighlight'] = undefined;
  // Tooltips
  export let enableBrowserTooltips: Options['enableBrowserTooltips'] = undefined;
  export let tooltipShowDelay: Options['tooltipShowDelay'] = undefined;
  export let tooltipHideDelay: Options['tooltipHideDelay'] = undefined;
  export let tooltipMouseTrack: Options['tooltipMouseTrack'] = undefined;

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
      ...$$props,
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

  // Tooltips (Update first?
  $: updateProp('enableBrowserTooltips', enableBrowserTooltips);
  $: updateProp('tooltipShowDelay', tooltipShowDelay);
  $: updateProp('tooltipHideDelay', tooltipHideDelay);
  $: updateProp('tooltipMouseTrack', tooltipMouseTrack);
  // Accessories
  $: updateProp('statusBar', statusBar);
  $: updateProp('sideBar', sideBar);
  $: updateProp('getContextMenuItems', getContextMenuItems);
  $: updateProp('suppressContextMenu', suppressContextMenu);
  $: updateProp('preventDefaultOnContextMenu', preventDefaultOnContextMenu);
  $: updateProp('allowContextMenuWithControlKey', allowContextMenuWithControlKey);
  $: updateProp('getMainMenuItems', getMainMenuItems);
  $: updateProp('suppressMenuHide', suppressMenuHide);
  $: updateProp('popupParent', popupParent);
  $: updateProp('postProcessPopup', postProcessPopup);
  // Clipboard
  $: updateProp('copyHeadersToClipboard', copyHeadersToClipboard);
  $: updateProp('copyGroupHeadersToClipboard', copyGroupHeadersToClipboard);
  $: updateProp('clipboardDelimiter', clipboardDelimiter);
  $: updateProp('suppressCopyRowsToClipboard', suppressCopyRowsToClipboard);
  $: updateProp('suppressCopySingleCellRanges', suppressCopySingleCellRanges);
  $: updateProp('suppressLastEmptyLineOnPaste', suppressLastEmptyLineOnPaste);
  $: updateProp('suppressClipboardPaste', suppressClipboardPaste);
  $: updateProp('suppressClipboardApi', suppressClipboardApi);
  $: updateProp('processCellForClipboard', processCellForClipboard);
  $: updateProp('processHeaderForClipboard', processHeaderForClipboard);
  $: updateProp('processGroupHeaderForClipboard', processGroupHeaderForClipboard);
  $: updateProp('processCellFromClipboard', processCellFromClipboard);
  $: updateProp('sendToClipboard', sendToClipboard);
  $: updateProp('processDataFromClipboard', processDataFromClipboard);
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
  // Export
  $: updateProp('defaultCsvExportParams', defaultCsvExportParams);
  $: updateProp('suppressCsvExport', suppressCsvExport);
  $: updateProp('defaultExcelExportParams', defaultExcelExportParams);
  $: updateProp('suppressExcelExport', suppressExcelExport);
  $: updateProp('excelStyles', excelStyles);
  // Filtering
  $: updateProp('quickFilterText', quickFilterText);
  $: updateProp('cacheQuickFilter', cacheQuickFilter);
  $: updateProp('isExternalFilterPresent', isExternalFilterPresent);
  $: updateProp('doesExternalFilterPass', doesExternalFilterPass);
  $: updateProp('excludeChildrenWhenTreeDataFiltering', excludeChildrenWhenTreeDataFiltering);
  // Integrated Charts
  $: updateProp('enableCharts', enableCharts);
  $: updateProp('getChartToolbarItems', getChartToolbarItems);
  $: updateProp('createChartContainer', createChartContainer);
  $: updateProp('chartThemes', chartThemes);
  $: updateProp('customChartThemes', customChartThemes);
  $: updateProp('chartThemeOverrides', chartThemeOverrides);
  // Keyboard Navigation
  $: updateProp('navigateToNextHeader', navigateToNextHeader);
  $: updateProp('tabToNextHeader', tabToNextHeader);
  $: updateProp('navigateToNextCell', navigateToNextCell);
  $: updateProp('tabToNextCell', tabToNextCell);
  // Loading Cell Renderers
  $: updateProp('loadingCellRenderer', loadingCellRenderer);
  $: updateProp('loadingCellRendererParams', loadingCellRendererParams);
  $: updateProp('loadingCellRendererSelector', loadingCellRendererSelector);
  // Localisation
  $: updateProp('localeText', localeText);
  $: updateProp('getLocaleText', getLocaleText);
  // Master Detail
  $: updateProp('masterDetail', masterDetail);
  $: updateProp('isRowMaster', isRowMaster);
  $: updateProp('detailCellRenderer', detailCellRenderer);
  $: updateProp('detailCellRendererParams', detailCellRendererParams);
  $: updateProp('detailRowHeight', detailRowHeight);
  $: updateProp('detailRowAutoHeight', detailRowAutoHeight);
  $: updateProp('embedFullWidthRows', embedFullWidthRows);
  $: updateProp('keepDetailRows', keepDetailRows);
  $: updateProp('keepDetailRowsCount', keepDetailRowsCount);
  // Miscellaneous
  $: updateProp('api', api);
  $: updateProp('columnApi', columnApi);
  $: updateProp('alignedGrids', alignedGrids);
  $: updateProp('context', context);
  $: updateProp('tabIndex', tabIndex);
  $: updateProp('rowBuffer', rowBuffer);
  $: updateProp('valueCache', valueCache);
  $: updateProp('valueCacheNeverExpires', valueCacheNeverExpires);
  $: updateProp('enableCellExpressions', enableCellExpressions);
  $: updateProp('getDocument', getDocument);
  $: updateProp('suppressParentsInRowNodes', suppressParentsInRowNodes);
  $: updateProp('suppressTouch', suppressTouch);
  $: updateProp('suppressFocusAfterRefresh', suppressFocusAfterRefresh);
  $: updateProp('suppressAsyncEvents', suppressAsyncEvents);
  $: updateProp('suppressBrowserResizeObserver', suppressBrowserResizeObserver);
  $: updateProp('suppressPropertyNamesCheck', suppressPropertyNamesCheck);
  $: updateProp('suppressChangeDetection', suppressChangeDetection);
  $: updateProp('debug', debug);
  // Overlays
  $: updateProp('overlayLoadingTemplate', overlayLoadingTemplate);
  $: updateProp('loadingOverlayComponent', loadingOverlayComponent);
  $: updateProp('loadingOverlayComponentParams', loadingOverlayComponentParams);
  $: updateProp('suppressLoadingOverlay', suppressLoadingOverlay);
  $: updateProp('overlayNoRowsTemplate', overlayNoRowsTemplate);
  $: updateProp('noRowsOverlayComponent', noRowsOverlayComponent);
  $: updateProp('noRowsOverlayComponentParams', noRowsOverlayComponentParams);
  $: updateProp('suppressNoRowsOverlay', suppressNoRowsOverlay);
  // Pagination
  $: updateProp('pagination', pagination);
  $: updateProp('paginationPageSize', paginationPageSize);
  $: updateProp('paginationNumberFormatter', paginationNumberFormatter);
  $: updateProp('paginationAutoPageSize', paginationAutoPageSize);
  $: updateProp('paginateChildRows', paginateChildRows);
  $: updateProp('suppressPaginationPanel', suppressPaginationPanel);
  // Pivot and Aggregation
  $: updateProp('pivotMode', pivotMode);
  $: updateProp('pivotPanelShow', pivotPanelShow);
  $: updateProp('pivotColumnGroupTotals', pivotColumnGroupTotals);
  $: updateProp('pivotRowTotals', pivotRowTotals);
  $: updateProp('pivotSuppressAutoColumn', pivotSuppressAutoColumn);
  $: updateProp('processPivotResultColDef', processPivotResultColDef);
  $: updateProp('processPivotResultColGroupDef', processPivotResultColGroupDef);
  $: updateProp('suppressExpandablePivotGroups', suppressExpandablePivotGroups);
  $: updateProp('functionsReadOnly', functionsReadOnly);
  $: updateProp('aggFuncs', aggFuncs);
  $: updateProp('getGroupRowAgg', getGroupRowAgg);
  $: updateProp('suppressAggFuncInHeader', suppressAggFuncInHeader);
  $: updateProp('suppressAggAtRootLevel', suppressAggAtRootLevel);
  $: updateProp('aggregateOnlyChangedColumns', aggregateOnlyChangedColumns);
  $: updateProp('suppressAggFilteredOnly', suppressAggFilteredOnly);
  $: updateProp('groupAggFiltering', groupAggFiltering);
  $: updateProp(
    'removePivotHeaderRowWhenSingleValueColumn',
    removePivotHeaderRowWhenSingleValueColumn
  );
  // Rendering
  $: updateProp('animateRows', animateRows);
  $: updateProp('enableCellChangeFlash', enableCellChangeFlash);
  $: updateProp('cellFlashDelay', cellFlashDelay);
  $: updateProp('cellFadeDelay', cellFadeDelay);
  $: updateProp('allowShowChangeAfterFilter', allowShowChangeAfterFilter);
  $: updateProp('domLayout', domLayout);
  $: updateProp('ensureDomOrder', ensureDomOrder);
  $: updateProp('getBusinessKeyForNode', getBusinessKeyForNode);
  $: updateProp('processRowPostCreate', processRowPostCreate);
  $: updateProp('enableRtl', enableRtl);
  $: updateProp('suppressColumnVirtualisation', suppressColumnVirtualisation);
  $: updateProp('suppressRowVirtualisation', suppressRowVirtualisation);
  $: updateProp('suppressMaxRenderedRowRestriction', suppressMaxRenderedRowRestriction);
  // Row Drag and Drop
  $: updateProp('rowDragManaged', rowDragManaged);
  $: updateProp('rowDragEntireRow', rowDragEntireRow);
  $: updateProp('rowDragMultiRow', rowDragMultiRow);
  $: updateProp('suppressRowDrag', suppressRowDrag);
  $: updateProp('suppressMoveWhenRowDragging', suppressMoveWhenRowDragging);
  // Row Full Width
  $: updateProp('fullWidthCellRenderer', fullWidthCellRenderer);
  $: updateProp('fullWidthCellRendererParams', fullWidthCellRendererParams);
  // Row Grouping
  $: updateProp('groupDisplayType', groupDisplayType);
  $: updateProp('groupDefaultExpanded', groupDefaultExpanded);
  $: updateProp('autoGroupColumnDef', autoGroupColumnDef);
  $: updateProp('groupMaintainOrder', groupMaintainOrder);
  $: updateProp('groupSelectsChildren', groupSelectsChildren);
  $: updateProp('groupIncludeFooter', groupIncludeFooter);
  $: updateProp('groupIncludeTotalFooter', groupIncludeTotalFooter);
  $: updateProp('groupSuppressBlankHeader', groupSuppressBlankHeader);
  $: updateProp('groupRowsSticky', groupRowsSticky);
  $: updateProp('groupSelectsFiltered', groupSelectsFiltered);
  $: updateProp('showOpenedGroup', showOpenedGroup);
  $: updateProp('isGroupOpenByDefault', isGroupOpenByDefault);
  $: updateProp('initialGroupOrderComparator', initialGroupOrderComparator);
  $: updateProp('groupRemoveSingleChildren', groupRemoveSingleChildren);
  $: updateProp('groupRemoveLowestSingleChildren', groupRemoveLowestSingleChildren);
  $: updateProp('groupHideOpenParents', groupHideOpenParents);
  $: updateProp('rowGroupPanelShow', rowGroupPanelShow);
  $: updateProp('groupRowRenderer', groupRowRenderer);
  $: updateProp('groupRowRendererParams', groupRowRendererParams);
  // $: updateProp('suppressDragLeaveHidesColumns', suppressDragLeaveHidesColumns);
  // $: updateProp('suppressRowGroupHidesColumns', suppressRowGroupHidesColumns);
  $: updateProp('suppressMakeColumnVisibleAfterUnGroup', suppressMakeColumnVisibleAfterUnGroup);
  $: updateProp('treeData', treeData);
  $: updateProp('getDataPath', getDataPath);
  // Row Pinning
  $: updateProp('pinnedTopRowData', pinnedTopRowData);
  $: updateProp('pinnedBottomRowData', pinnedBottomRowData);
  // RowModel
  $: updateProp('rowModelType', rowModelType);
  $: updateProp('getRowId', getRowId);
  // RowModel: Client-Side
  $: isClientSide = rowModelType == null || rowModelType === 'clientSide';
  $: if (isClientSide) updateProp('rowData', rowData);
  $: if (isClientSide) updateProp('resetRowDataOnUpdate', resetRowDataOnUpdate);
  $: if (isClientSide) updateProp('asyncTransactionWaitMillis', asyncTransactionWaitMillis);
  $: if (isClientSide)
    updateProp(
      'suppressModelUpdateAfterUpdateTransaction',
      suppressModelUpdateAfterUpdateTransaction
    );
  // RowModel: Infinite
  $: if (rowModelType === 'infinite') updateProp('datasource', datasource);
  $: if (rowModelType === 'infinite') updateProp('cacheOverflowSize', cacheOverflowSize);
  $: if (rowModelType === 'infinite')
    updateProp('maxConcurrentDatasourceRequests', maxConcurrentDatasourceRequests);
  $: if (rowModelType === 'infinite' || rowModelType === 'serverSide')
    updateProp('cacheBlockSize', cacheBlockSize);
  $: if (rowModelType === 'infinite' || rowModelType === 'serverSide')
    updateProp('maxBlocksInCache', maxBlocksInCache);
  $: if (rowModelType === 'infinite' || rowModelType === 'serverSide')
    updateProp('infiniteInitialRowCount', infiniteInitialRowCount);
  // RowModel: Server-Side
  $: if (rowModelType === 'serverSide') updateProp('serverSideDatasource', serverSideDatasource);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideInfiniteScroll', serverSideInfiniteScroll);
  // $: if (rowModelType === 'serverSide') updateProp('cacheBlockSize', cacheBlockSize);
  // $: if (rowModelType === 'serverSide') updateProp('maxBlocksInCache', maxBlocksInCache);
  // $: if (rowModelType === 'serverSide')
  //   updateProp('maxConcurrentDatasourceRequests', maxConcurrentDatasourceRequests);
  $: if (rowModelType === 'serverSide')
    updateProp('blockLoadDebounceMillis', blockLoadDebounceMillis);
  $: if (rowModelType === 'serverSide') updateProp('purgeClosedRowNodes', purgeClosedRowNodes);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideSortAllLevels', serverSideSortAllLevels);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideFilterAllLevels', serverSideFilterAllLevels);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideSortOnServer', serverSideSortOnServer);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideFilterOnServer', serverSideFilterOnServer);
  $: if (rowModelType === 'serverSide')
    updateProp('serverSideInitialRowCount', serverSideInitialRowCount);
  $: if (rowModelType === 'serverSide') updateProp('getChildCount', getChildCount);
  $: if (rowModelType === 'serverSide')
    updateProp('getServerSideGroupLevelParams', getServerSideGroupLevelParams);
  $: if (rowModelType === 'serverSide')
    updateProp('isServerSideGroupOpenByDefault', isServerSideGroupOpenByDefault);
  $: if (rowModelType === 'serverSide')
    updateProp('isApplyServerSideTransaction', isApplyServerSideTransaction);
  $: if (rowModelType === 'serverSide') updateProp('isServerSideGroup', isServerSideGroup);
  $: if (rowModelType === 'serverSide') updateProp('getServerSideGroupKey', getServerSideGroupKey);
  // RowModel: Viewport
  $: if (rowModelType === 'viewport') updateProp('viewportDatasource', viewportDatasource);
  $: if (rowModelType === 'viewport')
    updateProp('viewportRowModelPageSize', viewportRowModelPageSize);
  $: if (rowModelType === 'viewport')
    updateProp('viewportRowModelBufferSize', viewportRowModelBufferSize);
  // Scrolling
  $: updateProp('alwaysShowHorizontalScroll', alwaysShowHorizontalScroll);
  $: updateProp('alwaysShowVerticalScroll', alwaysShowVerticalScroll);
  $: updateProp('debounceVerticalScrollbar', debounceVerticalScrollbar);
  $: updateProp('suppressHorizontalScroll', suppressHorizontalScroll);
  $: updateProp('suppressScrollOnNewData', suppressScrollOnNewData);
  $: updateProp('suppressScrollWhenPopupsAreOpen', suppressScrollWhenPopupsAreOpen);
  $: updateProp('suppressAnimationFrame', suppressAnimationFrame);
  $: updateProp('suppressMiddleClickScrolls', suppressMiddleClickScrolls);
  $: updateProp('suppressPreventDefaultOnMouseWheel', suppressPreventDefaultOnMouseWheel);
  $: updateProp('scrollbarWidth', scrollbarWidth);
  // Selection
  $: updateProp('rowSelection', rowSelection);
  $: updateProp('rowMultiSelectWithClick', rowMultiSelectWithClick);
  $: updateProp('isRowSelectable', isRowSelectable);
  $: updateProp('suppressRowDeselection', suppressRowDeselection);
  $: updateProp('suppressRowClickSelection', suppressRowClickSelection);
  $: updateProp('suppressCellFocus', suppressCellFocus);
  $: updateProp('suppressMultiRangeSelection', suppressMultiRangeSelection);
  $: updateProp('enableCellTextSelection', enableCellTextSelection);
  $: updateProp('enableRangeSelection', enableRangeSelection);
  $: updateProp('enableRangeHandle', enableRangeHandle);
  $: updateProp('enableFillHandle', enableFillHandle);
  $: updateProp('fillHandleDirection', fillHandleDirection);
  $: updateProp('fillOperation', fillOperation);
  $: updateProp('suppressClearOnFillReduction', suppressClearOnFillReduction);
  // Sorting
  $: updateProp('sortingOrder', sortingOrder);
  $: updateProp('accentedSort', accentedSort);
  $: updateProp('unSortIcon', unSortIcon);
  $: updateProp('suppressMultiSort', suppressMultiSort);
  $: updateProp('alwaysMultiSort', alwaysMultiSort);
  $: updateProp('multiSortKey', multiSortKey);
  $: updateProp('suppressMaintainUnsortedOrder', suppressMaintainUnsortedOrder);
  $: updateProp('postSortRows', postSortRows);
  $: updateProp('deltaSort', deltaSort);
  // Styling
  $: updateProp('icons', icons);
  $: updateProp('rowHeight', rowHeight);
  $: updateProp('getRowHeight', getRowHeight);
  $: updateProp('rowStyle', rowStyle);
  $: updateProp('getRowStyle', getRowStyle);
  $: updateProp('rowClass', rowClass);
  $: updateProp('getRowClass', getRowClass);
  $: updateProp('rowClassRules', rowClassRules);
  $: updateProp('isFullWidthRow', isFullWidthRow);
  $: updateProp('suppressRowHoverHighlight', suppressRowHoverHighlight);
  $: updateProp('suppressRowTransform', suppressRowTransform);
  $: updateProp('columnHoverHighlight', columnHoverHighlight);

  // TODO: events
  // TODO: custom row model
</script>

<div bind:this={eGui} style:height="100%" {style} class={className} />
