const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) => {
    const url =req.url;
    const method = req.method;
    if (url === "/"){
        fs.readFile("message.txt","utf-8",(err,data) => {
         res.write("<html>");
        res.write("<head><title> Enter message </title></head>");
        res.write("<body>")
        res.write(`<h2>${data ? data : "No message"}</h2>`)
        res.write('<form action ="/message" method = "POSt" ><input type = "text" name = "message"><button type ="submit">Submit</button></form>');
        res.write("</body>")
        res.write("</html>")
        res.end();   
        })
        
    }
    if (url === "/message" && method === "POST"){
        const body = [];
        req.on("data",(chunk) => {
            body.push(chunk);
        })
        return req.on("end" , () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt",message, err => {
            res.statusCode = 302;
            res.setHeader("Location","/");
            return res.end();    
            })
            
        })  
    }
})
server.listen(3000)
