import React, { Component } from 'react';
import { Row, Col, Card, CardBody, } from 'reactstrap';
import TodoSideBar from '../../components/TodoSideBar';
import TodoContent from '../../components/TodoContent'
import '../../assets/css/todo.css';

class Todo extends Component {


    render() {
        return (
            <>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                        <Card className="todo-application">
                            <CardBody>
                                <Row>
                                    <Col lg={3}>
                                        <TodoSideBar />
                                    </Col>
                                    <Col lg={9}>
                                        <TodoContent />
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </>
        )
    }
}
export default Todo;