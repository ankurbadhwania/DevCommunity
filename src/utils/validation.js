const validator = require("validator");
const validateSignUp = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || firstName.length < 3 ) throw new Error("enter valid firstName");

    else if(!validator.isEmail(email)){
        throw new Error("enter a valid email");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password");
    }
}
module.exports = {validateSignUp}