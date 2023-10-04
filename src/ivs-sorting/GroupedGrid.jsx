import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridExample = () => {
  const containerStyle = useMemo(
    () => ({ margin: "auto", width: "80%", height: "80vh" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    // { field: "date" },
    { field: "sport" },
    // { field: "gold" },
    // { field: "silver" },
    // { field: "bronze" },
    {
      field: "total",
      aggFunc: "sum",
      sort: "desc",
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
        if (valueA && valueB) {
          if (valueA == valueB) {
            return nodeA.data.athlete < nodeB.data.athlete;
          }
          return valueA - valueB;
        }
        return 0;
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = {
    //   comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
    //     const res = valueA == valueB ? 0 : valueA > valueB ? 1 : -1;
    //     return res;
    //   },
    headerName: "Athlete",
    field: "athlete",
    cellRendererParams: {
      innerRenderer: (params) => {
        console.log(params.value);
        return <span>{params.value}</span>;
      },
    },

    //   sort: "asc",
    //   sortIndex: 0
  };

  const initialGroupOrderComparator = useCallback((params) => {
    const a = params.nodeA.key || "";
    const b = params.nodeB.key || "";
    // console.log(params.nodeA.key)
    // console.log(params.nodeB.key)
    return a < b ? -1 : a > b ? 1 : 0;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const buttonStyle = {
    margin: "1rem 1rem 1rem 0",
    padding: "0.5rem",
    font: "Arial",
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={() => {
          setColumnDefs((currColDefs) => {
            return currColDefs.map((col) => {
              if (col.field === "country") {
                return {
                  field: "country",
                  hide: true,
                  rowGroup: true,
                  rowGroupIndex: 0,
                };
              }
              return col;
            });
          });
        }}
      >
        Group by Country(L1)
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          setColumnDefs((currColDefs) => {
            return currColDefs.map((col) => {
              if (col.field === "country") {
                return {
                  field: "country",
                  hide: true,
                  rowGroup: true,
                  rowGroupIndex: 0,
                };
              }
              if (col.field === "year") {
                return {
                  field: "year",
                  hide: true,
                  rowGroup: true,
                  rowGroupIndex: 1,
                };
              }
              return col;
            });
          });
        }}
      >
        Group by Country and year(L2)
      </button>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          onGridReady={onGridReady}
          groupMaintainOrder={true}
          initialGroupOrderComparator={initialGroupOrderComparator}
        />
      </div>
    </div>
  );
};

export default GridExample;
