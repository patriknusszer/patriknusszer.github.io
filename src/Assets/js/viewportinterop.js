var match, noMatch, mq

function callback() {
    console.log('change')
    if (mq.matches)
        match.click()
    else noMatch.click()
}

function registerResizeHandler(onMatch, onElse, query) {
    match = onMatch
    noMatch = onElse
    console.log(query)

    mq = window.matchMedia(query)
    mq.addEventListener('change', callback)

    if (mq.matches)
        onMatch.click()
}