# electron-ipc

Make you use electron ipc call easier.

## Install

```bash
npm install @sky0014/electron-ipc
```

## Usage

In preload:

```ts
import "@sky0014/electron-ipc/preload";
```

In main:

```ts
// register main ipc
import { getIpcMain, registerIpcMain } from "@sky0014/electron-ipc/main";
import type { Renderer } from "./renderer";

const ipc = {
  filePick(options: OpenDialogOptions) {
    return dialog.showOpenDialog(options);
  },
};

registerIpcMain(ipc);

export type Main = typeof ipc;

// use ipc from renderer
getIpcMain<Renderer>().onShowMessage("hello world");
```

In renderer:

```ts
// register renderer ipc
import {
  getIpcRenderer,
  registerIpcRenderer,
} from "@sky0014/electron-ipc/renderer";
import type { Main } from "./main";

const ipc = {
  onShowMessage(data: Message) {
    // show message in ui
  },
};

registerIpcRenderer(ipc);

export type Renderer = typeof ipc;

// use ipc from main
getIpcRenderer<Main>().filePick(...);
```

## Publish

If your first time publish a package, login first:

```bash
npm login --registry=http://registry.npmjs.org
```

Then you can publish:

```bash
npm run pub
```
