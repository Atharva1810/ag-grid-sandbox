import React, { useMemo } from "react";
export const TotalMedalsToolTip = (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );

  const goldPercentWidth = ((data.gold * 2 * 100) / data.total).toFixed(0);
  const silverPercentWidth = ((data.silver * 2 * 100) / data.total).toFixed(0);
  const bronzePercentWidth = ((data.bronze * 2 * 100) / data.total).toFixed(0);

  return (
    <div
      style={{
        border: "1px solid cornflowerblue",
        overflow: "hidden",
        display: "flex",
        width: "220px",
        height: "70px",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          minWidth: `${goldPercentWidth}px`,
          height: "25px",
          backgroundColor: "gold",
        }}
      ></span>
      <span
        style={{
          minWidth: `${silverPercentWidth}px`,
          height: "25px",
          backgroundColor: "silver",
        }}
      ></span>
      <span
        style={{
          minWidth: `${bronzePercentWidth}px`,
          height: "25px",
          backgroundColor: "brown",
        }}
      ></span>
    </div>
  );
};
