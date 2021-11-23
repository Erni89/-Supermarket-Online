const jwt = require('jsonwebtoken')

const onlyAdmin = (req, res, next) => {

    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (error, payload) => {
            if (error) {
                res.status(500).json({ err: true, error })
            } else {
                if (payload.role === "admin") {
                    req.user = payload
                    next()
                } else {
                    res.status(401).json({ err: true, msg: "only admin can access" })
                }
            }
        }
    )
}

const onlyUser = (req, res, next) => {
    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (error, payload) => {
            if (error) {
                res.status(500).json({ err: true, error })
            } else {
                if (payload.role === "user") {
                    req.user = payload
                    next()
                } else {
                    res.status(401).json({ err: true, msg: "only admin can access" })
                }
            }
        }
    )
}
const userAndAdmin = (req, res, next) => {
    jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        (error, payload) => {
            if (error) {
                res.status(500).json({ err: true, error })
            } else {
                if (payload.role === "user" || payload.role === "admin") {
                    req.user = payload
                    next()
                } else {
                    res.status(401).json({ err: true, msg: "only admin can access" })
                }
            }
        }
    )
}



module.exports = {
    onlyAdmin, onlyUser,
    userAndAdmin,
}