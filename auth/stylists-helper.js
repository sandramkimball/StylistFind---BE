module.exports={
    validateStylist
}

function validateStylist(user){
    let errors = [];

    if (!user.password || user.password.length < 5){
        errors.push('Password must be a minimum of 5 characters.')
    }

    if (user.first_name === null){
        errors.push('Please add your full name.')
    }

    if (user.last_name === null){
        errors.push('Please add your full name.')
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