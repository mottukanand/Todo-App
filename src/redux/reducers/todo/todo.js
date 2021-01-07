const initialState = {
    todos: [],
    routeParam: null,
    filteredTodos: [],
    buckets: [],
    addBucket: false,
    addTask: false
}

const todo = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TODOS":
            return { ...state, todos: action.todos, routeParam: action.routeParams }
        case "ADD_TASK":
            return { ...state, addTask: true }

        case "ADD_BUCKET":
            return { ...state, addBucket: true }
        case "GET_BUCKETS":
            return { ...state, buckets: action.buckets }

        case "TRASH_TASK":
            state.todos.find(i => i.id === action.id).isTrashed = true
            return { ...state }

        default:
            return state
    }
}

export default todo
