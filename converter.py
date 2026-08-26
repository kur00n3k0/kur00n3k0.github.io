#!/usr/bin/env python3
"""
converter.py - Markdown -> TypeScript Article[] converter

Usage:
    python converter.py if=article.md of=article.ts

Markdown input format
----------------------
One or more articles per file. Each article is a YAML-ish frontmatter
block delimited by '---' followed by the article body:

    ---
    id: 0x01
    slug: hacker-manifesto
    tag: culture
    date: 1986.01.08
    mins: 3
    pinned: true
    title: The Conscience of a Hacker
    dek: The Mentor's 1986 manifesto, written the night of his arrest.
    toc:
      - the manifesto
    ---
    # the manifesto

    Plain text becomes a paragraph ('p') block.

    > This becomes a note ('note') block.

    - item one
    - item two
    (consecutive '- ' lines become a 'list' block)

    ```ascii
    +++The Mentor+++
    January 8, 1986
    ```
    (fenced block tagged 'ascii' becomes an 'ascii' block, newlines kept)

    ```code
    label: optional label text
    $ nmap -sV target
    # scanning...
    + 22/tcp open ssh
    > root@host:~$
    ```
    (fenced block tagged 'code', or untagged, becomes a 'code' block.
     Line prefixes decide the CodeLine type:
       "$ "  -> cmd
       "# "  -> out
       "+ "  -> ok
       "> "  -> prompt
       none  -> out (whole line kept)
     An optional first line "label: ..." sets the block's label.)

Add another article by starting a new '---' frontmatter block right
after the previous article's body.

Notes
-----
- All strings are emitted as double-quoted, JSON-escaped literals.
  This is valid TypeScript/JavaScript and keeps escaping consistent
  with special characters like apostrophes and quotes.
- 'pinned' and 'mins' are only emitted as real types (bool/number)
  when they parse cleanly; otherwise they're skipped or kept as text.
"""

import sys
import re
import json


CODE_PREFIXES = [
    ("$ ", "cmd"),
    ("# ", "out"),
    ("+ ", "ok"),
    ("> ", "prompt"),
]


def parse_args(argv):
    args = {}
    for raw in argv[1:]:
        if "=" not in raw:
            continue
        key, _, val = raw.partition("=")
        args[key.strip()] = val.strip()
    if "if" not in args or "of" not in args:
        sys.exit(
            "Usage: python converter.py if=article.md of=article.ts"
        )
    return args["if"], args["of"]


def split_articles(text):
    """Split a markdown file into (frontmatter, body) pairs."""
    pattern = re.compile(
        r"^---\s*\n(.*?)\n---\s*\n(.*?)(?=^---\s*\n|\Z)",
        re.DOTALL | re.MULTILINE,
    )
    chunks = list(pattern.finditer(text))
    if not chunks:
        sys.exit("No '--- frontmatter ---' article block found in input.")
    return [(m.group(1), m.group(2)) for m in chunks]


def parse_frontmatter(raw):
    meta = {}
    lines = raw.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        m = re.match(r"^(\w+):\s*(.*)$", line)
        if not m:
            i += 1
            continue
        key, val = m.group(1), m.group(2).strip()
        if key == "toc" or val == "":
            items = []
            j = i + 1
            while j < len(lines) and re.match(r"^\s*-\s+", lines[j]):
                items.append(re.sub(r"^\s*-\s+", "", lines[j]).strip())
                j += 1
            if items:
                meta[key] = items
                i = j
                continue
        meta[key] = val
        i += 1
    return meta


def parse_code_line(line):
    for prefix, t in CODE_PREFIXES:
        if line.startswith(prefix):
            return {"t": t, "x": line[len(prefix):]}
    return {"t": "out", "x": line}


