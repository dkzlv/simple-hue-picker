export declare class HuePicker extends HTMLInputElement {
  hue?: string;
  addEventListener(
    type: "change",
    listener: (event: CustomEvent<string>) => void
  ): void;
  removeEventListener(
    type: "change",
    listener: (event: CustomEvent<string>) => void
  ): void;
}
export type HueChangeEvent = CustomEvent<string>;
export type HueChangeEventHandler = (event: HueChangeEvent) => void;

// React //
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hue-picker": React.DetailedHTMLProps<
        React.InputHTMLAttributes<HuePicker>,
        HuePicker
      >;
    }
  }
}

// Preact //
interface HuePickerAttributes extends preact.JSX.HTMLAttributes<HuePicker> {
  hue?: string;
  onChange: (event: CustomEvent<string>) => void;
}
declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "hue-picker": HuePickerAttributes;
    }
  }
}

// Solid.js //
type SolidElement = Omit<InputHTMLAttributes<HuePicker>, "onChange"> & {
  hue?: string;
  onChange?: HueChangeEventHandler;
};
declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "hue-picker": SolidElement;
    }
  }
}

// Vue //
declare module "vue" {
  export interface GlobalComponents {
    "hue-picker": {
      props: {
        hue?: string;
      };
      emits: {
        change: HueChangeEventHandler;
      };
    };
  }
}
