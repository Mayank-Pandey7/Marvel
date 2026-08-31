import { useMemo } from "react";

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  bodyLetterSpacing?: number;
};

export type LandingPageCustomization = {
  css?: string;
  cssVariables?: Record<string, string>;
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export function splitTypographyProps<T extends Record<string, any>>(
  props: T
): [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    bodyLetterSpacing,
    ...rest
  } = props;

  return [
    {
      headingFont,
      bodyFont,
      headingWeight,
      bodyWeight,
      primaryColor,
      headingSize,
      bodySize,
      headingLetterSpacing,
      bodyLetterSpacing,
    },
    rest as Omit<T, keyof PageTypographyProps>,
  ];
}

export function usePageTypography(
  baseRecipe: Record<string, any>,
  props: PageTypographyProps
): LandingPageCustomization {
  return useMemo(() => {
    const primaryColor = props.primaryColor || baseRecipe?.primaryColor || "#c87046";
    const headingFont = props.headingFont || baseRecipe?.headingFont || "iowan-old-style";
    const bodyFont = props.bodyFont || baseRecipe?.bodyFont || "inter";

    const cssVariables: Record<string, string> = {
      "--threeui-primary": primaryColor,
      "--threeui-heading-font": headingFont,
      "--threeui-body-font": bodyFont,
    };

    if (props.headingWeight) cssVariables["--threeui-heading-weight"] = String(props.headingWeight);
    if (props.bodyWeight) cssVariables["--threeui-body-weight"] = String(props.bodyWeight);
    if (props.headingSize) cssVariables["--threeui-heading-size"] = `${props.headingSize}px`;
    if (props.bodySize) cssVariables["--threeui-body-size"] = `${props.bodySize}px`;
    if (props.headingLetterSpacing !== undefined) {
      cssVariables["--threeui-heading-letter-spacing"] = `${props.headingLetterSpacing}em`;
    }

    return {
      ...baseRecipe,
      ...props,
      primaryColor,
      headingFont,
      bodyFont,
      cssVariables,
    };
  }, [baseRecipe, props]);
}

export function applyPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame || !customization) return;
  try {
    const doc = frame.contentDocument;
    if (!doc) return;

    let styleEl = doc.getElementById("threeui-customization-style") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = doc.createElement("style");
      styleEl.id = "threeui-customization-style";
      doc.head.appendChild(styleEl);
    }

    let css = "";
    if (customization.cssVariables) {
      css += ":root {\n";
      for (const [k, v] of Object.entries(customization.cssVariables)) {
        css += `  ${k}: ${v} !important;\n`;
      }
      css += "}\n";
    }

    if (customization.primaryColor) {
      css += `
        :root {
          --primary-color: ${customization.primaryColor} !important;
          --accent: ${customization.primaryColor} !important;
        }
      `;
    }

    styleEl.textContent = css;
  } catch (_) {}
}

export function postPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame || !customization) return;
  try {
    frame.contentWindow?.postMessage(
      {
        type: "threeui-page-customization",
        customization,
      },
      "*"
    );
  } catch (_) {}
}
