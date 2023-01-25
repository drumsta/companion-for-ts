/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable spaced-comment */
/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface HtmlHTMLAttributes {
    amp: boolean;
  }

  interface StyleHTMLAttributes {
    "amp-boilerplate"?: boolean;
  }
}
