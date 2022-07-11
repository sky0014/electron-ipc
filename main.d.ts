declare type IpcCallback = (...args: unknown[]) => unknown;

declare function registerIpcMain(ipcMap: Record<string, IpcCallback>): void;
declare function getIpcMain<T>(): T;

export { getIpcMain, registerIpcMain };
