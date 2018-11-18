import { h } from "preact";

export const Footer = () => (
  <footer>
    <hr />
    <p>
      All data comes directly from{" "}
      <a href="https://npmjs.org/" target="_blank" native>
        npm
      </a>
      . is not affiliated with npm, Inc. in any way.{" "}
      <a href="#" native>
        npmstats.org
      </a>{" "}
      is massively inspired by the wonderful{" "}
      <a href="https://npm-stat.com/" target="_blank">
        npm-stat.com
      </a>
      . I built{" "}
      <a href="https://npm-stat.com/" target="_blank">
        npm-stat.com
      </a>{" "}
      to explore different frontend frameworks and Cloudflare workers.
    </p>
    <p class="created-by">
      <a href="https://www.dferber.de/" native target="_blank">
        @dferber90
      </a>
    </p>
  </footer>
);
