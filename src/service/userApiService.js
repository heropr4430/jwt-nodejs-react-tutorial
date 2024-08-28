import db from "../models/index";
import { checkEmailExist, checkPhoneExist, hashPassword } from '../service/loginRegisterService'

const createNewUser = async (data) => {
    try {

        //check email or phone number are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist == true) {
            return {
                EM: 'the email is already existed',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist == true) {
            return {
                EM: 'the phone is already existed',
                EC: 1,
                DT: 'phone'
            }
        }
        //hash user password
        let hashPass = hashPassword(data.password);
        await db.User.create({ ...data, password: hashPass });
        return {
            EM: 'create new user success',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with service',
            EC: 1,
            DT: []
        };
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            order: [['id', 'DESC']]
        })

        let totalPage = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPage,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with service',
            EC: 1,
            DT: []
        }
    }
}


const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty groupId',
                EC: 0,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })

            return {
                EM: 'Update user succeeds',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
    }
}

const getAllUser = async (id) => {

    try {
        let users = await db.User.findAll({
            include: { model: db.Group, attributes: ["name", "description"] },
            attributes: ["id", "username", "email", "phone", "sex"],
        });
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }

        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            await user.destroy();
            return {
                EM: 'delete user success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'user not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewUser, updateUser, getAllUser, deleteUser, getUserWithPagination
}