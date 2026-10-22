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
    markdown = markdown.replace(
    /<!--\s*(.*?)\s*-->/g,
    (_, id) => `<span id="${id}"></span>`
    );


    return markdown
}