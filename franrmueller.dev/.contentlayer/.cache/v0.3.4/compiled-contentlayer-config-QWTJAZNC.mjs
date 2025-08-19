// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
function remarkWikilink() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const value = node.value;
      const re = /\[\[([^\]]+)\]\]/g;
      let m;
      let last = 0;
      const out = [];
      while (m = re.exec(value)) {
        const before = value.slice(last, m.index);
        if (before)
          out.push({ type: "text", value: before });
        const target = m[1].trim();
        const slug = target.toLowerCase().replace(/[^a-z0-9-\s/]/g, "").replace(/\s+/g, "-");
        out.push({ type: "link", url: `/notes/${slug}`, children: [{ type: "text", value: target }] });
        last = re.lastIndex;
      }
      const after = value.slice(last);
      if (out.length) {
        if (after)
          out.push({ type: "text", value: after });
        parent.children.splice(index, 1, ...out);
      }
    });
  };
}
function stripPrefix(p) {
  return p.replace(/^(notes|writing|moc|reading)\//, "");
}
var Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    status: { type: "enum", options: ["draft", "published"], default: "draft" },
    updated: { type: "date" },
    aliases: { type: "list", of: { type: "string" } },
    stage: { type: "enum", options: ["seed", "budding", "evergreen"], default: "seed" },
    cover: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => stripPrefix(doc._raw.flattenedPath)
    },
    url: {
      type: "string",
      resolve: (doc) => `/notes/${stripPrefix(doc._raw.flattenedPath)}`
    },
    tagsLower: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => (doc.tags || []).map((t) => t.toLowerCase())
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `writing/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string" },
    date: { type: "date", required: true },
    readingTime: { type: "number" },
    tags: { type: "list", of: { type: "string" } },
    status: { type: "enum", options: ["draft", "published"], default: "published" },
    cover: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => stripPrefix(doc._raw.flattenedPath)
    },
    url: {
      type: "string",
      resolve: (doc) => `/writing/${stripPrefix(doc._raw.flattenedPath)}`
    },
    tagsLower: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => (doc.tags || []).map((t) => t.toLowerCase())
    }
  }
}));
var Moc = defineDocumentType(() => ({
  name: "Moc",
  filePathPattern: `moc/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string" },
    mocOf: { type: "list", of: { type: "string" } },
    tags: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => stripPrefix(doc._raw.flattenedPath)
    },
    url: {
      type: "string",
      resolve: (doc) => `/moc/${stripPrefix(doc._raw.flattenedPath)}`
    },
    tagsLower: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => (doc.tags || []).map((t) => t.toLowerCase())
    }
  }
}));
var Reference = defineDocumentType(() => ({
  name: "Reference",
  filePathPattern: `reading/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    author: { type: "string" },
    year: { type: "number" },
    sourceUrl: { type: "string" },
    summary: { type: "string" },
    tags: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => stripPrefix(doc._raw.flattenedPath)
    },
    url: {
      type: "string",
      resolve: (doc) => `/reading/${stripPrefix(doc._raw.flattenedPath)}`
    },
    tagsLower: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => (doc.tags || []).map((t) => t.toLowerCase())
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Note, Post, Moc, Reference],
  mdx: {
    remarkPlugins: [remarkWikilink, remarkGfm, remarkSmartypants],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
  }
});
export {
  Moc,
  Note,
  Post,
  Reference,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-QWTJAZNC.mjs.map
