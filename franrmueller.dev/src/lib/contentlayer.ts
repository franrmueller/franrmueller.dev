// src/lib/contentlayer.ts
import {
  allNotes,
  allPosts,
  allMocs,         // 👈
  allReferences,
  type Note,
  type Post,
  type Moc,        // 👈
  type Reference,
} from "contentlayer/generated";

type Doc = Note | Post | Moc | Reference;

const isPublished = (d: Doc) =>
  (d as any).status ? (d as any).status === "published" : true;

export const notes = allNotes.filter(isPublished);
export const posts = allPosts.filter(isPublished).sort((a, b) => +new Date(b.date) - +new Date(a.date));
export const mocs = allMocs.filter(isPublished);          // 👈
export const references = allReferences.filter(isPublished);

// ---- Lookups ---------------------------------------------------------------
export function getNoteBySlug(slug: string) {
  return notes.find((n) => n.slug === slug);
}
export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
export function getMocBySlug(slug: string) {
  return mocs.find((m) => m.slug === slug);
}
export function getReferenceBySlug(slug: string) {
  return references.find((r) => r.slug === slug);
}

// ---- Tags ------------------------------------------------------------------
export function getAllTags() {
  const tags = new Set<string>();
  [notes, posts, mocs, references]
    .flat()
    .forEach((d) => (d.tags || []).forEach((t) => tags.add(t.toLowerCase())));
  return Array.from(tags).sort();
}

export function getByTag(tag: string) {
  const t = tag.toLowerCase();
  const has = (d: Doc) => (d as any).tagsLower?.includes(t);
  return {
    notes: notes.filter(has as any),
    posts: posts.filter(has as any),
    mocs: mocs.filter(has as any),
    references: references.filter(has as any),
  };
}

// ---- Backlinks (simple, body text search) ----------------------------------
export function getBacklinks(target: Doc) {
  const key = (target as any).slug;
  const title = (target as any).title;
  const haystack: Doc[] = [...notes, ...posts, ...mocs, ...references];