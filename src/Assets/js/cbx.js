function togglecbx(cbx) {
    let selH = cbx.firstElementChild.scrollHeight
    let box = cbx.children[1]
    let boxH = box.scrollHeight

    if (!box.className.includes('expanded')) {
        requestAnimationFrame(() => {
            box.style.transition = 'max-height .5s ease-in-out'
            // cbx.style.transition = 'max-height .5s ease-in-out'
            box.style.maxHeight = boxH + 'px'
            cbx.style.maxHeight = (boxH + selH) + 'px'
        })

        box.className = 'options options_expanded'
    }
}

function cbxitemselected(cbx, item) {
    let box = cbx.children[1]

    if (box.className.includes('expanded')) {
        item.parentNode.parentNode.firstElementChild.innerHTML = item.innerHTML
        let selH = cbx.firstElementChild.scrollHeight

        requestAnimationFrame(() => {
            box.style.transition = 'max-height .5s ease-in-out'
            cbx.style.transition = 'max-height .5s ease-in-out'
            box.style.maxHeight = '0px'
            cbx.style.maxHeight = selH + 'px'
        })

        box.className = 'options options_hidden'
    }
}
