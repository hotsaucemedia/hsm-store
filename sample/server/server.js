var http = require('http');
var hsmStore = require('hsm-store');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Look at the console output to see how this example works.');
    

    // Example to interact with the hsmStore module
    console.log(hsmStore);

    hsmStore.displayLogMessage();
    hsmStore.displayPublicLogMessage();
    hsmStore.setPublicMessage("new message!!");
    hsmStore.displayPublicLogMessage();
}).listen(8080); 