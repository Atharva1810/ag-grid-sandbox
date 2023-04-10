import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";
import "ag-grid-enterprise";

import {
  columnDefsWithoutGrouping,
  columnDefsWithGrouping,
  containerStyle,
  sideBar,
} from "./gridConfig";

import { DateHeader } from "./headerComponents";
import { TotalMedalsToolTip } from "./toolTips";
const GridExample = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
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
      ],
    },
    {
      headerName: "Total",
      field: "total",
      aggFunc: "sum",
      tooltipField: "total",
      tooltipComponent: TotalMedalsToolTip,
    },
  ]);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [groupByCountry, setGroupByCountry] = useState(false);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    if (gridApi) {
      gridApi.setSideBarVisible(sideBarVisible);
    }
  }, [sideBarVisible]);

  useEffect(() => {
    if (gridColumnApi) {
      if (groupByCountry) {
        gridColumnApi.setRowGroupColumns(["country", "athlete"]);
        gridColumnApi.setColumnsVisible(["country", "athlete"], false);
      } else {
        gridColumnApi.setRowGroupColumns();
        gridColumnApi.setColumnsVisible(["country", "athlete"], true);
      }
    }
  }, [groupByCountry]);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  return (
    <div style={containerStyle}>
      <button
        style={{ margin: "1rem 1rem 1rem 0", padding: "0.5rem", font: "Arial" }}
        onClick={() => setSideBarVisible((prev) => !prev)}
      >
        Sidebar
      </button>
      <button
        style={{ margin: "1rem 1rem 1rem 0", padding: "0.5rem", font: "Arial" }}
        onClick={() => setGroupByCountry((prev) => !prev)}
      >
        Group
      </button>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          components={{
            DateHeader: DateHeader,
          }}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          onGridReady={onGridReady}
          autoGroupColumnDef={{
            headerName: "Details",
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;
