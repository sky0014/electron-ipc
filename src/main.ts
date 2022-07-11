import logger from "@sky0014/logger";
import { BrowserWindow, ipcMain } from "electron";
import { API_KEY, IpcCallback, LIB_NAME } from "./common";

logger.initLogger({
  enable: true,
  prefix: LIB_NAME,
});

const map: Record<string, IpcCallback> = {};

const proxy = new Proxy(
  {},
  {
    get(target, p) {
      // @ts-ignore
      return (...args) => {
        BrowserWindow.getAllWindows().forEach((win) => {
          win.webContents.send(API_KEY, p, ...args);
        });
      };
    },
  }
);

ipcMain.handle(API_KEY, (event, name: string, ...args) => {
  const val = map[name];

  if (val === undefined) {
    logger.warn(`no renderer ipc named: ${name}`);
    return;
  }

  if (typeof val !== "function") {
    return val;
  }

  return val(...args);
});

export function registerIpcMain(ipcMap: Record<string, IpcCallback>) {
  Object.assign(map, ipcMap);
}

export function getIpcMain<T>() {
  return proxy as T;
}
