import { useEffect} from "react"
import type { ReactNode } from "react";
import Markdown from "react-markdown"
import cssUrl from "./ItemViewTemplate.css?url"

import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

interface ItemViewTemplateProps {
    title: string;
    subtitle: string;
    description: string;
    hasLink?: boolean;
    source?: string;
}

const ipaRegex = /\/([^\/\n]+)\//g;

function TextWithIPA({ children }: { children: ReactNode }) {
  const parts = String(children).split(ipaRegex);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="ipa">
        /{part}/
      </span>
    ) : (
      part
    )
  );
}

function ItemViewTemplate({
    title,
    subtitle,
    description,
    hasLink = false,
    source
}: ItemViewTemplateProps) {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet"
        link.href = cssUrl

        document.head.appendChild(link)

        return () => {
            console.log('unmount')
            link.remove();
        };
    }, []);

    return (
        <>
            <div id="toppanel">
                <h1 id="topheading">{title}</h1>
                <p id="subheading">{subtitle}</p>
            </div>

            <hr />

            <Markdown
                  components={{
                text: TextWithIPA,
            }}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[[rehypeKatex, { displayMode: true }]]}>
                {description}
            </Markdown>

            {hasLink && (
                <>
                    <h1 className="heading">Downloads</h1>

                    <hr />

                    <a href={source}>
                        <div className="downloadbtn">
                            Source
                        </div>
                    </a>
                </>
            )}
        </>
    );
}

export default ItemViewTemplate