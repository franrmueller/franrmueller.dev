import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

/** Turn Contentlayer's `post.body.code` into a React component */
export function useMDXComponent(code: string) {
  return React.useMemo(() => getMDXComponent(code), [code]);
}
