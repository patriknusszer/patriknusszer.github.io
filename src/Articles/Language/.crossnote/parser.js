({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser


applyMarkers: async function(
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
},


  onWillParseMarkdown: async function(markdown) {

  let applyMarkers = async function(
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
    markdown = await applyMarkers(markdown, '\'\'', 'example')
    markdown = await applyMarkers(markdown, '//', 'ipa', '/')
    markdown = await applyMarkers(markdown, '|', 'emphasis')
    markdown = await applyMarkers(markdown, '_', 'underline')
    return markdown
  },

  onDidParseMarkdown: async function(html) {
    return html
  },
})