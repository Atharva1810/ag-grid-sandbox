import "./App.css";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default () => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState([]);
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const columns = [
    { headerName: "Make", field: "make" },
    { headerName: "Price", field: "price" },
    { headerName: "Model", field: "model" },
  ];

  const defColumnDefs = {
    flex: 1,
    filter: "agNumberColumnFilter",
    suppressMenu: true,
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setSideBarVisible(sideBarVisible);
      gridApi.openToolPanel("filters");
    }
  }, [sideBarVisible]);

  const onGridReady = (params) => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((resp) => resp.json())
      .then((data) => {
        const temp = [];
        for (let i = 0; i < 100; i++) {
          temp.push(data[i]);
        }
        setRowData(temp);
      });
    setGridApi(params.api);
    expandFilters(params, "make");
  };

  const expandFilters = (params, ...filters) => {
    const applyFilters = filters?.length > 0 ? filters : null;
    params.api.getToolPanelInstance("filters").expandFilters(applyFilters);
  };

  const applyQuickFilter = (e) => {
    const searchText = e.target.value;
    gridApi.api.setQuickFilter(searchText);
  };
  return (
    <div style={{ height: "100vh" }}>
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Sidebar toolpanel with customization in AG Grid</p>
      <button
        onClick={() => {
          setSideBarVisible((prev) => !prev);
        }}
      >
        Toggle Sidebar
      </button>
      {/* <button
        onClick={() => {
          gridApi.setSideBarVisible(false);
        }}
      >
        Close Sidebar
      </button> */}
      <div className="ag-theme-alpine" style={{ height: 4300 }}>
        <AgGridReact
          rowData={rowData}
          ref={gridRef}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                  suppressPivotMode: true,
                  suppressRowGroups: true,
                  suppressValues: true,
                  suppressColumnFilter: false,
                  suppressColumnSelectAll: false,
                },
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
                toolPanelParams: {
                  suppressFilterSearch: true,
                  suppressExpandAll: true,
                },
              },
              {
                id: "QuickSearch",
                labelDefault: "Quick Search",
                labelKey: "QuickSearch",
                iconKey: "menu",
                toolPanel: () => (
                  <div>
                    <h4>Global Search</h4>
                    <input
                      placeholder="Search..."
                      type="search"
                      style={{
                        width: 190,
                        height: 35,
                        outline: "none",
                        border: "none",
                        borderBottom: `1px #181616 solid`,
                        padding: `0 5px`,
                      }}
                      onChange={applyQuickFilter}
                    />
                  </div>
                ),
              },
            ],
            hiddenByDefault: true,
            defaultToolPanel: "Filters",
            // position: "right",
          }}
        />
      </div>
    </div>
  );
};
