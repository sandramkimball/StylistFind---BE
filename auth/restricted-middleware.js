const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    const token = req.headers.authorization;

    if(token){
        const secret = process.env.JWT_SECRET || 'Beautiful Hair';
        
        jwt.verify(token, secret, (err, decodedToken)=> {
            if(err){
                console.log(err);
                res.status(401).json({message: 'Error with webtoken. Token malformed.', err})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'No credentials provided.' });
    }
}