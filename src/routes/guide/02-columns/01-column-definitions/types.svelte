<script lang="ts">
  import AgGridSvelte from '$lib/AgGridSvelte.svelte';
  import type { ColDef, ColGroupDef } from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import type { IOlympicData } from '../../types';

  const columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'athlete' },
    { field: 'sport' },
    { field: 'age', type: 'numberColumn' },
    { field: 'year', type: 'numberColumn' },
    { field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220 },
    {
      headerName: 'Medals',
      groupId: 'medalsGroup',
      children: [
        { headerName: 'Gold', field: 'gold', type: 'medalColumn' },
        { headerName: 'Silver', field: 'silver', type: 'medalColumn' },
        { headerName: 'Bronze', field: 'bronze', type: 'medalColumn' },
        {
          headerName: 'Total',
          field: 'total',
          type: 'medalColumn',
          columnGroupShow: 'closed'
        }
      ]
    }
  ];

  const defaultColDef: ColDef = {
    width: 150,
    editable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    resizable: true
  };

  const defaultColGroupDef: Partial<ColGroupDef> = {
    marryChildren: true
  };

  const columnTypes = {
    numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
    medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
    nonEditableColumn: { editable: false },
    dateColumn: {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          const dateParts = cellValue.split('/');
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  };

  let rowData: IOlympicData[] = [];
  function onGridReady() {
    fetch('/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => (rowData = data));
  }
</script>

<h2>Custom Types</h2>
<div style:height="500px" class="ag-theme-alpine">
  <AgGridSvelte
    {rowData}
    {columnDefs}
    {defaultColDef}
    {defaultColGroupDef}
    {columnTypes}
    {onGridReady}
  />
</div>
