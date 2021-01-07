import React, { Component } from 'react';
import { Row, Col, Card, CardBody, } from 'reactstrap';
import TodoSideBar from '../../components/TodoSideBar';
import TodoContent from '../../components/TodoContent'
import '../../assets/css/todo.css';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class Todo extends Component {
state = {
    filterValue : "all"
}

handleFilterValue = (val) => {
    this.setState({ filterValue : val});
}

    render() {
        const {filterValue} = this.state;
        return (
            <>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                        <Card className="todo-application">
                            <CardBody>
                                <Row>
                                    <Col lg={3}>
                                        <TodoSideBar handleFilterValue ={this.handleFilterValue}/>
                                    </Col>
                                    <Col lg={9}>
                                        <TodoContent filterValue ={filterValue} />
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
                <ToastContainer />
            </>
        )
    }
}
export default Todo;