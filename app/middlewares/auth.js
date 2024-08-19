
const jwt = require('../helpers/jwt/index');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({
            message : "A token is required for authentication"
        });
    }

    jwt.accessTokenDecode(function (e) {
        if (e.status) {
            req.user = e.data;
            return next();
        } else {
            return res.status(e.code).send({
                message : e.message
            });
        }
    }, token);

};

// const verifyToken1 = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(403).send({
//             message : "A token is required for authentication"
//         });
//     }
//     try {

//       const decoded = jwt.accessTokenDecode(function (e) {
//       req.user = decoded;

//         if (e.status) {
//             req.user = e.data;
//             return next();
//         } else {
//             return res.status(e.code).send({
//                 message : e.message
//             });
//         }
//       });
//     } catch (err) {
//       return res.status(401).send({
//         status:401,
//         message: "Invalid Token"
//       });
//     }
//     return next();
//   };

module.exports = verifyToken;