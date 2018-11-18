// These are the 4 conversions this file exposes
//
// parsing
//    user input --> common format
//    url slice  --> common format
//
// stringifying
//   common format --> user input
//   common format --> url slice
//
// The common format is an array which contains entries of:
//   - package: { pkg }
//   - scoped package: { scope, pkg }
//   - author: { author }

// text: String (pkg, @author, @scope/pkg or comma-separated list of them).
//       May not be a mix of authors and (scoped) packages, but is parsed
//       anyways when provided.
export const textToCommonFormat = text => {
  return text
    .replace(/:/g, "/")
    .split(",")
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const isAuthor = part.startsWith("@") && !part.includes("/");
      const isScopedPackage = part.startsWith("@") && part.includes("/");

      if (!isAuthor && !isScopedPackage) {
        return { pkg: part };
      } else if (isScopedPackage) {
        const [scope, pkg] = part.split("/");
        return { scope, pkg };
      } else if (isAuthor) {
        return { author: part };
      }
    });
};

export const userInputToCommonFormat = textToCommonFormat;
export const urlSliceToCommonFormat = urlSlice =>
  textToCommonFormat(decodeURIComponent(urlSlice));

export const commonFormatToUserInput = list =>
  list
    .map(item => {
      if (item.scope && item.pkg) return `${item.scope}/${item.pkg}`;
      if (item.pkg) return item.pkg;
      if (item.author) return item.author;
      return null;
    })
    .filter(Boolean)
    .join(", ");

// There are two urls we need to format the common-format to:
//   - our own api (must use ":" or escaped "/" as separator)
//   - the npm api (must use "/" as separator)
export const commonFormatToUrlSlice = (list, scopeSeparator = ":") => {
  const encode = text =>
    text.startsWith("@")
      ? `@${encodeURIComponent(text.slice(1))}`
      : encodeURIComponent(text);

  return list
    .map(item => {
      if (item.scope && item.pkg)
        return `${encode(item.scope)}${scopeSeparator}${encode(item.pkg)}`;
      if (item.pkg) return encode(item.pkg);
      if (item.author) return encode(item.author);
      return null;
    })
    .filter(Boolean)
    .join(",");
};

export const toString = item => {
  if (item.scope && item.pkg) return `${item.scope}/${item.pkg}`;
  if (item.pkg) return item.pkg;
  if (item.author) return item.author;
  return null;
};
