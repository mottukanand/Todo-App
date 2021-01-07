import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos, getBuckets, addNewBucket, addNewTask } from "../redux/actions/todo/index"
import {Card,  CardBody,ListGroup, ListGroupItem, ButtonToggle, 
} from 'reactstrap';
import TodoModal from './TodoModal';
import BucketEditModal from './BucketEditModal'
import { Edit, Trash, Layers, Check } from "react-feather";

const TodoSideBar = ({ buckets, getBuckets, getTodos ,handleFilterValue}) => {

    useEffect(() => {
        getBuckets();
    }, [])

    const [modal, setModal] = useState(false);
    const [toggleBucket, setToggleBucket] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [selectBucket, setSelectBucket] = useState("")

    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleBucketModal = () => {
        setToggleBucket(!toggleBucket);
    }

    const handleAllData = () => {
        setSelectedFilter("all")
    }

    const handleFilter = (filterType) => {
        handleFilterValue(filterType)
        setSelectedFilter(filterType)
        let dat = { "filter": filterType };
        getTodos(dat)
    }

    const handleBucketEdit = (e,label) => {
        e.stopPropagation();
        toggleBucketModal();
        setSelectBucket(label)

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
                    <ListGroup className="font-medium-1">
                        <ListGroupItem
                            className={"border-0 pl-0 pointer "}
                            // className={"border-0 pl-0 pointer " + (selectedFilter === "completed" ? 'active' : '')}
                            active={
                                selectedFilter === "all"
                                    ? true
                                    : false
                            }
                            onClick={() => handleFilter("all")}
                        >
                            <Layers size={22} />
                            <span className="align-middle ml-1">All</span>
                        </ListGroupItem>
                    </ListGroup>
                        {/* <List type="unstyled" >
                            <li className={"pointer " + (selectedFilter === "all" ? 'active' : '')} onClick={() => handleFilter("all")}>
                                <Layers size={22} />
                                <span className="align-middle ml-1 text-color">All</span>
                            </li>
                        </List> */}
                    </div>
                    <hr />
                    <h5 className="mt-2 mb-1 pt-25">Filters</h5>
                    <ListGroup className="font-medium-1">
                        <ListGroupItem
                            className={"border-0 pl-0 pointer "}
                            // className={"border-0 pl-0 pointer " + (selectedFilter === "completed" ? 'active' : '')}
                            active={
                                selectedFilter === "completed"
                                    ? true
                                    : false
                            }
                            onClick={() => handleFilter("completed")}
                        >
                            <Check size={22} />
                            <span className="align-middle ml-1">Completed</span>
                        </ListGroupItem>
                        <ListGroupItem
                            className="border-0 pl-0 pointer"
                            active={
                                selectedFilter === "trashed"
                                    ? true
                                    : false
                            }
                            onClick={() => handleFilter("trashed")}
                        >
                            <Trash size={22} />
                            <span className="align-middle ml-1">Trashed</span>
                        </ListGroupItem>
                    </ListGroup>
                    <hr />
                    <h5 className="mt-2 mb-4 pt-25" >Buckets</h5>
                    <ListGroup className="font-medium-1">
                        {
                            buckets && buckets.length ?
                                buckets.map((val, index) =>
                                    <ListGroupItem
                                        className="border-0 pl-0 pointer"
                                        key={index}
                                        onClick={() => handleFilter(val.value)}
                                        active={
                                            selectedFilter === val.value
                                                ? true
                                                : false
                                        }
                                    >
                                        <span className="bullet bullet-primary align-middle" />
                                        <span className="align-middle ml-3">{val.label}</span>
                                        <Edit size={15} className="fl-r" onClick={(e) => handleBucketEdit(e, val)}/>
                                    </ListGroupItem>)
                                :
                                null
                        }
                    </ListGroup>
                    {/* <List type="unstyled"  className="font-medium-1">
                        {
                            buckets && buckets.length ?
                                buckets.map((val, index) =>
                                    <li className="mt-2 mb-3 pt-25" key={index} className="pointer border-0" onClick={() => handleFilter(val.value)}>
                                        <span className="bullet bullet-primary align-middle" />
                                        <span className="align-middle ml-1 text-color">{val.label}</span>
                                    </li>)
                                :
                                null
                        }

                    </List> */}
                </CardBody>
            </Card>

            {
                modal &&
                <TodoModal modal={modal} toggleTodoModal={toggleModal} taskObj={false} handleAllData={handleAllData}/>
            }
            {
                toggleBucket &&
                <BucketEditModal toggleBucket={toggleBucket}  toggleBucketModal = {toggleBucketModal} selectBucket ={selectBucket} buckets= {buckets} />
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