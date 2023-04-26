const CustomError= require('../errors')
const {isTokenValid}= require('../utils')

const authenticateUser= async (req,res,next)=>{
    const token= req.signedCookies.token;
    if(!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
      //console.log('Error!no token')
    // else { console.log('Token presnt') }
    try { 
        const {name,userId,role}= isTokenValid(token)
        req.user= {name,userId,role}
        next();
} catch(error){
    throw new CustomError.UnauthenticatedError('Invalid authentication')
}  
 
  }

const authorizePermissions= (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) throw new CustomError.UnauthorizedError('Unauthorized to access routes')
        next()
    }
}

module.exports= {
    authenticateUser,
    authorizePermissions
}