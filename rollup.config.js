import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const files = ["src/main.ts", "src/renderer.ts", "src/preload.ts"];

const types = ["src/main.ts", "src/renderer.ts"];

export default files
  .map((file) => ({
    input: file,
    output: {
      dir: ".",
    },
    external: ["electron", "@sky0014/logger"],
    plugins: [typescript()],
  }))
  .concat(
    types.map((type) => ({
      input: type,
      output: [{ dir: ".", format: "es" }],
      plugins: [dts()],
    }))
  );
