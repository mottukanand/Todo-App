import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos, getBuckets, addNewBucket, addNewTask, trashTask, completeTask } from "../redux/actions/todo/index"
import {
    Button, Container, Row, Col, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem, Badge, ButtonToggle, Table
    , Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, List
} from 'reactstrap';
import TodoModal from './TodoModal';
import { Info, Edit, Trash, Tag, Layers, Star, Check } from "react-feather";

const TodoContent = ({ todos, getTodos, trashTask, completeTask, filterValue }) => {

    const [modal, setModal] = useState(false);
    const [taskObj, setTaskObj] = useState({})

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        getTodos({ filter: "all" })
    }, []);

    const handleDelete = (id) => {
        trashTask(id, filterValue)
    }

    const handleEdit = (data) => {
        setTaskObj(data)
        toggleModal()
    }
    return (
        <>
            <Card>
                <CardHeader className="center">
                    <h5>TODO - {filterValue.toUpperCase()}</h5>
                </CardHeader>
                <CardBody>
                    <Table hover responsive style={{ minHeight: "125px" }}>
                        <tbody>
                            {
                                todos && todos.length ?
                                    todos.map((val, index) =>
                                        <tr key={index} className="text-color">
                                            <td>
                                                <Input
                                                    type="checkbox"
                                                    checked={val.isCompleted}
                                                    onClick={e => {
                                                        completeTask(val.id, filterValue)
                                                    }} />
                                            </td>
                                            <td>{val.title}</td>
                                            <td>{val.desc}</td>
                                            <td>
                                                <UncontrolledDropdown className="d-inline-block">
                                                    <DropdownToggle tag="span">
                                                        <Info className="mr-50" size={20} />
                                                    </DropdownToggle>
                                                    <DropdownMenu tag="ul" right>
                                                        <DropdownItem tag="li" className="pointer" onClick={(e) => handleEdit(val)}>
                                                            <Edit size={17} />
                                                            <span className="align-middle ml-1">Edit</span>
                                                        </DropdownItem>
                                                        {filterValue !== "trashed" &&
                                                            <DropdownItem tag="li" className="pointer" onClick={(e) => handleDelete(val.id)}>
                                                                <span>
                                                                    <Trash size={17} />
                                                                    <span className="align-middle ml-1">Delete</span>
                                                                </span>
                                                            </DropdownItem>
                                                        }
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        </tr>)
                                    :
                                    <tr>
                                        <td colSpan="4" style={{ color: "red" }}>No Tasks Found</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

            {
                modal &&
                <TodoModal modal={modal} toggleTodoModal={toggleModal} taskObj={taskObj} filterValue ={filterValue} />
            }
        </>
    )
}

const mapStateToProps = state => {
    const { todos, buckets } = state.todoApp.todo;
    return { todos, buckets };
};
export default connect(
    mapStateToProps,
    { getTodos, getBuckets, addNewBucket, addNewTask, trashTask, completeTask }
)(TodoContent);