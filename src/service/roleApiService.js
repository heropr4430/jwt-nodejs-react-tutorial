import db from '../models/index'
const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        console.log(currentRoles)
        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2));
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: []
            };
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create roles succeeds: ${persists.length} roles`,
            EC: 0,
            DT: []
        };

    } catch (error) {
        console.log(e);
        return {
            EM: 'something wrong with service',
            EC: 1,
            DT: []
        };
    }
}

const getAllRoles = async () => {

    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        });
        return {
            EM: 'get all roles success',
            EC: 0,
            DT: data
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

const deleteRole = async (id) => {
    try {
        let role = await db.Role.destroy({
            where: { id: id }
        });
        return {
            EM: 'delete role success',
            EC: 0,
            DT: []
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

const getRoleByGroup = async (id) => {

    try {
        if (!id) {
            return {
                EM: 'not found any roles',
                EC: 0,
                DT: data
            }
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })
        return {
            EM: 'get roles by group success',
            EC: 0,
            DT: roles
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

const assignRolesToGroup = async (data) => {

    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: 'Assign roles to  group success',
            EC: 0,
            DT: []
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
module.exports = { createNewRoles, getAllRoles, deleteRole, getRoleByGroup, assignRolesToGroup }