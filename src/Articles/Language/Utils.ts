export function preprocessMarkdown(markdown: string) {
    let applyMarkers = function(
      text: string,
      marker: string,
      className: string,
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
      markdown = applyMarkers(markdown, '//', 'ipa', '/')
            console.log(markdown)

          markdown = applyMarkers(markdown, '_', 'underline')

    markdown = applyMarkers(markdown, '\'\'', 'example')
    markdown = applyMarkers(markdown, '|', 'emphasis')
    return markdown
}