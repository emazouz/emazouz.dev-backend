import React from "react";
import Header from "./Header";
import Aside from "./Aside";

const ParentComponent = (props) => {
  return (
    <div>
      <Header handleAsideOpen={props.appAsideOpen} />
      <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen} />
    </div>
  );
};

export default ParentComponent;
