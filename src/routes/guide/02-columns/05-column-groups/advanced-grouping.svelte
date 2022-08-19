<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColGroupDef, ColumnApi, HeaderClassParams } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  function headerClassFunc(params: HeaderClassParams) {
    let foundC = false;
    let foundG = false;
    // for the bottom row of headers, column is present,
    // otherwise columnGroup is present. we are guaranteed
    // at least one is always present.
    let item = params.column ? params.column : params.columnGroup;
    // walk up the tree, see if we are in C or F groups
    while (item) {
      // if groupId is set then this must be a group.
      const colDef = item.getDefinition() as ColGroupDef;
      if (colDef.groupId === 'GroupC') {
        foundC = true;
      } else if (colDef.groupId === 'GroupG') {
        foundG = true;
      }
      item = item.getParent();
    }
    if (foundG) {
      return 'column-group-g';
    } else if (foundC) {
      return 'column-group-c';
    }
  }

  const columnDefs = [
    {
      headerName: 'Group A',
      groupId: 'GroupA',
      children: [
        {
          headerName: 'Athlete 1',
          field: 'athlete',
          width: 150,
          filter: 'agTextColumnFilter'
        },
        {
          headerName: 'Group B',
          groupId: 'GroupB',
          children: [
            { headerName: 'Country 1', field: 'country', width: 120 },
            {
              headerName: 'Group C',
              groupId: 'GroupC',
              children: [
                { headerName: 'Sport 1', field: 'sport', width: 110 },
                {
                  headerName: 'Group D',
                  groupId: 'GroupD',
                  children: [
                    {
                      headerName: 'Total 1',
                      field: 'total',
                      width: 100,
                      filter: 'agNumberColumnFilter'
                    },
                    {
                      headerName: 'Group E',
                      groupId: 'GroupE',
                      openByDefault: true,
                      children: [
                        {
                          headerName: 'Gold 1',
                          field: 'gold',
                          width: 100,
                          filter: 'agNumberColumnFilter'
                        },
                        {
                          headerName: 'Group F',
                          groupId: 'GroupF',
                          openByDefault: true,
                          children: [
                            {
                              headerName: 'Silver 1',
                              field: 'silver',
                              width: 100,
                              filter: 'agNumberColumnFilter'
                            },
                            {
                              headerName: 'Group G',
                              groupId: 'GroupG',
                              children: [
                                {
                                  headerName: 'Bronze',
                                  field: 'bronze',
                                  width: 100,
                                  filter: 'agNumberColumnFilter'
                                }
                              ]
                            },
                            {
                              headerName: 'Silver 2',
                              columnGroupShow: 'open',
                              field: 'silver',
                              width: 100,
                              filter: 'agNumberColumnFilter'
                            }
                          ]
                        },
                        {
                          headerName: 'Gold 2',
                          columnGroupShow: 'open',
                          field: 'gold',
                          width: 100,
                          filter: 'agNumberColumnFilter'
                        }
                      ]
                    },
                    {
                      headerName: 'Total 2',
                      columnGroupShow: 'open',
                      field: 'total',
                      width: 100,
                      filter: 'agNumberColumnFilter'
                    }
                  ]
                },
                {
                  headerName: 'Sport 2',
                  columnGroupShow: 'open',
                  field: 'sport',
                  width: 110
                }
              ]
            },
            {
              headerName: 'Country 2',
              columnGroupShow: 'open',
              field: 'country',
              width: 120
            }
          ]
        },
        {
          headerName: 'Age 2',
          columnGroupShow: 'open',
          field: 'age',
          width: 90,
          filter: 'agNumberColumnFilter'
        }
      ]
    },
    {
      headerName: 'Athlete 2',
      columnGroupShow: 'open',
      field: 'athlete',
      width: 150,
      filter: 'agTextColumnFilter'
    }
  ];

  const defaultColGroupDef = { headerClass: headerClassFunc };

  const defaultColDef = {
    headerClass: headerClassFunc,
    sortable: true,
    resizable: true,
    filter: true
  };

  const icons = {
    columnGroupOpened: '<i class="far fa-minus-square"/>',
    columnGroupClosed: '<i class="far fa-plus-square"/>'
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }

  let columnApi: ColumnApi;

  const expandAll = (expand: boolean) => {
    const groupNames = ['GroupA', 'GroupB', 'GroupC', 'GroupD', 'GroupE', 'GroupF', 'GroupG'];
    groupNames.forEach((groupId) => {
      columnApi.setColumnGroupOpened(groupId, expand);
    });
  };
</script>

<h2>Advanced Grouping</h2>

<div>
  <button on:click={() => expandAll(true)}>Expand All</button>
  <button on:click={() => expandAll(false)}>Contract All</button>
</div>

<div style:height="700px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColGroupDef}
    {defaultColDef}
    {icons}
    {onGridReady}
    bind:columnApi
  />
</div>

<style>
  .ag-theme-alpine :global(.column-group-g) {
    background-color: #1b6d85 !important;
  }

  .ag-theme-alpine :global(.column-group-c) {
    background-color: #67b168 !important;
  }
</style>
