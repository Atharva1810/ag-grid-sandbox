import "./App.css";
import { useState } from "react";
// import GroupedGrid from "./GroupedGrid";
// import UnGroupedGrid from "./UnGroupedGrid";

// import GridExample from "./GridExample";
// import GridExample from "./GridExample4";
import GridExample from "./ivs-sorting/GroupedGrid";

function App() {
  // const [groupedViewSelected, setGroupedViewSelected] = useState(true);
  // return (
  //   <>
  //     {groupedViewSelected ? <p>Grouping</p> : <p>No grouping</p>}
  //     <button
  //       onClick={() => {
  //         setGroupedViewSelected((prev) => !prev);
  //       }}
  //     >
  //       Change grouping
  //     </button>
  //     {groupedViewSelected ? <GroupedGrid /> : <UnGroupedGrid />}
  //   </>
  // );
  return <GridExample />
}

export default App;
