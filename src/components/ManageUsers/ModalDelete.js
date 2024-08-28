import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={props.show} onHide={props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete user: {props.dataModal.email} ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>are you sure to delete this user</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={props.confirmDeleteUser}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalDelete;