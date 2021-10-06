// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    try{
        return  todosJSON ? JSON.parse(todosJSON) : []
    }catch(e){
        return []

    }
   

}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}
//toggle the complete value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if(todo){
        todo.completed = !todo.completed
    }
}

// Render application todos based on filters


const renderTodos = function (todos, filters) {
        const filteredTodos = todos.filter(function (todo) {
            const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
            const hideCompletedMatch = !filters.hideCompleted || !todo.completed
            
            return searchTextMatch && hideCompletedMatch
        })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    
if(filteredTodos.length > 0){
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}else{
    const messageEL = document.createElement('p')
    messageEL.classList.add('empty-message')
    messageEL.textContent = 'There are No todos to show'
    document.querySelector('#todos').appendChild(messageEL)
}

    
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filter);
    });

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

     //setup container
     todoEl.classList.add('list-item')
     containerEl.classList.add('list-item__conainer')
     todoEl.appendChild(containerEl) 

               

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button','button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })



    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.setAttribute('class','h2-sect');
    incompleteTodos.length === 1 ? summary.textContent = `You have ${incompleteTodos.length} todo left` : summary.textContent = `You have ${incompleteTodos.length} todos left`
    
   
    return summary
}