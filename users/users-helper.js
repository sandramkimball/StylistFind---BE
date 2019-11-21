const Users = require('./users-model.js');


module.exports={
    validateUser
}

function validateUser(user){
    let errors = [];

    if (user.username === null){
        errors.push('Please create a username.')
    }

    if (user.first_name === null){
        errors.push('Please add your last name.')
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

    if(user.usertype === 'stylist' && user.salon === null && user.address === null){
        errors.push('Please provide an address or salon. Your clients need to know where you are!')
    }

    return {
        isSuccessful: errors.length > 0 ? false:true,
        errors
    }
}