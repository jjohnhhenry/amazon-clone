
const UserSeller = require("../Models/UserSeller");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  
    const { id, email, name } = user;
    const payload = {
        id,
        name,
        email,
    };

    return jwt.sign( payload, secret, { expiresIn } );
}


async function registerSeller (input) {

    const newUserSeller = input;
            
    newUserSeller.email = newUserSeller.email.toLowerCase();

    const { email, password } = newUserSeller;

    //Check that user exist
    const existUser = await UserSeller.findOne({ email });
    if (existUser) {
        throw new Error("El usuario ya está registrado");
    }

    //hashear password
    const salt = await bcryptjs.genSalt(10);
    newUserSeller.password = await bcryptjs.hash(password, salt);

    //save in db
    try {
        const userSeller = new UserSeller(newUserSeller);
        userSeller.save();
        return userSeller;
    } catch (error) {
        console.log(error);
    }
}

async function loginSeller (input) {

    const { email, password} = input;
    //check that user exist
    const existUser = await UserSeller.findOne({ email: email.toLowerCase() });
    if (!existUser) {
        throw new Error("El usuario o contraseña son incorrectos");
    }

    //check if exist password
    const successPassword = await bcryptjs.compare(password, existUser.password);
    if(!successPassword) {
        throw new Error("El usuario o contraseña son incorrectos");
    }

    return {
        token: createToken(existUser, process.env.TOKEN_SECRET, "24h") 
    }
}

module.exports = {
    registerSeller,
    loginSeller
}