import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRoles, deleteRole } from '../../services/rolesService';
import { toast } from 'react-toastify';

const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    const getAllRoles = async () => {
        const res = await fetchAllRoles();
        if (res && +res.EC === 0) {
            setListRoles(res.DT)
        }
    };

    useEffect(() => {
        getAllRoles()
    }, []);

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRoles()
        }
    }))

    const handleDeleteRole = async (role) => {
        const res = await deleteRole(role);
        if (res && +res.EC === 0) {
            toast.success(res.EM)
            getAllRoles()
        }
    };
    return (
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Url</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ?
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <span
                                            title='Delete'
                                            className='delete'
                                            onClick={() => handleDeleteRole(item)}
                                        >
                                            <i class="fa fa-trash"></i>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                    :
                    <>
                        <tr><td colSpan={4}>Not found roles</td></tr>
                    </>
                }
            </tbody>
        </table>
    );
})

export default TableRole;