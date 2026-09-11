function copyover(btn) {
    btn.parentElement.querySelector('.copy_to').value = btn.parentElement.querySelector('.copy_from').value
    btn.removeAttribute('onclick')
    btn.setAttribute('type', 'submit')
    btn.click()

}