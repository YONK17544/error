const http = require('http');

const PORT = 3001;
const data = [];

//REGISTER
const app = http.createServer((req,res) =>{

    console.log(req.method);
    console.log(req.url);
    if (req.method === 'POST'){
        if ( req.url === "/api/v1/register"){
            let body = '';
            req.on('data', (chunk) =>{ 
                console.log(chunk.toString());
                body += chunk.toString();
            })
            req.on('end', () =>{ 
                const { email, password } = JSON.parse(body);
                if (!email || !password){
                    res.statusCode = 400;
                    res.end(JSON.stringify({ status: false, error: "email or password not found"}))
                    
                }
                const existingUser = data.find((val) => val.email === email);
                if (existingUser){
                    res.statusCode = 400;
                    res.end(JSON.stringify({ status: false, error: "Username already exists"}))
                    
                }

                const newUser = { email, password };
                data.push(newUser);

                res.statusCode = 400;
                res.end(JSON.stringify({ status: true, message: "User created successfully ", data}))
                
            

            })
        } if ( req.url === "/api/v1/login"){
                let body = '';
                req.on('data', (chunk) =>{ 
                    body += chunk.toString();
                })
                req.on('end', () =>{ 
                    const { email, password } = JSON.parse(body);
                    if (!email || !password){
                        res.statusCode = 400;
                        res.end(JSON.stringify({ status: false, error: "email or password not found"}))
                        return;
                    }
                    const existingUser = data.find((val) => val.email === email && val.password === password);
                    if (existingUser){
                        res.statusCode = 200;
                        res.end(JSON.stringify({ status: true, message: "Successfully logged in"}))
                        
                    }
                    else{
                        res.statusCode = 401;
                        res.end(JSON.stringify({ status: false, error: "Invalid user" }))
                    
                    }
                })
            }
        }
    }
    
);

app.listen(PORT, () =>{
    console.log("Server is running at", PORT);
})