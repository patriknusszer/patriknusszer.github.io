export function onLoad() {
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        }
    };

    console.log('onloaded')
    let mathjax = document.createElement('script');
    mathjax.src = 'js/es5/tex-svg.js'
    mathjax.type = 'text/javascript'
    document.head.appendChild(mathjax);
}

export function onUpdate() {
    console.log('onupdated')
}

export function onDispose() {
    window.MathJax = undefined
}