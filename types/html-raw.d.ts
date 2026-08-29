declare module "*.html?raw" {
  const content: string;
  export default content;
}

declare module "*.html" {
  const content: string;
  export default content;
}

declare module "@designcodeio/threeui" {
  export * from "@/src/shaders/character-carousel/CharacterCarousel";
}
