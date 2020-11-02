const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")
const config = require("../config/config");
const base64url = require('base64url');

let id = 1;
async function inscription(req,res){
    console.log("je m'inscris");
    //const user = jwt.decode(req.body.user)
    const email = req.body.email;
    const password = base64url.encode(req.body.password);
    const login = req.body.login;
    console.log("login " + login + " mdp " + password + " email " + email)
    const user = {"_id":id ,"email" : email, "password" : password, "login" : login};
    const userInfo = {"email" : email, "login" : login};
    const us = await Users.find({email: email});
    if(us.length == 0){
      const us2 = await Users.find({login: login});
      if (us2.length == 0){
        const userData = new Users(user)
        userData.save()
        //await Users.create(user)
            //.then(res.status(404).json({ error: "Entity not found." }))
            //.catch(err => console.log("err" + err))
        const token = jwt.encode(userInfo,config.secret);
        id++;
        const msg = {"text ":"Successfull Authentification", "token":token,"user":userInfo}
        //console.log(jwt.decode(token,config.secret))
        return res.status(200).json(msg)
      }
      else{
        return res.status(401).json({ error: "User already exist." })
      }
    }else{
        return res.status(402).json({ error: "Email already used." })
    }
}

async function connexion(req,res){
    const us = await Users.findOne({login: req.query.login});
    console.log("connexion login: " + req.query.login)
    if(us){
        const pass = await Users.find({login: req.query.login, password: {$eq: base64url.encode(req.query.password)}});
        if(pass.length !=0 ){
            const user = {"email":us.email,"login":us.login};
            const token = jwt.encode(user,config.secret);
            const msg = {"text":"Successfull Authentification","token":token,"user":user}
            return res.status(200).json({msg})
        }else{
            return res.status(405).json({error: "wrong password"})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}



exports.inscription = inscription;
exports.connexion = connexion;
