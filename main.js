const electron = require('electron');
const localshortcut = require("electron-localshortcut");
const path = require('path');
const isDev = require('electron-is-dev');

const { app, BrowserWindow, Menu, ipcMain } = electron;

// 隐藏菜单栏
Menu.setApplicationMenu(null);

/* 
 * 主界面
 */
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 1080,
    height: 600,
    show: false,
    icon: path.join(__dirname, './public/icon.ico'),
    webPreferences: {
      nodeIntegration: true, // 是否完整的支持 node
      nodeIntegrationInWorker: true, // 是否在Web工作器中启用了Node集成
      contextIsolation: false, // 上下文隔离，用于通信
    },
  });

  if (isDev) {
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3001');
  } else {
    mainWindow.loadFile('app/index.html');
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    // 开启打印窗口
    createPrintWindow();
  });
  // 关闭窗口时退出软件
  mainWindow.once('close',()=>{
    app.quit();
  });

  /* 快捷键 */
  // 强制刷新
  localshortcut.register(mainWindow, "Alt+F1", () => {
    mainWindow.webContents.reloadIgnoringCache();
  });
  // 刷新
  localshortcut.register(mainWindow, "Alt+F2", () => {
    mainWindow.reload();
  });
  // 打开控制台
  localshortcut.register(mainWindow, "Alt+F12", () => {
    mainWindow.webContents.openDevTools();
  });

  /* 跨进程通信事件 */
  // 获取打印机
  ipcMain.on('getPrinters', async () => {
    const printerList = await mainWindow.webContents.getPrintersAsync();
    mainWindow.send('setPrinters', printerList);
  });
  // 打印完成
  ipcMain.on('onPrintSuccess', () => {
    mainWindow.send('onPrintSuccess');
  });
}

/* 
 * 打印界面
 */
function createPrintWindow() {
  let deviceName = '';
  const printWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: isDev,
    icon: path.join(__dirname, './public/icon.ico'),
    webPreferences: {
      nodeIntegration: true, // 是否完整的支持 node
      nodeIntegrationInWorker: true, // 是否在Web工作器中启用了Node集成
      contextIsolation: false, // 上下文隔离，用于通信
    },
  });

  // printWindow.webContents.openDevTools();
  if (isDev) {
    printWindow.loadURL('http://localhost:3001/#/print');
  } else {
    printWindow.loadFile('app/index.html', {hash: '/print'});
  }

  /* 跨进程通信事件 */
  // 开始执行打印任务
  ipcMain.on('printTask', (e, ...args) => {
    deviceName = printer || '';

    printWindow.send('setPrintParams', args[0]);
  });
  // 开始打印
  ipcMain.on('print', () => {
    printWindow.webContents.print({
      silent: !!deviceName,
      deviceName,
    }, ()=>{
      printWindow.send('printComplete');
    });
  });

}

/*
 * 启动和关闭
 */
app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
