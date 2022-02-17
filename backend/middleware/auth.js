//middleware qui vérifie les tockens

//package pour vérifier les tockens
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        //on récupère le token authorization
        const token = req.headers.authorization.split(' ')[1];
        //on analyse vérifie le token avec la clé secrète crée dans la fonction login
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);

        //on récupère le userID qui est dedans et on vérifie que userID est le même que celui de la requête
        const userId = decodedToken.userId;
	
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable !';
        } else {
            //on passe la requête à notre prochain middleware
            next();
        }
    }

    catch (error) {
		
        res.status(401).json({error:error} | 'Requête non authentifiée')
    }
}