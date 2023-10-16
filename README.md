# Simple Hue Picker



# Usage

Since it's a Web Component and not a framework component, it requires some framework-specific treatment. But don't fret, no hacks.

The first common step is to import the module. Do this in your `main.ts` file or in your wrapper (if you need one):

```ts
import 'simple-hue-picker';
```

As soon as you do this, you'll have a new globally-available component called `<hue-picker />`. Under the hood the whole component is just an `<input type="range" />` and an SVG that gives you the background.

It accepts all the same props as a usual `<input />`. The selected value is stored in, as usual, `value`. It only exposes a single event: `change`. It fires a `CustomEvent<string>`, so this is what a typical even handler would look like:

```tsx
<hue-picker onChange={(e) => setValue(e.detail)} />
```

## Usage with Vue

Vue is Web Components friendly, so usage is pretty simple:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selectedHue = ref('120')
</script>

<template>
  <div>
    {{selectedHue}}
  </div>
  <hue-picker :value="selectedHue" @change="(e: CustomEvent<string>) => selectedHue = e.detail">
  </hue-picker>  
</template>
```
  
## Usage with Preact

Preact is Web Components friendly, so usage is extremely simple:

```tsx
export function App() {
  const [selected, setSelected] = useState("150");
  return <hue-picker value={selected} onChange={e => setSelected(e.detail)}></hue-picker>
}
```

## Usage with Solid

Solid is Web Components friendly, so usage is simple, but you need to explicitly give the compiler a hint, that `value` is an attribute:

```tsx
function App() {
  const [selected, setSelected] = createSignal("120");

  return (
    <hue-picker
      step={10}
      // Notice the attr:
      attr:value={selected()}
      onChange={(e) => setSelected(e.detail)}
    ></hue-picker>
  );
}
```

## Usage with React

React is the least Web Components friendly, because of its Synthetic events. So, if you write `onChange={e => {...}}` in Preact, it uses native DOM events, so you get an event handler for custom elements as well. In React you need to manually call `.addEventListener`.

We may add this to the library's core in future, but for now you can just use this simple snippet:

```tsx
import React from "react";
import "simple-hue-picker";
import { HuePicker, HueChangeEventHandler } from "simple-hue-picker";

type Props = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
  onChange?: (newHue?: string) => void;
};

export const Picker = ({ onChange, ...rest }: Props) => {
  const ref = React.useRef<HuePicker | null>(null);

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

  return <hue-picker ref={ref} {...rest}></hue-picker>;
};
```
