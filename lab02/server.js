const connect = require('connect');
const url = require('url');

const app = connect();

app.use('/lab2', (req, res) => {
    const query = url.parse(req.url, true).query;
    const { method, x, y } = query;

    const numX = Number(x);
    const numY = Number(y);
    let result;

    if (!method || isNaN(numX) || isNaN(numY)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing or invalid parameters' }));
        return;
    }

    switch (method) {
        case 'add':
            result = numX + numY;
            break;
        case 'subtract':
            result = numX - numY;
            break;
        case 'multiply':
            result = numX * numY;
            break;
        case 'divide':
            result = numY !== 0 ? numX / numY : 'Cannot divide by zero';
            break;
        default:
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid method' }));
            return;
    }

    const response = {
        x: x,
        y: y,
        operation: method,
        result: result.toString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Plz go on http://localhost:${PORT}`);
});
