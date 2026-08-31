declare module "@designcodeio/threeui" {
  import React from "react";
  export function CompleteShelfLandingPage(props: any): React.ReactElement;
  export function CharacterCarousel(props: any): React.ReactElement;
  export * from "@/src/shaders/landing-pages/LandingPages";
}

declare module "@designcodeio/threeui/style.css" {
  const content: any;
  export default content;
}
