import axios from "axios"

export const getTodos = routeParams => {
    return async dispatch => {
        await axios
            .get("api/apps/todo", {
                params: routeParams
            })
            .then(result => {
                dispatch({
                    type: "GET_TODOS",
                    todos: result.data,
                    routeParams
                })
            })
            .catch(err => console.log(err))
    }
}

export const addNewTask = task => {
    return (dispatch) => {
        axios.post("/api/apps/todo/new-task", { task }).then(response => {
            dispatch({ type: "ADD_TASK", task })
            dispatch(getTodos({ filter: "all" }))
        })
    }
}

export const updateTask = (task, filterValue) => {
    return (dispatch) => {
        axios.put("/api/apps/todo/update-task", { task }).then(response => {
            dispatch({ type: "UPDATE_TASK", task })
            dispatch(getTodos({ filter: filterValue }))
        })
    }
}

export const completeTask = (id, filterValue) => {
    return (dispatch) => {
        axios
            .put("/api/apps/todo/update-complete", id)
            .then(response => dispatch({ type: "COMPLETE_TASK", id }))
            .then(dispatch(getTodos({ filter: filterValue })))
    }
}

export const trashTask = (id, filterValue) => {
    return (dispatch) => {
        axios
            .post("/api/app/todo/trash-todo", id)
            .then(response => dispatch({ type: "TRASH_TASK", id }))
            .then(dispatch(getTodos({ filter: filterValue })))
    }
}

export const getBuckets = () => {
    return async dispatch => {
        await axios
            .get("api/apps/buckets")
            .then(result => {
                dispatch({
                    type: "GET_BUCKETS",
                    buckets: result.data,
                })
            })
            .catch(err => console.log(err))
    }
}

export const addNewBucket = bucket => {
    return async dispatch => {
        await axios
            .post("/api/apps/todo/new-bucket", { bucket })
            .then(result => {
                dispatch({ type: "ADD_BUCKET", bucket })
                dispatch(getBuckets())
            })
            .catch(err => console.log(err))
    }
}

export const updateBucket = (bucket) => {
    return (dispatch) => {
        axios.put("/api/apps/todo/update-bucket", { bucket }).then(response => {
            dispatch({ type: "UPDATE_BUCKET", bucket })
            dispatch(getBuckets())
        })
    }
}

