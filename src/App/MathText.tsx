import katex from "katex";

function MathText({ children }: { children: string }) {
    const html = katex.renderToString(children, {
        displayMode: false,
        throwOnError: false,
    });

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default MathText;