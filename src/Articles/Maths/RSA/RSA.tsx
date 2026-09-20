import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./RSA.md?raw"

function RSA() {
    //useMathJax()

    return (
        <>
            <ItemViewTemplate
                title=" A short conclusion of RSA public key cryptography"
                subtitle="Linear congruencies, Euler-Fermat Theorem, RSA public key cryptography"
                description={article}
            />
        </>
    );
}

export default RSA;