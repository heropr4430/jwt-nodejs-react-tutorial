import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('insert into users(email,password,username) values (?,?,?)', [email, hashPass, username]);
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('select * from users');
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('delete from users where id=?', [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('select * from users where id=?', [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const updateUserInfor = async (id, email, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('update users set email = ?,  username = ? where id = ?', [email, username, id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}