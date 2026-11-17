import "styled-components";
import type { theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    fonts: typeof theme.fonts;
    typography: typeof theme.typography;
    spacing: typeof theme.spacing;
    radii: typeof theme.radii;
    borderWidths: typeof theme.borderWidths;
    opacity: typeof theme.opacity;
    breakpoints: typeof theme.breakpoints;
    shadows: typeof theme.shadows;
    gradients: typeof theme.gradients;
    gradientStops: typeof theme.gradientStops;
  }
}
