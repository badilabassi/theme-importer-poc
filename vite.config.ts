import { defineConfig } from "vite";
import { vitePlugin as react } from "@react-router/dev";
import inspect from "vite-plugin-inspect";
import themeImporter from "./plugin/theme-importer";


const themeName = process.env.VITE_THEME;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    themeImporter({
      themeName,
      include: ["./src/ui/**/*.tsx"],
    }),
    react({
      appDirectory: "src",
      ssr: true,
      future: {
        //@ts-expect-error unstable_singleFetch not added yet to the Types of React Router.
        unstable_singleFetch: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("", "containers/App.tsx", { index: true });
          route("*", "catchAllRoutes.tsx");
        });
      },
    }),
    inspect(),
  ],
});
