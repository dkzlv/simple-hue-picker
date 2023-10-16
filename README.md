# Simple Hue Picker

## How to use with React



## How to use with Vue

Vue works with Web Components out of the box, so the process is pretty straightforward:

1. import the component—either in your own wrapper component, or in your `main.ts` file.
   ```ts
   import 'simple-hue-picker'
   import App from './App.vue'

   createApp(App).mount('#app')
   ```
2. use it as if it was a new global HTML element!
  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const selectedHue = ref('no selected')
  </script>

  <template>
    <div>
      {{selectedHue}}
    </div>
    <hue-picker default-hue="100" @change="(e: CustomEvent<string>) => selectedHue = e.detail">
    </hue-picker>  
  </template>
   ```
  
## How to use with Preact or Solid

Both Preact and Solid work with Web Components out of the box, so you don't need to do anything specific:

1. import the component—either in your hue picker wrapper, or in `main.ts`:
   ```tsx
   import 'simple-hue-picker'
   ```
2. use it as if it was a new global HTML element!
    ```tsx
    export function App() {
      return <hue-picker onChange={e => console.log(e.detail)}></hue-picker>
    }
    ```
