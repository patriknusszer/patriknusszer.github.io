import ItemViewTemplate from "../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./French.md?raw"


function French() {
    //useMathJax()

    return (
        <>
            <ItemViewTemplate
                title="Learning French pronounciation with IPA"
                subtitle="An introduction to IPA and its common phonemes in French"
                description={article}
            />
        </>
    );
}

export default French;