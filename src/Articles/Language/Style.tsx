export default function Style() {
    return (
        <style>{`
            p, li {
                color: #c7e2d9;
                font-family: "Space Mono";
            }

            h1, h2 {
                color: #ffb1f4;
                font-family: "Cabin Sketch";
            }

            .underline {
                text-decoration: underline;
            }

            .example {
                color: #9161dd;
            }

            .emphasis {
                color: #ffcba0;
            }

            .ipa {
                color: #e7a5ff;
            }

            strong {
                color: #ffcba0;
            }

            em {
                color: #8062af;
            }
        `}</style>
    );
}