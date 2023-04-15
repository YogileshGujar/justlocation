import  jwt  from "jsonwebtoken";

let secretKey= 'abcdefghijkl123';

export async function authenticate(req,res,next){
    try{
        let token = req.headers.authorization;
        
        let isVerified = jwt.verify(token,secretKey);

        next();

    }catch(e){
        res.status(401).json({error:"Token Authorization failed"})
    }
}