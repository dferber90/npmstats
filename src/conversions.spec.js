import {
  userInputToCommonFormat,
  urlSliceToCommonFormat,
  commonFormatToUserInput,
  commonFormatToUrlSlice
} from "./conversions";

// values are the expected common format for the provided keys
const parseExpectations = {
  "@dferber90": [{ author: "@dferber90" }],
  "@dferber90,": [{ author: "@dferber90" }],
  ",@dferber90,, ,": [{ author: "@dferber90" }],
  "@dferber90, @miley": [{ author: "@dferber90" }, { author: "@miley" }],
  "@dferber90,@miley": [{ author: "@dferber90" }, { author: "@miley" }],
  "@commercetools/enzyme-extensions": [
    { scope: "@commercetools", pkg: "enzyme-extensions" }
  ],
  "@commercetools:enzyme-extensions": [
    { scope: "@commercetools", pkg: "enzyme-extensions" }
  ],
  "@commercetools/enzyme-extensions,@babel/core": [
    { scope: "@commercetools", pkg: "enzyme-extensions" },
    { scope: "@babel", pkg: "core" }
  ],
  "@commercetools:enzyme-extensions,@babel/core": [
    { scope: "@commercetools", pkg: "enzyme-extensions" },
    { scope: "@babel", pkg: "core" }
  ]
};

// keys are the expected values for the provided common format
const stringifyToUserInputExpectations = {
  "@dferber90": [{ author: "@dferber90" }],
  "@dferber90, @miley": [{ author: "@dferber90" }, { author: "@miley" }],
  "@commercetools/enzyme-extensions": [
    { scope: "@commercetools", pkg: "enzyme-extensions" }
  ]
};

// keys are the expected values for the provided common format
const stringifyToUrlSliceExpectations = {
  "@dferber90": [{ author: "@dferber90" }],
  "@dferber90,@miley": [{ author: "@dferber90" }, { author: "@miley" }],
  "@commercetools:enzyme-extensions": [
    { scope: "@commercetools", pkg: "enzyme-extensions" }
  ]
};

describe("userInputToCommonFormat", () => {
  Object.entries(parseExpectations).forEach(([input, output]) => {
    it(`should parse when input is "${input}"`, () => {
      expect(userInputToCommonFormat(input)).toEqual(output);
    });
  });
});
describe("urlSliceToCommonFormat", () => {
  Object.entries(parseExpectations).forEach(([input, output]) => {
    const encoded = encodeURIComponent(input);
    it(`should parse when input is "${input}"`, () => {
      expect(urlSliceToCommonFormat(input)).toEqual(output);
    });
    it(`should parse when input is "${encoded}"`, () => {
      expect(urlSliceToCommonFormat(encoded)).toEqual(output);
    });
  });
});
describe("commonFormatToUserInput", () => {
  Object.entries(stringifyToUserInputExpectations).forEach(
    ([output, input]) => {
      it("should stringify", () => {
        expect(commonFormatToUserInput(input)).toEqual(output);
      });
    }
  );
});
describe("commonFormatToUrlSlice", () => {
  Object.entries(stringifyToUrlSliceExpectations).forEach(([output, input]) => {
    it("should stringify", () => {
      expect(commonFormatToUrlSlice(input)).toEqual(output);
    });
  });
});
