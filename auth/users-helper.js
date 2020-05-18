const Users = require('../users/users-model.js');

module.exports={
    validateUser
}

function validateUser(user){
    let errors = [];

    if(Users.findBy(user.email) === true){
        errors.push('A user with that email already exists.')
    }

    if (user.first_name === null){
        errors.push('Please add full name.')
    }

    if (user.last_name === null){
        errors.push('Please add your last name.')
    }

    if (user.password === null){
        errors.push('Please create a password.')
    }

    if (user.email === null){
        errors.push('Please add a email.')
    }

    return {
        isSuccessful: errors.length > 0 ? false:true,
        errors
    }
}