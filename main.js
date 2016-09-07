const {BrowserWindow, app, protocol} = require('electron');
const os = require('os');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(`file:///${__dirname}/index.html`);
}

app.on('ready', () => {
  // TODO duplicated logic
  var cachedir = os.homedir() + path.sep + ".stopwork" + path.sep;
  
  protocol.registerFileProtocol('cache', (request, callback) => {
    console.log("requesting " + request.url);
    const hash = request.url.substr(6);
    callback({path: cachedir + hash});
  }, (error) => {
    if (error)
      console.error('Failed to register protocol');
  });
  
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});