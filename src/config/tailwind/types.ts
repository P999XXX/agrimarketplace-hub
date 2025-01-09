export interface KeyframeConfig {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    } | string;
  };
}

export interface AnimationConfig {
  [key: string]: string;
}

export interface ColorsConfig {
  [key: string]: {
    [key: string | number]: string;
  } | string;
}

export interface SpacingConfig {
  [key: string]: string;
}

export interface TypographyConfig {
  fontFamily: {
    [key: string]: string[];
  };
  fontSize: {
    [key: string]: [string, { lineHeight: string }];
  };
}