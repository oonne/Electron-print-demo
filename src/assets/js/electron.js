/* ELectron */
try {
  eval('window.electron = require("electron")');
} catch (e) {
  window.electron = null;
}