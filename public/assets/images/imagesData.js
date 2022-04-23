const importAll = (require) =>
  require.keys().reduce((acc, next, i) => {
    acc[i] = require(next);
    return acc;
  }, []);
const imageRequires = require.context("./", false, /\.(png|jpg)$/);
export const images = importAll(imageRequires);
