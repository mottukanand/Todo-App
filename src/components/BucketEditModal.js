import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { updateBucket } from "../redux/actions/todo/index";
import { toast, Zoom } from "react-toastify"

const BucketEditModal = ({ toggleBucket, toggleBucketModal, selectBucket, updateBucket, buckets }) => {
    const [title, setTitle] = useState("");

    useEffect(() => {setTitle(selectBucket.label)}, [selectBucket]);

    const checkBucketExist = (tag) => {
        let a = buckets.findIndex(val => val.value === tag)
        if (a === -1) {
            return true;
        } else {
            return false;
        }
    }

    const editBucket = () => {
        if (title) {
            if (checkBucketExist(title.toLowerCase())) {
                let sendData = { ...selectBucket }

                sendData.label = title
                updateBucket(sendData);
                toggleBucketModal();
            } else {
                toast.error("Bucket already exist", { transition: Zoom });
            }
        } else {
            toast.error("Title Field should not be empty", { transition: Zoom });
        }
    }


    return (
        <>
            <Modal
                isOpen={toggleBucket}
                toggle={toggleBucketModal}
                className="modal-dialog-centered"
                size="lg"
            >
                <ModalHeader toggle={toggleBucketModal} className="bg-primary" style={{ color: "#fff" }}>
                    Edit Bucket
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                    <Form style={{ width: "100%" }}>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" name="title" id="exampleEmail" placeholder="Title" value={title ? title : ""} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggleBucketModal}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={editBucket}>
                        Update Bucket
                     </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}


const mapStateToProps = state => {
    const { todos, buckets } = state.todoApp.todo;
    return { todos, buckets };
};
export default connect(
    mapStateToProps,
    { updateBucket }
)(BucketEditModal);