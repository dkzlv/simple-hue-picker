import type { HueChangeEventHandler, HuePicker as IHuePicker } from "./main";
import "./main";

import React from "react";

type Props = Omit<JSX.IntrinsicElements["input"], "onChange" | "onInput"> & {
  onChange?: HueChangeEventHandler;
  onInput?: HueChangeEventHandler;
};

const useEvent = (
  ref: React.MutableRefObject<IHuePicker | null>,
  ev: "input" | "change",
  onEvent?: HueChangeEventHandler
) => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !onEvent) return;

    el.addEventListener(ev, onEvent);

    return () => el.removeEventListener(ev, onEvent);
  }, [ev, onEvent]);
};

export default function HuePicker({ onChange, onInput, ...rest }: Props) {
  const ref = React.useRef<IHuePicker | null>(null);

  useEvent(ref, "change", onChange);
  useEvent(ref, "input", onInput);

  return React.createElement("hue-picker", { ref: ref, ...rest });
}
