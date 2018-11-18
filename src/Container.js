import { h } from "preact";

export const Container = props => (
  <div class={props.fullHeight ? "container-full" : "container"}>
    {props.children}
  </div>
);
