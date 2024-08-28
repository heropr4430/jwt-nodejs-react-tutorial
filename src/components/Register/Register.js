import './Register.scss'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { isValidElement, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService'
import { UserContext } from '../../context/UserContext';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { user } = useContext(UserContext);
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }


    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
        }
    }, []);

    const isvalidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!pattern.test(email)) {
            toast.error("your email is not right");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }

        if (!phone) {
            toast.error("phone is required");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }

        if (!password) {
            toast.error("password is required");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (confirmPassword != password) {
            toast.error("your password is not the same");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }


        return true;
    }

    const handleRegister = async () => {
        let check = isvalidInputs();
        if (check == true) {
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            }
            else {
                toast.error(serverData.EM);
            }
        }
    }
    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="contain-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Bảo hiểm sức khỏe
                        </div>
                        <div className='detail'>
                            Bảo hiểm sức khỏe giúp bạn có thể sử dụng được các chính sách bảo hiểm online
                        </div>
                    </div>
                    <div className="contain-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
                        <div className='brand d-sm-none'>
                            bảo hiểm sức khỏe
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} type='text' placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input className='form-control' type='text' placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Username:</label>
                            <input className='form-control' type='text' placeholder='Username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>password:</label>
                            <input className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} type='password' placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} type='password' placeholder='Re-enter password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>


                        <button className='btn btn-primary' type='submit' onClick={() => handleRegister()} >register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already-ve an account. Login
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );

}

export default Register;