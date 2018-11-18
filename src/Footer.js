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
    <div class="aboutText">
      <h4>Inspiration</h4>
      <p>
        This project is massively inspired by the wonderful{" "}
        <a href="https://npm-stat.com/" target="_blank">
          npm-stat.com
        </a>{" "}
        and by{" "}
        <a href="https://bundlephobia.com/" target="_blank">
          bundlephobia.com
        </a>
        . I built this site to explore different frontend frameworks and to play
        with Cloudflare workers.
      </p>
      <h4>Disclaimer</h4>
      <p>
        <a href="#" native>
          npmstats.org
        </a>{" "}
        is not affiliated with npm, Inc. in any way.
      </p>
      <h4>how npm download counts work</h4>
      <p>
        &quot;
        <i>
          npm’s download stats are naïve by design: they are simply a count of
          the number of HTTP 200 responses served that were tarball files, i.e.
          packages. This means the number includes: automated build servers,
          downloads by mirrors and robots that download every package for
          analysis. So the count of “downloads” is much larger than the number
          of people who typed “npm install yourpackage” on any given day.
        </i>
        &quot;
      </p>
      <p>
        Learn more in the blog post{" "}
        <a
          href="https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts"
          target="_blank"
        >
          &quot;numeric precision matters: how npm download counts work&quot;
        </a>
        .
      </p>
      <h4>Data</h4>
      <p>
        All is read directly from{" "}
        <a href="https://npmjs.org/" target="_blank" native>
          npm
        </a>
        . The earliest date for which data will be returned is January 10, 2015.{" "}
        <a
          href="https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts"
          target="_blank"
        >
          Learn more
        </a>{" "}
        about how npm download counts work. These statistics are not provided in
        real-time. All numbers will change at most once per day.
      </p>
      <h4>Report Issues</h4>
      <p>
        If you ran into any problem, you can head over to{" "}
        <a href="https://github.com/dferber90/npmstats" native target="_blank">
          GitHub
        </a>{" "}
        and open a new issue. You can also create a new issue in case you've got
        a feature suggestion.
      </p>
      <p>
        I'd appreciate a star on{" "}
        <a href="https://github.com/dferber90/npmstats" native target="_blank">
          GitHub
        </a>{" "}
        if you've found this project useful :)
      </p>
    </div>
    <p class="created-by">
      <a href="https://www.dferber.de/" native target="_blank">
        dferber.de
      </a>
    </p>
  </div>
);

export const Footer = () => (
  <footer class="info">
    <ExampleSearches />
    <About />
  </footer>
);
