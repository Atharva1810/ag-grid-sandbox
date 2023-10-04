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
  const [activeColumnState, setActiveColumnState] = useState(null);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefinitionsHard = [
    { field: "country" },
    { field: "year" },
    { field: "athlete" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  const [columnDefs, setColumnDefs] = useState(columnDefinitionsHard);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    if (gridColumnApi) {
      console.log(`${"#".repeat(24)} Setting column state ${"#".repeat(24)}`);
      gridColumnApi.applyColumnState({
        state: JSON.parse(sessionStorage.getItem("gridUnGroupingColumnState")),
        applyOrder: true,
      });
    }

    return () => {
      if (gridColumnApi) {
        console.log(`${"=".repeat(24)} COMPONENT UNMOUNTING ${"=".repeat(24)}`);
        console.log("Column state", activeColumnState);
        sessionStorage.setItem(
          "gridUnGroupingColumnState",
          JSON.stringify(activeColumnState)
        );
      }
    };
  }, [gridColumnApi]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onColumnEverythingChanged = useCallback((params) => {
    console.log("*".repeat(47));
    console.log(`Sauce ${params.source}`);
    console.log("params", params);
    const columnState = params.columnApi.getColumnState();
    console.log("Column state", columnState);
    setActiveColumnState(columnState);
  }, []);


  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onGridReady={onGridReady}
          onColumnEverythingChanged={onColumnEverythingChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;
