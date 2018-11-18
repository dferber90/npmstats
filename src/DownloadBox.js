import { h } from "preact";
import { colors } from "./colors";

const sumDownloads = (downloads = []) => {
  return downloads.reduce((acc, dls) => {
    acc += dls.downloads;
    return acc;
  }, 0);
};

const sum = list => {
  return list.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);
};

export const DownloadBox = props => {
  return (
    <div>
      {props.data.map(author => (
        <div key={author.author}>
          <table>
            <tr class="head">
              <td>
                {author.author ? `packages of ${author.author}` : "package"}
              </td>
              <td class="right">downloads</td>
            </tr>
            {author.packages.map((pkg, index) => (
              <tr key={pkg.name}>
                <td>
                  <a
                    href={`/${pkg.name}`}
                    style={
                      author.author
                        ? null
                        : { color: colors[index % colors.length] }
                    }
                  >
                    {pkg.name}
                  </a>
                </td>
                <td class="right">
                  {sumDownloads(pkg.downloads).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr class="sum">
              <td>Σ</td>
              <td class="right">
                {sum(
                  author.packages.map(pkg => sumDownloads(pkg.downloads))
                ).toLocaleString()}
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};
