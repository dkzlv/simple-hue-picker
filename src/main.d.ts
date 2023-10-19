export declare class HuePicker extends HTMLInputElement {
  addEventListener(
    type: "change" | "input",
    listener: (event: CustomEvent<number>) => void
  ): void;
  removeEventListener(
    type: "change" | "input",
    listener: (event: CustomEvent<number>) => void
  ): void;
}
export type HueChangeEvent = CustomEvent<number>;
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
  onChange: HueChangeEventHandler;
  onInput: HueChangeEventHandler;
}
declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "hue-picker": HuePickerAttributes;
    }
  }
}

// Solid.js //
type SolidElement = Omit<
  InputHTMLAttributes<HuePicker>,
  "onChange" | "onInput"
> & {
  onChange?: HueChangeEventHandler;
  onInput?: HueChangeEventHandler;
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
      emits: {
        change: HueChangeEventHandler;
        input: HueChangeEventHandler;
      };
    };
  }
}
