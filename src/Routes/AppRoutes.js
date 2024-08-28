import {
    Switch,
    Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Users from '../components/ManageUsers/Users';
import Register from '../components/Register/Register';
import Role from '../components/Role/Roles'
import PrivateRoutes from "./PrivateRoutes";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoute = (props) => {

    const Project = () => {
        return (
            <span>projects</span>
        )
    }
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Project} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />


                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/" exact>
                    Home
                </Route>
                <Route path="*">
                    404 not found!
                </Route>
            </Switch>
        </>
    )

}

export default AppRoute