def parse_body(body):
    lines = body.splitlines()
    blocks = []
    i = 0
    para_buf = []

    def flush_para():
        if para_buf:
            blocks.append({"t": "p", "x": " ".join(para_buf).strip()})
            para_buf.clear()

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush_para()
            i += 1
            continue

        # Fenced code / ascii block
        fence = re.match(r"^```(\w*)", stripped)
        if fence:
            flush_para()
            kind = fence.group(1) or "code"
            i += 1
            content_lines = []
            while i < len(lines) and lines[i].strip() != "```":
                content_lines.append(lines[i])
                i += 1
            i += 1  # skip closing ```

            if kind == "ascii":
                blocks.append({"t": "ascii", "x": "\n".join(content_lines)})
            else:
                label = None
                if content_lines and content_lines[0].startswith("label:"):
                    label = content_lines[0].split(":", 1)[1].strip()
                    content_lines = content_lines[1:]
                code_lines = [parse_code_line(cl) for cl in content_lines if cl.strip() != ""]
                block = {"t": "code", "lines": code_lines}
                if label:
                    block["label"] = label
                blocks.append(block)
            continue

        # Heading
        heading = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if heading:
            flush_para()
            blocks.append({"t": "h", "x": heading.group(2).strip()})
            i += 1
            continue

        # Blockquote / note
        if stripped.startswith(">"):
            flush_para()
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                quote_lines.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            blocks.append({"t": "note", "x": " ".join(quote_lines).strip()})
            continue

        # List
        if re.match(r"^[-*]\s+", stripped):
            flush_para()
            items = []
            while i < len(lines) and re.match(r"^[-*]\s+", lines[i].strip()):
                items.append(re.sub(r"^[-*]\s+", "", lines[i].strip()))
                i += 1
            blocks.append({"t": "list", "x": items})
            continue

        # Plain paragraph text
        para_buf.append(stripped)
        i += 1

    flush_para()
    return blocks


def ts_str(s):
    return json.dumps(s, ensure_ascii=False)


def ts_value(key, val):
    if key == "pinned":
        low = str(val).strip().lower()
        if low in ("true", "false"):
            return low
        return ts_str(val)
    if key == "mins":
        try:
            return str(int(val))
        except ValueError:
            return ts_str(val)
    if isinstance(val, list):
        items = ",\n".join(f"      {ts_str(v)}" for v in val)
        return "[\n" + items + "\n    ]"
    return ts_str(val)


def render_block(block, indent="      "):
    parts = [f'{indent}t: {ts_str(block["t"])}']
    if "label" in block:
        parts.append(f'{indent}label: {ts_str(block["label"])}')
    if "x" in block:
        x = block["x"]
        if isinstance(x, list):
            items = ",\n".join(f"{indent}  {ts_str(v)}" for v in x)
            parts.append(f"{indent}x: [\n{items}\n{indent}]")
        else:
            parts.append(f'{indent}x: {ts_str(x)}')
    if "lines" in block:
        line_entries = []
        for cl in block["lines"]:
            entry = f'{{ t: {ts_str(cl["t"])}, x: {ts_str(cl["x"])}'
            if "p" in cl:
                entry += f', p: {ts_str(cl["p"])}'
            entry += " }"
            line_entries.append(f"{indent}  {entry}")
        lines_str = ",\n".join(line_entries)
        parts.append(f"{indent}lines: [\n{lines_str}\n{indent}]")
    body = ",\n".join(parts)
    return f"    {{\n{body},\n    }}"


ORDERED_META_KEYS = [
    "id", "slug", "tag", "date", "mins", "pinned", "title", "dek", "toc",
]


def render_article(meta, blocks):
    lines = ["  {"]
    for key in ORDERED_META_KEYS:
        if key not in meta:
            continue
        lines.append(f"    {key}: {ts_value(key, meta[key])},")
    body_str = ",\n".join(render_block(b) for b in blocks)
    lines.append("    body: [\n" + body_str + "\n    ],")
    lines.append("  },")
    return "\n".join(lines)


TS_HEADER = """export interface CodeLine {
  t: 'cmd' | 'out' | 'ok' | 'prompt'
  x: string
  p?: string
}

export interface ArticleBlock {
  t: 'h' | 'p' | 'code' | 'ascii' | 'note' | 'list'
  x?: string | string[]
  label?: string
  lines?: CodeLine[]
}

export interface Article {
  id: string
  slug: string
  tag: string
  date: string
  mins: number
  pinned?: boolean
  title: string
  dek: string
  toc: string[]
  body: ArticleBlock[]
}

export const ARTICLES: Article[] = [
"""

TS_FOOTER = """]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
"""


def convert(md_text):
    articles_src = split_articles(md_text)
    article_strs = []
    for frontmatter_raw, body_raw in articles_src:
        meta = parse_frontmatter(frontmatter_raw)
        blocks = parse_body(body_raw)
        article_strs.append(render_article(meta, blocks))
    return TS_HEADER + "\n".join(article_strs) + "\n" + TS_FOOTER


def main():
    in_path, out_path = parse_args(sys.argv)
    with open(in_path, "r", encoding="utf-8") as f:
        md_text = f.read()
    ts_text = convert(md_text)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ts_text)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
