import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      dark: string;
      bright: string;
      natural: string;
      error: string;
    };
    borderRadius: number;
    height: {
      header: number;
    };
  }
}
