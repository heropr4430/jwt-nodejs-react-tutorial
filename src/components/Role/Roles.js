import './Role.scss'
import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/rolesService'
import TableRole from './TableRole'
const Role = (props) => {
    const dataChildDefault = { url: '', description: '', isValidUrl: true };
    const childRef = useRef();
    const [listChilds, setListChilds] = useState({ dataChildDefault })

    useEffect(() => {

    }, [])

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;
        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;

        }
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);

    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);

    }

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        let invalidObj = Object.entries(listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url
        })

        if (!invalidObj) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            console.log(res)
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchListRolesAgain();
            }
        } else {
            toast.error('Input URL must not be empty!');
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);

        }
    }
    return (
        <>
            <div className="role-container">
                <div className="container">
                    <div className="adding-roles mt-3">
                        <div className="title-role"><h4>Add new role</h4></div>
                        <div className=" role-parent">
                            {Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className="col-5 form-group">
                                            <label>URL:</label>
                                            <input
                                                type="text"
                                                value={child.url}
                                                className={child.isValidUrl ? `form-control` : 'form-control is-invalid'}
                                                onChange={(event) => handleOnchangeInput('url', event.target.value, key)} />
                                        </div>
                                        <div className="col-5 form-group">
                                            <label>Description:</label>
                                            <input type="text"
                                                value={child.description}
                                                className="form-control"
                                                onChange={(event) => handleOnchangeInput('description', event.target.value, key)} />
                                        </div>
                                        <div className="col-2 mt-4 actions">
                                            <i class="fa fa-plus add" onClick={() => handleAddNewInput()}></i>
                                            {index >= 1 &&
                                                <i class="fa fa-trash-o delete" onClick={() => handleDeleteInput(key)} ></i>
                                            }
                                        </div>
                                    </div>
                                )
                            })}

                            <div className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</div>

                        </div>
                    </div>
                    <hr />
                    <div className='mt-3 table-role'>
                        <h4>List current roles: </h4>
                        <TableRole ref={childRef} />
                    </div>

                </div>

            </div>
        </>

    )

}

export default Role;