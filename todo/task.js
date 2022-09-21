const textArea = document.querySelector('.tasks__input')
const createTaskButton = document.querySelector('.tasks__add')
let toDoList = document.querySelector('.tasks__list')
const toDoStorage = window.localStorage;
let localItemObjects = []

function createTaskElement(value) {
    const divTask = document.createElement('div')
    divTask.classList.add('task')
    divTask.innerHTML = `<div class="task__title">${value}</div><a href="#" class="task__remove">×</a>`
    toDoList.appendChild(divTask)
}

function addTask(event) {
    if (event.type === 'click' && textArea.value.trim() != '') {
        // const divTask = document.createElement('div')
        // divTask.classList.add('task')

        // const divTaskText = document.createElement('div')
        // divTaskText.classList.add('task__title')
        // divTaskText.textContent = textArea.value
        // divTask.appendChild(divTaskText)

        // const divTaskRemove = document.createElement('a')
        // divTaskRemove.setAttribute('href', "#")
        // divTaskRemove.classList.add('task__remove')
        // divTaskRemove.textContent = '×'
        // divTask.appendChild(divTaskRemove)

        // const divTask = document.createElement('div')
        // divTask.classList.add('task')
        // divTask.innerHTML = `<div class="task__title">${textArea.value}</div><a href="#" class="task__remove">×</a>`
        // toDoList.appendChild(divTask)

        createTaskElement(textArea.value)
        localItemObjects.push({value: textArea.value})
        toDoStorage.setItem('toDoList', JSON.stringify({items: localItemObjects}))
        textArea.value = ''
    }
    event.preventDefault()
}

function getTasks(event) {
    if (toDoStorage.getItem('toDoList')!=null) {
        localItemObjects = JSON.parse(toDoStorage.getItem('toDoList')).items
        localItemObjects.forEach((element) => {
            createTaskElement(element.value)
        })
    }
}

function removeTask(event) {
    const parent = event.target.closest('.task')
    const valueOfRemovedElement = parent.querySelector('.task__title').textContent
    for (let [index, value] of localItemObjects.entries()){
        if (value.value === valueOfRemovedElement){
            localItemObjects.splice(index, 1)
        }
    }
    parent.remove()
    toDoStorage.setItem('toDoList', JSON.stringify({items: localItemObjects}))
    event.preventDefault()
}

textArea.addEventListener('keyup', addTask)
createTaskButton.addEventListener('click', addTask)
document.addEventListener('DOMContentLoaded', getTasks)
document.addEventListener('click', e=>{
    if (e.target.classList.contains('task__remove')) removeTask(e)
})
