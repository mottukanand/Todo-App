import mock from "../mock"

let data = {
    tasks: [
        {
            id: 1,
            title: "Refactor Code",
            desc:
                "Pie liquorice wafer cotton candy danish. Icing topping jelly-o halvah pastry lollipop.",
            tags: "doc",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 2,
            title: "Submit Report",
            desc:
                "Donut tart toffee cake cookie gingerbread. Sesame snaps brownie sugar plum candy canes muffin cotton candy.",
            tags: "frontend",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 3,
            title: "Send PPT 🎁",
            desc:
                "Dragée gummi bears tiramisu brownie cookie. Jelly beans pudding marzipan fruitcake muffin. Wafer gummi bears lollipop pudding lollipop biscuit.",
            tags: "backend",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 4,
            title: "Skype Tommy",
            desc: "Tart oat cake sesame snaps lollipop croissant cake biscuit.",
            tags: "bug",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 5,
            title: "Pick up Natasha 😁",
            desc:
                "Sweet roll toffee dragée cotton candy jelly beans halvah gingerbread jelly-o. Ice cream bear claw sugar plum powder.",
            tags: "",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 6,
            title: "Meet Jane ❤️",
            desc:
                "Toffee sugar plum oat cake tiramisu tart bonbon gingerbread cheesecake cake. ",
            tags: "backend",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 7,
            title: "Promot Products",
            desc:
                "Gummi bears bear claw cake tiramisu gummies tiramisu apple pie chocolate jujubes. ",
            tags: "",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 8,
            title: "Fix Project",
            desc:
                "Cookie fruitcake macaroon muffin apple pie chocolate bar toffee oat cake. Icing chocolate danish.",
            tags: "",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 9,
            title: "Remove redundant files",
            desc:
                "Brownie jelly beans tootsie roll brownie marshmallow. Sesame snaps halvah marzipan chocolate cake. Icing bear claw pie apple pie.",
            tags: "frontend",
            isTrashed: false,
            isCompleted: false
        },
        {
            id: 10,
            title: "Fix Responsiveness 💻",
            desc:
                "Jelly topping toffee bear claw. Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
            tags: "frontend",
            isTrashed: false,
            isCompleted: false
        }
    ],
    taskTags: [
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
        { label: "Doc", value: "doc" },
        { label: "Bug", value: "bug" }
    ]
}

// GET: Fetch Todos
mock.onGet("api/apps/todo").reply(request => {
    const filter = request.params.filter

    const filteredTasks = data.tasks
        .filter(task => {
            // If filter == all
            if (filter === "all") {
                return !task.isTrashed
            } else if (filter === "completed") {
                return !task.isTrashed && task.isCompleted
            } else if (filter === "trashed") {
                return task.isTrashed
            } else {
                return !task.isTrashed && (task.tags === filter)
            }
        })
        .reverse()

    return [200, JSON.parse(JSON.stringify(filteredTasks))]
})

// POST : Add new Tasks
mock.onPost("/api/apps/todo/new-task").reply(request => {
    // Get task from post data
    let task = JSON.parse(request.data).task
    const length = data.tasks.length
    let lastIndex = 0
    if (length) {
        lastIndex = data.tasks[length - 1].id
    }
    task.id = lastIndex + 1

    data.tasks.push(task)

    return [201, { created: true }]
})


// Trash Todo
mock.onPost("/api/app/todo/trash-todo").reply(request => {
    const todoId = request.data
    data.tasks = data.tasks.map(_todo => {
        if (_todo.id === todoId) {
            _todo.isTrashed = true
        }
        return _todo
    })
    return [200, todoId]
})

mock.onPut("/api/apps/todo/update-task").reply(request => {
    // Get bucket from post data
    let task = JSON.parse(request.data).task

    let index = data.tasks.findIndex(val => val.id === task.id);
    if (index !== -1) {
        data.tasks[index] = task
    }

    return [201, { created: true }]
})

mock.onPut("/api/apps/todo/update-complete").reply(request => {
    const todoId = request.data
    data.tasks = data.tasks.map(_todo => {
        if (_todo.id === todoId) {
            _todo.isCompleted = !_todo.isCompleted
        }
        return _todo
    })

    return [201, todoId]
})

// Fetch Buckets/ taskTags
mock.onGet("api/apps/buckets").reply(request => {

    const filteredTasks = data.taskTags;

    return [200, JSON.parse(JSON.stringify(filteredTasks))]
})

// POST : Add new Buckets
mock.onPost("/api/apps/todo/new-bucket").reply(request => {
    // Get bucket from post data
    let bucket = JSON.parse(request.data).bucket
    data.taskTags.push(bucket)
    return [201, { created: true }]
})

mock.onPut("/api/apps/todo/update-bucket").reply(request => {
    let bucket = JSON.parse(request.data).bucket;
    data.taskTags = data.taskTags.map(_tag => {
        if (_tag.value === bucket.value) {
            _tag.label = bucket.label
        }
        return _tag
    })

    return [201, bucket]
})