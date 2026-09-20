

  function processHtml(markdown) {

  let applyMarkers = function(
      text,
      marker,
      className,
      surround = ''
  ) {
      let occurrence = 0;

      return text.replaceAll(marker, () => {
          const isOpening = occurrence % 2 === 0;
          occurrence++;

          return isOpening
              ? `<span class="${className}">${surround}`
              : `${surround}</span>`;
      });
  }
    markdown = applyMarkers(markdown, '\'\'', 'example')
    markdown = applyMarkers(markdown, '//', 'ipa', '/')
    markdown = applyMarkers(markdown, '|', 'emphasis')
    markdown = applyMarkers(markdown, '_', 'underline')
    return markdown
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.body.innerHTML = ''
processHtml(document.body.innerHTML)
  })