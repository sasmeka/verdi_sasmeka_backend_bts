const db = require('../configs/database')
const model = {}


model.getDatabyEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email=$1 limit 1;', [email])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getDatabyUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username=$1 limit 1;', [username])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ username, email, pass_hash }) => {
    return new Promise((resolve, reject) => {
        db.query("insert into users (username, email, pass, role) values ($1,$2,$3,'user');", [username, email, pass_hash])
            .then(() => {
                resolve('account has been registered.')
            }).catch((e) => {
                reject('user data failed to add.')
            })
    })
}

module.exports = model