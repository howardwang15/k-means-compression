const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const port = 8080 || process.env.PORT;

app.listen(port);
console.log(`Server started on port ${port}!`);