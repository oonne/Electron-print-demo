# Electron 打印功能 demo  
## 实现方案
[《Electron打印的四种方案》](https://blog.oonne.com/site/blog?id=69)

## 技术选型
* 打印机使用USB连接电脑，安装驱动。
* 使用 Electron 来开发，所有代码都在本地，可离线运行。
* 主进程一个BrowserWindow用来界面，另起一个进程用于渲染打印样式。
* 使用 webContents.print() 来调起打印。
* 使用 React 来构建页面。
* 使用 ESlint & prettier 来规范代码。

## 目录结构
```
├── Electron-print-demo
│   ├── app         # React编译完目录，打包的时候运行的是这里面的代码
│   ├── dist        # Electron编译完目录，安装包在这里面
│   ├── public      # 静态资源
│   ├── config      # React打包配置
│   ├── scripts     # React打包脚本
│   ├── src         # React源码
│   └── main.js     # Electron入口文件
```