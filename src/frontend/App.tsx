import * as React from "react";
import * as ReactDom from "react-dom";
import AppRouter from "./AppRouter";

const el = document.createElement("div");
document.body.appendChild(el);
ReactDom.render(<AppRouter />, el as HTMLElement);
