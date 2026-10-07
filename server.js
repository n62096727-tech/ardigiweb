const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    // Default to ardigi.html when visiting "/"
    let urlPath = req.url === "/" ? "/ardigi.html" : req.url;

    // Remove query strings (e.g. ?id=1)
    urlPath = urlPath.split("?")[0];

    // Build full file path inside public/
    const filePath = path.join(__dirname, "public", urlPath);

    // Get file extension → set correct Content-Type
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".css":  "text/css",
        ".js":   "text/javascript",
        ".png":  "image/png",
        ".jpg":  "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif":  "image/gif",
        ".svg":  "image/svg+xml",
        ".ico":  "image/x-icon",
        ".webp": "image/webp",
        ".json": "application/json",
        ".pdf":  "application/pdf"
    };
    const contentType = mimeTypes[ext] || "application/octet-stream";

    // Read the file and send it
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 — File Not Found</h1><p>" + urlPath + "</p>");
            return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Website running at http://localhost:3000");
});
