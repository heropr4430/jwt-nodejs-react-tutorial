import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});


const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);
    connection.query(
        'insert into users(email,password,username) values (?,?,?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
        }
    );
}

const getUserList = () => {

    let users = [];
    connection.query(
        'select * from users',
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log(">>> check data :  ", results);
        }
    );
}

module.exports = {
    createNewUser,
    getUserList
}