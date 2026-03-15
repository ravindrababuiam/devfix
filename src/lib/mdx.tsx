import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
import { CopyButton } from "@/components/ui/CopyButton";
import { toString } from "hast-util-to-string";

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: true,
};

/**
 * Rehype plugin that extracts raw text from code blocks processed by
 * rehype-pretty-code and stores it as a data-raw attribute on the <pre>.
 */
function rehypeExtractCodeRaw() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "figure" && node.properties?.["dataRehypePrettyCodeFigure"] !== undefined) {
        const pre = node.children.find(
          (child): child is Element => child.type === "element" && child.tagName === "pre"
        );
        if (pre) {
          const raw = toString(pre);
          pre.properties = pre.properties || {};
          pre.properties["data-raw"] = raw;
        }
      }
    });
  };
}

function Pre(props: React.ComponentPropsWithoutRef<"pre"> & { "data-raw"?: string }) {
  const { children, "data-raw": raw, ...rest } = props;

  return (
    <div className="group relative">
      {raw && (
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton text={raw} />
        </div>
      )}
      <pre {...rest}>{children}</pre>
    </div>
  );
}

const mdxComponents = {
  pre: Pre,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions] as never,
          rehypeExtractCodeRaw as never,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-link"],
              },
            },
          ] as never,
        ],
      },
    },
    components: mdxComponents,
  });

  return content;
}
