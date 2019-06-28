import * as React from "react";
import * as ReactDom from "react-dom";

const el = document.createElement("div");
ReactDom.render(<>Hello</>, el as HTMLElement);
