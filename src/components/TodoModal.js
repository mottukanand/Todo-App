import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux';
import { getTodos, getBuckets, addNewBucket, addNewTask,updateTask } from "../redux/actions/todo/index"

const TodoModal = ({ modal, toggleTodoModal, getBuckets, buckets, addNewBucket, addNewTask, updateTask, taskObj, filterValue, handleAllData }) => {


    console.log(taskObj, "taskObjtaskObj")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [bucketData, setBucketData] = useState({});

    useEffect(() => {
        getBuckets().then(() => {
            if (taskObj) {
                setTitle(taskObj.title);
                setDescription(taskObj.desc)
                let dat = buckets.find(val => val.value === taskObj.tags)
                setBucketData(dat);
            }
        })

    }, [])

    const handleOnChange = (selectedOption) => {
        console.log("selectedOption", selectedOption)
        if (selectedOption) {
            let dat = {};
            dat.value = selectedOption.value;
            dat.label = selectedOption.label;

            if (selectedOption.__isNew__) {
                addNewBucket(dat)
            }

            setBucketData(dat)
        } else {
            setBucketData("")
        }
    }

    const createTask = () => {
        if (title && description) {
            let sendData = {};
            sendData.title = title;
            sendData.desc = description;
            bucketData.value ? (sendData.tags = bucketData.value) : (sendData.tags = "")
            console.log(sendData, "Sewndata")
            addNewTask(sendData)
            toggleTodoModal();
            handleAllData()

        }
    }

    const editTask = () => {
        console.log(taskObj,"MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
        if (title && description) {
            let sendData = {};
            sendData.id = taskObj.id;
            sendData.isCompleted = taskObj.isCompleted;
            sendData.isTrashed = taskObj.isTrashed;
            sendData.title = title;
            sendData.desc = description;
            bucketData && bucketData.value ? (sendData.tags = bucketData.value) : (sendData.tags = "")
            console.log(sendData, "Sewndata")
            updateTask(sendData, filterValue)
            toggleTodoModal();

        } 
    }

    return (
        <>
            <Modal
                isOpen={modal}
                toggle={toggleTodoModal}
                className="modal-dialog-centered"
                size="lg"
            >
                <ModalHeader toggle={toggleTodoModal} className="bg-primary" style={{color :"#fff"}}>
                    {taskObj ? "Update Task" : "Add Task"}
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                    <Form style={{ width: "100%" }}>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" name="title" id="exampleEmail" placeholder="Title" value={title ? title : ""} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Description</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Description" value={description ? description : ""} onChange={(e) => setDescription(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Bucket</Label>
                            <Col sm={10}>
                                <CreatableSelect
                                    value={bucketData || ""}
                                    isClearable
                                    onChange={handleOnChange}
                                    options={buckets}
                                    isSearchable={true}
                                />
                            </Col>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={toggleTodoModal}>
                                Cancel
          </Button>
                    {
                        taskObj
                            ?
                            <Button color="primary" onClick={editTask}>
                                Update Task
          </Button>
                            :
                            <Button color="primary" onClick={createTask}>
                                Create Task
          </Button>

                    }

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
    { getTodos, getBuckets, addNewBucket, addNewTask,updateTask }
)(TodoModal);