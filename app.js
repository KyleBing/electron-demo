const {app, BrowserWindow} = require('electron');

const url = require("url");
const path = require("path");


let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'), // 指定好对应的主页文件就好了
            protocol: "file:",
            slashes: true
        })
    )
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.webContents.openDevTools() // 显示这个窗口的调试窗口，如果不想显示，删除该段即可
}

// 程序启动时
app.on('ready', ()=>{
    createWindow()
})

// 所有窗口关闭时
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// 程序处于激活状态时
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
