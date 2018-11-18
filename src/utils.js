export const isScopedPkg = item => item.pkg && item.scope;
export const isAuthor = item => item.hasOwnProperty("author");
export const isRegularPkg = item => item.pkg && !item.scope;
