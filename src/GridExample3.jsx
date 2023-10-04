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

const GridExample = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState(columnDefsWithGrouping);

  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [groupByCountry, setGroupByCountry] = useState(true);

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
  }, [sideBarVisible, gridApi]);

  useEffect(() => {
    if (gridApi) {
      if (groupByCountry) {
        console.log(
          "Seeting column defs with grouping",
          columnDefsWithGrouping
        );
        gridApi.setColumnDefs(columnDefsWithGrouping);
        // setColumnDefs(columnDefsWithGrouping);
      } else {
        // gridColumnApi.setRowGroupColumns();
        // setColumnDefs(columnDefsWithoutGrouping);
        gridApi.setColumnDefs(columnDefsWithoutGrouping);
      }
    }
  }, [groupByCountry, gridApi]);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  useEffect(() => {
    if (gridApi) {
      console.log("Grouping: ", groupByCountry);
      console.log("api column defs: ", gridColumnApi.getAllGridColumns());
      console.log("column defs: ", columnDefs);
    }
  }, [gridApi, groupByCountry, columnDefs]);

  // apply custom styles to the exported excel file to freeze the header
  const excelStyles = [
    {
      id: "header",
      font: {
        bold: true,
      },
      fill: {
        type: "pattern",
        patternType: "solid",
        fgColor: "#D9D9D9",
      },
      border: {
        top: {
          style: "thin",
          color: "#000000",
        },
        left: {
          style: "thin",
          color: "#000000",
        },
        bottom: {
          style: "thin",
          color: "#000000",
        },
        right: {
          style: "thin",
          color: "#000000",
        },
      },
    },
  ];

  const exportAsXL = (params) => {
    gridApi.exportDataAsExcel({
      fileName: "myFile.xlsx",
      sheetName: "Sheet1",
      headerRowHeight: 25, // set the height of the header row to freeze it
    });
  };

  const getRows = () => [
    { cells: [] },
    {
      cells: [
        {
          data: {
            value: 'Here is a comma, and a some "quotes".',
            type: 'String',
          },
        },
      ],
    },
    {
      cells: [
        {
          data: {
            value:
              'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
            type: 'String',
          },
        },
      ],
    },
    {
      cells: [
        { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
        {
          data: {
            value: 'is empty because the first cell has mergeAcross=1',
            type: 'String',
          },
        },
      ],
    },
    { cells: [] },
  ];
  

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
      <button
        style={{ margin: "1rem 1rem 1rem 0", padding: "0.5rem", font: "Arial" }}
        onClick={exportAsXL}
      >
        Download
      </button>
      <div style={gridStyle} className="ag-theme-alpine">
        {groupByCountry ? (
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
        ) : (
          <AgGridReact>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            components=
            {{
              DateHeader: DateHeader,
            }}
            tooltipShowDelay={0}
            tooltipHideDelay={2000}
            onGridReady={onGridReady}
          </AgGridReact>
        )}
      </div>
    </div>
  );
};

export default GridExample;
