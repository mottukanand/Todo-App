import React, { Component } from 'react';

class Todo extends Component {
    state = {
        todo: "",
        updateTodo: false,
        data: [],
        updatedData: ""
    }
    handleInputChange = (e) => {
        console.log(e.target.value)
        let dat = e.target.value;
        this.setState({
            todo: dat
        })
    }

    handleAddToDo = () => {
        let listData = this.state.data;
        console.log(this.state.todo,"rrrrrrrrrrrrrr",this.state.updateTodo, "ssssss",this.state.updatedData)
        if (this.state.todo) {
            if (this.state.updateTodo) {
                let indx = listData.indexOf(this.state.updatedData );
                console.log(indx,"indexxxxxxxxxxxxxxx")
                if(indx !== -1){
                    listData[indx] = this.state.todo;
                    this.setState({
                        data: listData,
                        todo: "",
                        updatedData :"",
                        updateTodo : false
                    })
                }

            } else {
                    listData.push(this.state.todo)
                    this.setState({
                        data: listData,
                        todo: ""
                    })
            }
        }
    }

    handleEdit = (data) => {
        this.setState({
            updatedData: data,
            todo: data,
            updateTodo: true
        })
    }

    handleDelete = (data) => {
        let listData = this.state.data;
        let lis = listData.filter(val => val !== data);
        this.setState({
            data: lis
        })
    }

    handleCancel = () => {
        this.setState({
            updatedData : "",
            updateTodo : false,
            todo : ""
        })
    }

    render() {
        const { data, todo, updateTodo } = this.state;
        return (
            <>
                <input name="todo" type="text" value={todo || ""} onChange={(e) => this.handleInputChange(e)} />
                <button onClick={this.handleAddToDo} > {updateTodo ? "Update To Do" : "Add To Do"}</button>
                {updateTodo &&  <button onClick={this.handleCancel} > Cancel</button>}
                {data.length
                    ?

                    <table style={{ width: "100%" }}>
                        <tr>
                            <th>Task</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {
                            data.length
                            &&
                            data.map((val, index) => <tr key={index}>
                                <td>{val}</td>
                                <td><button onClick={(e) => this.handleEdit(val)}>Edit</button></td>
                                <td><button onClick={(e) => this.handleDelete(val)}>Delete</button></td>
                            </tr>)
                        }
                    </table>
                    :
                    null
                }

            </>
        )
    }
}
export default Todo