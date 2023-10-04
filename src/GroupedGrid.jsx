"use strict";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const containerStyle = useMemo(
    () => ({ margin: "auto", width: "80%", height: "80vh" }),
    []
  );

  const columnDefinitionsHard = [
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState(columnDefinitionsHard);
  const [activeColumnState, setActiveColumnState] = useState(null);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  useEffect(() => {
    if (gridColumnApi) {
      console.log(`${"#".repeat(24)} Setting column state ${"#".repeat(24)}`);
      gridColumnApi.applyColumnState({
        state: JSON.parse(sessionStorage.getItem("gridGroupingColumnState")),
        applyOrder: true,
      });
    }

    return () => {
      if (gridColumnApi) {
        console.log(`${'='.repeat(24)} COMPONENT UNMOUNTING ${'='.repeat(24)}`);
        console.log("Column state", activeColumnState);
        sessionStorage.setItem("gridGroupingColumnState", JSON.stringify(activeColumnState));
      }
    };
  }, [gridColumnApi, activeColumnState]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const columnChangeHandler = (params) => {
    console.log("*".repeat(47));
    console.log(`Sauce ${params.source}`);
    console.log("params", params);
    const columnState = params.columnApi.getColumnState();
    console.log("Column state", columnState);
    setActiveColumnState(columnState);
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          animateRows={true}
          onGridReady={onGridReady}
          onColumnVisible={columnChangeHandler}
          onColumnPinned={columnChangeHandler}
          onColumnMoved={columnChangeHandler}
          onSortChanged={columnChangeHandler}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;
