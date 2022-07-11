import logger from "@sky0014/logger";
import { API_KEY, IpcCallback, LIB_NAME } from "./common";

logger.initLogger({
  enable: true,
  prefix: LIB_NAME,
});

const proxy = new Proxy(
  {},
  {
    get(target, p) {
      // @ts-ignore
      return (...args) => window[API_KEY].invoke(p, ...args);
    },
  }
);

export function registerIpcRenderer(ipcMap: Record<string, IpcCallback>) {
  // @ts-ignore
  window[API_KEY].register(ipcMap);
}

export function getIpcRenderer<T>() {
  return proxy as T;
}
