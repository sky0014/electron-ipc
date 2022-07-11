import logger from "@sky0014/logger";
import { contextBridge, ipcRenderer } from "electron";
import { API_KEY, IpcCallback, LIB_NAME } from "./common";

logger.initLogger({
  enable: true,
  prefix: LIB_NAME,
});

const map: Record<string, IpcCallback> = {};

contextBridge.exposeInMainWorld(API_KEY, {
  register(ipcMap: Record<string, IpcCallback>) {
    Object.assign(map, ipcMap);
  },

  invoke(name: string, ...args: unknown[]) {
    return ipcRenderer.invoke(API_KEY, name, ...args);
  },
});

ipcRenderer.on(API_KEY, (event, name: string, ...args: unknown[]) => {
  const val = map[name];

  if (!val) {
    logger.warn(`no renderer ipc named: ${name}`);
    return;
  }

  if (typeof val !== "function") {
    logger.warn(`renderer ipc named: ${name} should be function!`);
    return;
  }

  val(...args);
});
