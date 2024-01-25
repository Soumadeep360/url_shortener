// const sessionIDToUserMap =new Map();
const jwt=require("jsonwebtoken");

const secret="soumadeep1234"; 
function setUser(user){
        return jwt.sign({
            _id: user._id,
            email:user.email,
            role:user.role,
        },secret);
}

function getUser(token){
    if(!token) return null;
    // return sessionIDToUserMap.get(id);
    return jwt.verify(token,secret);
}

module.exports={
    setUser,getUser
}