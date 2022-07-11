declare type IpcCallback = (...args: unknown[]) => unknown;

declare function registerIpcRenderer(ipcMap: Record<string, IpcCallback>): void;
declare function getIpcRenderer<T>(): T;

export { getIpcRenderer, registerIpcRenderer };
