import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

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

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let users = [];
    // connection.query(
    //     'select * from users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         console.log(">>> check data :  ", results);
    //     }
    // );

    try {
        const [rows, fields] = await connection.execute('select * from users');
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewUser,
    getUserList
}