export default function Style() {
    return (
        <style>{`
@font-face {
    font-family: "Iosevka Web";
    font-weight: 400;
    font-style: normal;
    src: url("https://iosevka-webfonts.github.io/iosevka/woff2/iosevka-regular.woff2")
         format("woff2");
}
@font-face {
  font-family: "Iosevka Aile";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://cdn.jsdelivr.net/fontsource/fonts/iosevka-aile@latest/latin-400-normal.woff2")
       format("woff2");
}
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
                font-family: "Iosevka Aile" !important;
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