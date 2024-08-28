import loginRegisterService from '../service/loginRegisterService';


const handleRegister = async (req, res) => {

    try {
        //req.body
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters", //error message
                EC: '1', //error code
                DT: '' //date   
            })
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "your password must have more than 3 letters", //error message
                EC: '1', //error code
                DT: '' //date   
            })
        }

        //service: create user

        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '' //date   
        })
    } catch (e) {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: '-1', //error code
            DT: '' //date
        })
    }

    console.log(">>> call me", req.body);
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: '-1', //error code
            DT: '' //date
        })
    }

}


const handleLogout = (req, res) => {

    try {
        res.clearCookie("jwt", { httpOnly: true });
        return res.status(200).json({
            EM: "Logout successful",
            EC: 0,
            DT: ''
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: '-1', //error code
            DT: '' //date
        })
    }

}

module.exports = {
    handleRegister, handleLogin, handleLogout
}