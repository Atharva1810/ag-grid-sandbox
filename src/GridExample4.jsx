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
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ margin: "auto", width: "80%", height: "80vh" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  const [addedItems, setAddedItems] = useState([
    {
      athlete: "Atharva Dere",
      age: 23,
      country: "United States",
      year: 2008,
      date: "24/08/2008",
      sport: "Swimming",
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
    },
    {
      athlete: "Piyush Deore",
      country: "United States",
      year: 2008,
    },
    {
      athlete: "Pranav Chougule",
      sport: "Stalking",
      gold: 69,
      silver: 0,
      bronze: 0,
      total: 69,
    },
  ]);
  const [toggleItems, setToggleItems] = useState(false);
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

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  useEffect(() => {
    if (gridRef.current.api) {
      // Add items
      if (toggleItems && addedItems.length !== 0) {
        const res = gridRef.current.api.applyTransaction({
          add: addedItems,
        });
      }
      // Remove items
      else if (!toggleItems) {
        const res = gridRef.current.api.applyTransaction({
          remove: addedItems,
        });
      }
    }
  }, [toggleItems]);


  return (
    <div style={containerStyle}>
      <button
        style={{ margin: "1rem 1rem 1rem 0", padding: "0.5rem", font: "Arial" }}
        onClick={() => {
          setToggleItems(true);
        }}
      >
        Add rows
      </button>
      <button
        style={{ margin: "1rem 1rem 1rem 0", padding: "0.5rem", font: "Arial" }}
        onClick={() => {
          setToggleItems(false);
        }}
      >
        Remove rows
      </button>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;
