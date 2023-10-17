import type { HueChangeEventHandler, HuePicker as IHuePicker } from "./main";
import "./main";

import React from "react";

type Props = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
  onChange?: (newHue?: string) => void;
};

export default function HuePicker({ onChange, ...rest }: Props) {
  const ref = React.useRef<IHuePicker | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleChange: HueChangeEventHandler = (e) => {
      onChange?.(e.detail);
    };

    el.addEventListener("change", handleChange);

    return () => {
      el.removeEventListener("change", handleChange);
    };
  }, [onChange]);

  return React.createElement("hue-picker", { ref: ref, ...rest });
}
