export const columnDefsWithoutGrouping = [
  {
    headerName: "Athlete Details",
    headerClass: "ag-header-cell",
    children: [
      {
        headerName: "Name",
        field: "athlete",
        minWidth: 200,
        filter: "agTextColumnFilter",
      },
      { headerName: "Age", field: "age", filter: "agNumberFilter" },
    ],
  },
  { field: "country", minWidth: 200 },
  {
    headerName: "Date",
    children: [
      { field: "year" },
      {
        headerName: "Date",
        colId: "dateDDMMYYYY",
        field: "date",
        minWidth: 180,
        suppressFiltersToolPanel: true,
        headerComponent: "DateHeader",
        valueGetter: function (params) {
          if (params.data) {
            const [dd, mm, yyyy] = params.data.date.split("/");
            return `${dd}-${mm}-${yyyy}`;
          }
        },
      },
      {
        headerName: "Date",
        colId: "dateMMDDYYYY",
        field: "date",
        minWidth: 180,
        suppressFiltersToolPanel: true,
        hide: true,
        headerComponent: "DateHeader",
        valueGetter: function (params) {
          if (params.data) {
            const [dd, mm, yyyy] = params.data.date.split("/");
            return `${mm}-${dd}-${yyyy}`;
          }
        },
      },
    ],
  },
  { headerName: "Sport", field: "sport", minWidth: 200 },
  {
    headerName: "Medals",
    children: [
      { field: "gold", aggFunc: "sum" },
      { field: "silver", aggFunc: "sum" },
      { field: "bronze", aggFunc: "sum" },
      {
        field: "total",
        aggFunc: "sum",
        tooltipField: "TotalMedalsToolTip",
      },
    ],
  },
];

export const columnDefsWithGrouping = [
  {
    headerName: "Athlete Details",
    headerClass: "ag-header-cell",
    children: [
      {
        headerName: "Name",
        field: "athlete",
        minWidth: 200,
        filter: "agTextColumnFilter",
        rowGroupIndex: 1,
      },
      { headerName: "Age", field: "age", filter: "agNumberFilter" },
    ],
  },
  { field: "country", minWidth: 200, rowGroupIndex: 0 },
  {
    headerName: "Date",
    children: [
      { field: "year" },
      {
        headerName: "Date",
        colId: "dateDDMMYYYY",
        field: "date",
        minWidth: 180,
        suppressFiltersToolPanel: true,
        headerComponent: "DateHeader",
        valueGetter: function (params) {
          if (params.data) {
            const [dd, mm, yyyy] = params.data.date.split("/");
            return `${dd}-${mm}-${yyyy}`;
          }
        },
      },
      {
        headerName: "Date",
        colId: "dateMMDDYYYY",
        field: "date",
        minWidth: 180,
        suppressFiltersToolPanel: true,
        hide: true,
        headerComponent: "DateHeader",
        valueGetter: function (params) {
          if (params.data) {
            const [dd, mm, yyyy] = params.data.date.split("/");
            return `${mm}-${dd}-${yyyy}`;
          }
        },
      },
    ],
  },
  { headerName: "Sport", field: "sport", minWidth: 200 },
  {
    headerName: "Medals",
    children: [
      { field: "gold", aggFunc: "sum" },
      { field: "silver", aggFunc: "sum" },
      { field: "bronze", aggFunc: "sum" },
      {
        field: "total",
        aggFunc: "sum",
        tooltipField: "TotalMedalsToolTip",
      },
    ],
  },
];
export const defaultColDef = {
  flex: 1,
  minWidth: 100,
  filter: true,
  sortable: true,
  resizable: true,
};
export const sideBar = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
    },
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
    },
  ],
  defaultToolPanel: "filters",
  hiddenByDefault: true,
};

export const containerStyle = {
  width: "95%",
  height: "70vh",
  margin: "2rem auto",
  padding: "1rem",
};
