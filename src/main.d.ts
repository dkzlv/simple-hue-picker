// Type definitions for HuePicker
export declare class HuePicker extends HTMLElement {
  "default-hue"?: string;
  addEventListener(
    type: "change",
    listener: (event: CustomEvent<string>) => void
  ): void;
}

// For JSX (React, Preact, Solid, etc.)
declare namespace JSX {
  interface IntrinsicElements {
    "hue-picker": {
      "default-hue"?: string;
      onchange?: (event: CustomEvent<string>) => void;
    };
  }
}

// For Vue
declare module "vue" {
  export interface GlobalComponents {
    "hue-picker": {
      props: {
        "default-hue"?: string;
      };
      emits: {
        change: (value: string) => void;
      };
    };
  }
}
