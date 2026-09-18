import ItemViewTemplate from "../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./French.md?raw"

function applyFrenchWordMarker(text: string, marker: string, className: string) {
    const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const frenchLetter = "A-Za-zÀ-ÖØ-öø-ÿŒœÆæÇçŸ";
    const frenchWord = `[${frenchLetter}]+(?:\\.[${frenchLetter}]+)*`;

    const regex = new RegExp(`\\^(${frenchWord})`, "g");

    return text.replace(regex, (_, word) =>
        `<span class="${className}">${word}</span>`
        );  
}

function applyMarkers(
    text: string,
    marker: string,
    className: string,
    surround = ""
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


function French() {
    //useMathJax(
    let m_article = applyMarkers(article, '\'\'', 'emphasis')
    m_article = applyMarkers(m_article, '//', 'ipa', '/')
    m_article = applyMarkers(m_article, '^', 'example')
    m_article = applyMarkers(m_article, '__', 'underline')
    return (
        <>
              <style>{`
              .underline {
              text-decoration: underline;
              }
                .example {
                                    /*color: #8062af;*/
color:#9161dd;
                }
                .emphasis {
                    color:  #ffcba0;
                }
                .ipa {
                    color: #e7a5ff;
                }
                strong {
                /*color:  #ffcba0;*/
                    color:  #ffcba0;
                }
                em {
                    color: #8062af;
                /*color: #7860a0;*/ 
                /* color: #725e93; */
                }

            `}</style>
            <ItemViewTemplate
                title="Learning French pronounciation with IPA"
                subtitle="An introduction to IPA and its common phonemes in French"
                description={m_article}
            />
        </>
    );
}

export default French;