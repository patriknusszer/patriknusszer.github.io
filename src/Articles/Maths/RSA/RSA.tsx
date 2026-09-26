import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./RSA.md?raw"
import { preprocessMarkdown } from "../Utils.ts";

function RSA() {
    //useMathJax()

    return (
        <>
        <style>{`.emphasis { color: #9161dd;}`}</style>
            <ItemViewTemplate
                title=" A short conclusion of RSA public key cryptography"
                subtitle="Linear congruencies, Euler-Fermat Theorem, RSA public key cryptography"
                description={preprocessMarkdown(article)}
            />
        </>
    );
}

export default RSA;