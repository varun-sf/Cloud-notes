var jwt = require('jsonwebtoken');
const JWT_SECRECT = "Varunsecret"

const fetchuser = (req,res,next)=>{
   const token = req.header('auth-token');
   if(!token){
    res.status(400).send({error:"Please authenticate with valid token"})
   }

  try {
    const data = jwt.verify(token,JWT_SECRECT);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token"})
  }

}


module.exports = fetchuser;