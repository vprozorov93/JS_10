const tooltips = Array.from(document.querySelectorAll('.has-tooltip'))

function clickTooltip(event) {
    const activeTooltip = event.currentTarget.querySelector('.tooltip_active')
    if (activeTooltip) {
        activeTooltip.remove()
    } else {
        const allTooltip = Array.from(document.querySelectorAll('.tooltip_active'))
        allTooltip.forEach((element) => {element.remove()})

        const coordinates = event.currentTarget.getBoundingClientRect()
        const tooltip = `<div class="tooltip tooltip_active" style="left: ${coordinates.right}px; top: ${coordinates.bottom}px">
                        ${event.currentTarget.getAttribute('title')}
                        </div>`
        event.currentTarget.insertAdjacentHTML('beforeend', tooltip)

    }
    
    event.preventDefault()
}

tooltips.forEach((element) => {
    element.addEventListener('click', clickTooltip)
})

