import {createServer} from 'http';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

createServer(async(req, res) => {
    try {
            if(req.method === 'GET'){
                let filePath;
                if(req.url === '/'){
                    filePath = path.join(__dirname, 'pages', 'index.html');
                }else if(req.url === '/about'){
                    filePath = path.join(__dirname, 'pages', 'about.html');
                }else if(req.url === '/contact-me'){
                    filePath = path.join(__dirname, 'pages', 'contact-me.html');
                }else{
                    filePath = path.join(__dirname, 'pages', '404.html');
                }

                const data = await fs.readFile(filePath);
                res.writeHead(200, {'content-type':'text/html'});
                res.end(data);

            } else {
                res.writeHead(405, {'Content-Type': 'text/html'});
                throw new Error('<h1>Method not allowed</h1>');
            }

    } catch(error) {
        console.error('Error:', error);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('<h1>Internal server error</h1>');
    }
}).listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})