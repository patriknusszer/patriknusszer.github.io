// useMathJax.ts
import { useEffect } from "react";
import es5url from "../js/es5/tex-svg.js?url";

interface MathJax {
  tex: {
    inlineMath: string[][];
  };
  svg: {
    fontCache: string;
  };
  typesetPromise?: () => Promise<void>;
}

declare global {
  interface Window {
    MathJax?: MathJax;
  }
}

export function useMathJax() {
  useEffect(() => {
    if (!window.MathJax) {
      window.MathJax = {
        tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
        svg: { fontCache: "global" },
      };
    }

    const SCRIPT_ID = "mathjax-script";
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = es5url;
      script.async = true;
      script.onload = () => window.MathJax?.typesetPromise?.();
      document.head.appendChild(script);
    } else {
      window.MathJax?.typesetPromise?.();
    }
  });
}