require("dotenv").config();
import db from '../models/index'
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTAction';


const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    });

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    });

    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {

    try {


        //check email or phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist == true) {
            return {
                EM: 'the email is already existed',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist == true) {
            return {
                EM: 'the phone is already existed',
                EC: 1
            }
        }
        //hash user password
        let hashPass = hashPassword(rawUserData.password);
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPass,
            phone: rawUserData.phone,
            groupId: 4
        })

        return {
            EM: 'a user is created successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service ...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {

                // let token

                //test roles
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,

                }

                let token = createJWT(payload);
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }

        }
        console.log(">>> not found user with email/phone", rawData.valueLogin, "password: ", rawData.password);
        return {
            EM: 'your email/phone number or password is not right',
            EC: 1,
            DT: ''
        }



    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service ...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashPassword, checkEmailExist, checkPhoneExist
}