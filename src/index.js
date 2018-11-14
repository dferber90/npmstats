import { h, render } from "preact";
import { App } from "./App.js";

const app = document.getElementById("app");

render(<App />, app, app.lastChild);
