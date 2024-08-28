import './Login.scss'
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService'
import { UserContext } from '../../context/UserContext';
const Login = (props) => {
    const { user, loginContext } = useContext(UserContext);

    let history = useHistory();
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
        }
    }, [])
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        history.push("/register");
        // window.location.reload();
    }


    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });

            toast.error("please enter your email address or your phone number");

            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            toast.error("please enter your password");
            return;
        }

        let response = await loginUser(valueLogin, password);

        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            localStorage.setItem('jwt', token);
            loginContext(data);
            history.push("/users");
            // window.location.reload();
        }

        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
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
                            Bảo hiểm sức khỏe
                        </div>
                        <input
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            type='text'
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input
                            className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()} >login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forget your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;