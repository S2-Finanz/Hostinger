import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-display text-2xl font-bold text-white" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-xl font-semibold text-white" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-nebel" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-nebel" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-nebel" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a className="text-gold underline-offset-2 hover:underline" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-gold/50 pl-4 text-nebel italic"
      {...props}
    />
  ),
};
