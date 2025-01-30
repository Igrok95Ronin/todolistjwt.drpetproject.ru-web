import * as React from "react";
import BasicButtonGroup from "../components/BasicButtonGroup/BasicButtonGroup";
import ReactVirtualizedTable from "../components/ReactVirtualizedTable/ReactVirtualizedTable";
import BasicTextFields from "../components/BasicTextFields/BasicTextFields"; 

import "../App.scss";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);

  return (
    <section className="main">
      <div className="container">
        <div className="main__box">
          <h1 className="main__title">To-do list</h1>
          <BasicTextFields setLoading={setLoading} />
          {/* <NotesList loading={loading} setLoading={setLoading} /> */}
          <ReactVirtualizedTable loading={loading} setLoading={setLoading} setCount={setCount} />
          <BasicButtonGroup setLoading={setLoading} count={count} />
        </div>
      </div>
    </section>
  );
}

export default Home;
