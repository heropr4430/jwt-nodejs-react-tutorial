import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        });
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {


    //test relationship
    let newUser = await db.User.findAll({
        where: { id: 1 },
        include: {
            model: db.Group,
            attributes: ["name", "description"]
        },
        attributes: ["id", "username", "email"],
        raw: true,
        nest: true
    });

    let roles = await db.Role.findAll({
        include:
        {
            model: db.Group,
            where: { id: 1 }
        }
        ,
        raw: true,
        nest: true
    });

    console.log(">> check new user:   ", newUser);
    console.log(">> check new roles:   ", roles);






    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async (userId) => {

    await db.User.destroy({
        where: { id: userId }
    });
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('delete from user where id=?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

const getUserById = async (userId) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: userId }
    });
    return user.get({ plain: true });
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('select * from user where id=?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

const updateUserInfor = async (id, email, username) => {
    await db.User.update({ email: email, username: username },
        {
            where: {
                id: id
            }
        });
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('update user set email = ?,  username = ? where id = ?', [email, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}