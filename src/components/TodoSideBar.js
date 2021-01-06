import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos, getBuckets, addNewBucket, addNewTask } from "../redux/actions/todo/index"
import {
    Button, Container, Row, Col, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem, Badge, ButtonToggle, Table
    , Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, List
} from 'reactstrap';
import TodoModal from './TodoModal';
import { Info, Edit, Trash, Tag, Layers, Star, Check } from "react-feather";

const TodoSideBar = ({ buckets,getBuckets,getTodos }) => {

    useEffect(() => {
        getBuckets();
    }, [])

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleFilter = (filterType) => {
        let dat = { "filter" : filterType};
        getTodos(dat);
    }
    return (
        <>
            <Card>
                <CardBody>
                    <div>
                        <ButtonToggle style={{ width: "100%" }} color="primary" onClick={toggleModal}>Add Task</ButtonToggle>
                    </div>
                    <hr />
                    <div>
                        <List type="unstyled" >
                            <li className="pointer" onClick={() => handleFilter("all")}>
                                <Layers size={22} />
                                <span className="align-middle ml-1 text-color">All</span>
                            </li>
                        </List>
                    </div>
                    <hr />
                    <h5 className="mt-2 mb-4 pt-25" >Buckets</h5>
                    <List type="unstyled" >
                        {
                            buckets && buckets.length ?
                                buckets.map((val, index) =>
                                    <li className="mt-2 mb-3 pt-25" key={index} className="pointer" onClick={() => handleFilter(val.value)}>
                                        <span className="bullet bullet-primary align-middle" />
                                        <span className="align-middle ml-1 text-color">{val.label}</span>
                                    </li>)
                                :
                                null
                        }

                    </List>
                </CardBody>
            </Card>

            {
                modal &&
                <TodoModal modal={modal} toggleTodoModal={toggleModal}  taskObj = {false}/>
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
    { getTodos, getBuckets, addNewBucket, addNewTask }
)(TodoSideBar);