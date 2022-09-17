const textArea = document.querySelector('.tasks__input')
const createTaskButton = document.querySelector('.tasks__add')
let toDoList = document.querySelector('.tasks__list')
const toDoStorage = window.localStorage;

function addTask(event) {
    if (event.type === 'click' && textArea.value.trim() != '') {
        const divTask = document.createElement('div')
        divTask.classList.add('task')

        const divTaskText = document.createElement('div')
        divTaskText.classList.add('task__title')
        divTaskText.textContent = textArea.value
        divTask.appendChild(divTaskText)

        const divTaskRemove = document.createElement('a')
        divTaskRemove.setAttribute('href', "#")
        divTaskRemove.classList.add('task__remove')
        divTaskRemove.textContent = '×'
        divTask.appendChild(divTaskRemove)

        toDoList.appendChild(divTask)
        toDoStorage.setItem('toDoList', toDoList.innerHTML)
    }
    event.preventDefault()
}

function getTasks(event) {
    if (toDoStorage.getItem('toDoList')!=null) {
        toDoList.innerHTML = toDoStorage.getItem('toDoList')
    }
}

function removeTask(event) {
    const parent = event.target.closest('.task')
    parent.remove()
    toDoStorage.setItem('toDoList', toDoList.innerHTML)
    event.preventDefault()
}

textArea.addEventListener('keyup', addTask)
createTaskButton.addEventListener('click', addTask)
document.addEventListener('DOMContentLoaded', getTasks)
document.addEventListener('click', e=>{
    if (e.target.classList.contains('task__remove')) removeTask(e)
})
