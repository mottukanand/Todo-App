import axios from "axios"

export const getTodos = routeParams => {
    console.log(routeParams, "WWWWWWWWWWWWW")
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
// export const completeTask = todo => {
//   return dispatch => {
//     dispatch({ type: "COMPLETE_TASK", id: todo.id, value: todo.isCompleted })
//   }
// }

// export const starTask = todo => {
//   return dispatch => {
//     Promise.all([
//       dispatch({ type: "STAR_TASK", id: todo.id, value: todo.isStarred })
//     ])
//   }
// }

// export const importantTask = todo => {

//   return dispatch => {
//     Promise.all([
//       dispatch({ type: "IMPORTANT_TASK", id: todo.id, value: todo.isImportant })
//     ])
//   }
// }

export const trashTask = id => {
  return (dispatch) => {
    axios
      .post("/api/app/todo/trash-todo", id)
      .then(response => dispatch({ type: "TRASH_TASK", id }))
      .then(dispatch(getTodos({filter : "all"})))
  }
}

// export const updateTodo = todo => {
//   const request = axios.post("/api/apps/todo/update-todo", todo)
//   return (dispatch, getState) => {
//     const params = getState().todoApp.todo.routeParam
//     request.then(response => {
//       Promise.all([
//         dispatch({
//           type: "UPDATE_TODO",
//           todos: response.data
//         })
//       ]).then(() => dispatch(getTodos(params)))
//     })
//   }
// }

// export const updateTask = (id, title, desc) => {
//   return dispatch => {
//     dispatch({ type: "UPDATE_TASK", id, title, desc })
//   }
// }

// export const updateLabel = (id, label) => {
//   return (dispatch, getState) => {
//     dispatch({ type: "UPDATE_LABEL", label, id })
//   }
// }

export const addNewTask = task => {
    return (dispatch) => {
        axios.post("/api/apps/todo/new-task", { task }).then(response => {
            dispatch({ type: "ADD_TASK", task })
            dispatch(getTodos({filter : "all"}))
        })
    }
}

export const updateTask = task => {
    return (dispatch) => {
        axios.put("/api/apps/todo/update-task", { task }).then(response => {
            dispatch({ type: "UPDATE_TASK", task })
            dispatch(getTodos({filter : "all"}))
        })
    }
}



// export const searchTask = val => {
//   return dispatch => {
//     dispatch({
//       type: "SEARCH_TASK",
//       val
//     })
//   }
// }

// export const changeFilter = filter => {
//   return dispatch => {
//     dispatch({ type: "CHANGE_FILTER", filter })
//     history.push(`/todo/${filter}`)
//     dispatch(getTodos({ filter }))
//   }
// }
