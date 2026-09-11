function getreferences(callback) {
	var refreq = new XMLHttpRequest()

    refreq.onreadystatechange = function () {
        if (refreq.readyState == 4)
            callback(JSON.parse(refreq.responseText))
    }

	refreq.open('GET', 'https://nusstudios.com/reference/getreferences')
	refreq.send()
}

function drawReference(reference) {
	var bubble = document.createElement('div')
	var vert = document.createElement('div')
	vert.className = 'vcentered'

	bubble.className = 'reference'
	var opinion = document.createElement('p')
	opinion.innerHTML = reference['opinion']
	vert.appendChild(opinion)

	var education = document.createElement('p')
	education.className = 'education'
	education.innerHTML = reference['education']
	vert.appendChild(education)

	var contacturl

	if (reference['contacturl']) {
		contacturl = document.createElement('a')
		contacturl.setAttribute('href', reference['contacturl'])
		contacturl.setAttribute('target', '_blank')
		contacturl.className = 'hasurl'
	}
	else {
		contacturl = document.createElement('p')
		contacturl.className = ''
	}
	
	contacturl.className += ' contacturl'
	contacturl.innerHTML = reference['name']
	vert.appendChild(contacturl)

	bubble.appendChild(vert)
	document.getElementById('panel').appendChild(bubble)
}

function drawReferences() {
	getreferences((references) => {
		for (var i = 0; i < references.length; i++)
			drawReference(references[i])
	})


}

window.addEventListener('DOMContentLoaded', (event) => drawReferences());