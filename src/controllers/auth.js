const control = {}
const bcrypt = require('bcrypt');
const model = require('../models/user_model.js')
const resp = require('../utils/responses')
const jwt = require('../utils/jwt')
const hashing = require('../utils/hashing');

control.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const pass = password
        if (username == '' || pass == '') return resp(res, 401, 'please input username & password.')
        const result_user = await model.getDatabyUsername(username)
        if (result_user.rowCount == 0) return resp(res, 401, 'username not registered.')
        const result_pass = result_user.rows[0].pass
        const result_email = result_user.rows[0].email

        const status = await bcrypt.compare(pass, result_pass)
        if (status == true) {
            const token = jwt({
                "username": username,
                "email": result_email,
                "id_user": result_user.rows[0].id_user,
                "role": result_user.rows[0].role
            })
            return resp(res, 200, { "message": 'login success.', "Token": token.token })
        } else {
            return resp(res, 401, 'wrong password')
        }
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const pass_hash = await hashing(password)

        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) return resp(res, 401, 'e-mail has been registered.')

        const result_user1 = await model.getDatabyUsername(username)
        if (result_user1.rowCount > 0) return resp(res, 401, 'Username has been registered.')

        const result = await model.addData({ username, email, pass_hash })

        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control