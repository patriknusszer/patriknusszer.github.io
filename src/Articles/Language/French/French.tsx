import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./French.md?raw"
import { preprocessMarkdown } from "../utils.ts";
import Style from "../Style.tsx";

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
    return (
        <>
            <Style />
            <link rel="stylesheet" href="../style.css" />
            <ItemViewTemplate
                title="Learning French pronounciation with IPA"
                subtitle="An introduction to IPA and its common phonemes in French"
                description={preprocessMarkdown(article)}
            />
        </>
    );
}

export default French;