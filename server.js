const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    fs.readFile("./public/ardigi.html", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Server Error");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Website running on port ${PORT}`);
});
