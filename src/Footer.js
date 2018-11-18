import { h } from "preact";

const ExampleSearches = () => (
  <div class="exampleSearches">
    <div class="exampleSearchesContainer">
      <h4>Example searches</h4>
      <ul>
        <li>
          <a href="/webpack" title="Search for a single package">
            webpack
          </a>
        </li>
        <li class="spacer">|</li>
        <li>
          <a href="/enzyme,jest" title="Search for multiple packages">
            enzyme, jest
          </a>
        </li>
        <li class="spacer">|</li>
        <li>
          <a href="/@babel:core" title="Search for scoped packages">
            @babel/core
          </a>
        </li>
        <li class="spacer">|</li>
        <li>
          <a href="/@dferber90" title="Search for an author">
            @dferber90
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const About = () => (
  <div class="about">
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
    <p class="searchInfo">
      The earliest date for which data will be returned is January 10, 2015.{" "}
      <a
        href="https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts"
        target="_blank"
      >
        Learn more
      </a>{" "}
      about how npm download counts work. These statistics are not provided in
      real-time. All numbers will change at most once per day.
    </p>
  </div>
);

export const Footer = () => (
  <footer class="info">
    <ExampleSearches />
    <About />
  </footer>
);
