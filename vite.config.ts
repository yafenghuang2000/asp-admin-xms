import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

const viteConfig=({mode})=>{
  console.log(mode);
  
  return {
    plugins:[react()]
  }
}

export default defineConfig(viteConfig)
