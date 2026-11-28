#!/usr/bin/env python3
"""Build the gas station project site from the repo.

    python3 site/build.py        -> site/dist/  (index.html, try/, controls-test/, .nojekyll)

Adapted from the synths-to-go site generator: same approach, same look. The site is for the prototypes and for
how the place works (owner.md 37). It has three parts and nothing else:
  try           the hosted prototypes, under the short hand-kept note in site/now.md
  elements      elements.md, then lights.md
  how it works  concepts/05-left-on.md, concepts/controls.md, concepts/00-shared.md
It renders those markdown records to HTML, copies the prototypes with their three.js import path fixed
(behaviour untouched), and writes one index.html with the data embedded and the viewer (app.html) inline.
Relative URLs only, so it works from a sub-path on GitHub Pages. No images are published.
Needs: Python 3 and the markdown package.
"""
import os, re, json, html, shutil
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
GS = os.path.join(ROOT, "design/gas-station")
DIST = os.path.join(HERE, "dist")

# The words the site uses for its parts, in one place.
WORDS = {"try": "try", "elements": "elements", "how": "how it works"}
NAME = "gas station"
LINE = "the prototypes, and how the place works"

shutil.rmtree(DIST, ignore_errors=True)
os.makedirs(DIST)

def G(*a): return os.path.join(GS, *a)
def rd(rel): return open(G(rel), encoding="utf-8").read()

# ------------------------------------------------------------------ markdown -> HTML (as on the synths site)
PATHMAP = {}   # path relative to design/gas-station -> "#hash"
def resolve(ref, src):
    p = ref.split("#")[0].strip()
    if not p or p.startswith("http") or "inspo/" in p and not p.endswith(".md"): return None
    cands = [os.path.normpath(os.path.join(os.path.dirname(src or ""), p)), os.path.normpath(p),
             os.path.normpath(os.path.join("concepts", p)), os.path.normpath(re.sub(r"^(\.\./)+|^design/gas-station/", "", p))]
    for c in cands:
        if c in PATHMAP: return PATHMAP[c]
    base = os.path.basename(p)
    hits = [k for k in PATHMAP if os.path.basename(k) == base]
    if len(hits) == 1: return PATHMAP[hits[0]]
    return None

def label_cells(h):
    """data-label on each td from its table's header, so tables can stack on a phone"""
    def table(m):
        t = m.group(0)
        heads = [re.sub(r"<[^>]+>", "", x).strip() for x in re.findall(r"<th[^>]*>(.*?)</th>", t, flags=re.S)]
        def row(r):
            i = [0]
            def td(c):
                lab = heads[i[0]] if i[0] < len(heads) else ""; i[0] += 1
                return f'<td data-label="{html.escape(lab)}"' + c.group(1) + ">"
            return re.sub(r"<td([^>]*)>", td, r.group(0))
        return re.sub(r"<tr>.*?</tr>", row, t, flags=re.S)
    return re.sub(r"<table>.*?</table>", table, h, flags=re.S)

LIST_RE = re.compile(r"^\s*([-*+]|\d+[.)])\s")
def loosen_lists(text):
    """Python-Markdown needs a blank line before a list; GitHub doesn't. Add one so lists render as lists."""
    out, fence, prev = [], False, ""
    for line in text.splitlines():
        if line.lstrip().startswith("```"): fence = not fence
        if (not fence and LIST_RE.match(line) and prev.strip() and not LIST_RE.match(prev)
                and not prev.startswith(("|", "    ", "\t")) and not prev.lstrip().startswith(">")):
            out.append("")
        out.append(line); prev = line
    return "\n".join(out)

def md(text, src=None):
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    h = markdown.markdown(loosen_lists(text), extensions=["tables", "fenced_code", "sane_lists"])
    # no record embeds an image today; if one ever does, show its words only (inspiration images are never published)
    h = re.sub(r"<img [^>]*?alt=\"([^\"]*)\"[^>]*>", lambda m: f'<span class="ref">[image: {m.group(1)}]</span>', h)
    h = re.sub(r"<img [^>]*>", '<span class="ref">[image]</span>', h)
    def link(m):
        href, inner = m.group(1), m.group(2)
        if href.startswith("http"): return f'<a class="u" href="{href}" rel="noopener" target="_blank">{inner}</a>'
        r = resolve(href, src)
        return f'<a class="u" href="{r}">{inner}</a>' if r else f'<span class="ref">{inner}</span>'
    h = re.sub(r'<a href="([^"]*)">(.*?)</a>', link, h, flags=re.S)
    def code(m):
        r = resolve(html.unescape(m.group(1)), src)
        return f'<a href="{r}"><code>{m.group(1)}</code></a>' if r else m.group(0)
    h = re.sub(r"<code>([^<\s]*?\.(?:md|png))</code>", code, h)
    h = re.sub(r"(?<![\"'>=/\w])(https?://[^\s<)\"']+[^\s<)\"'.,;:])", r'<a class="u" href="\1" rel="noopener" target="_blank">\1</a>', h)
    h = label_cells(h)
    return h.replace("<table>", '<div class="tbl"><table>').replace("</table>", "</table></div>")

def sections(text):
    """split a doc into (heading, markdown) chunks at ## headings; preamble first"""
    parts, cur, head = [], [], None
    for line in text.splitlines():
        if line.startswith("## "):
            parts.append((head, "\n".join(cur))); cur, head = [], line[3:].strip()
        else: cur.append(line)
    parts.append((head, "\n".join(cur)))
    return [(h, b) for h, b in parts if (h or b.strip())]

def h1(t):
    m = re.search(r"^# (.+)$", t, flags=re.M); return m.group(1).strip() if m else ""
def plain(s): return re.sub(r"[*`_]", "", s)
# ------------------------------------------------------------------ the records the site shows (everything else stays in the repo)
PAGES = [("elements", "elements.md", "#elements", ""), ("lights", "lights.md", "#lights", ""),
         ("concept", "concepts/05-left-on.md", "#how", "the concept"),
         ("controls", "concepts/controls.md", "#how-controls", "moving and looking"),
         ("place", "concepts/00-shared.md", "#how-place", "the shared place")]
PAGES = [p for p in PAGES if os.path.isfile(G(p[1]))]
for key, rel, route, tab in PAGES: PATHMAP[os.path.normpath(rel)] = route
docs = {}
for key, rel, route, tab in PAGES:
    t = rd(rel)
    docs[key] = {"title": plain(h1(t)) or rel, "tab": tab, "route": route, "html": md(t, src=rel), "jump": [plain(h) for h, _ in sections(t) if h][:40]}

# ------------------------------------------------------------------ the prototypes (copied; import path fixed; behaviour untouched)
OLD_IMPORT = "'../ink-is-shadow/vendor/three.module.min.js'"
protos = []
PROTO = "sketches/place"
if os.path.isfile(G(PROTO, "index.html")):
    WALK = os.path.join(DIST, "try")
    os.makedirs(os.path.join(WALK, "vendor")); os.makedirs(os.path.join(WALK, "paper"))
    page = rd(PROTO + "/index.html")
    assert page.count(OLD_IMPORT) == 1, "the station prototype's three.js import has changed: fix OLD_IMPORT in site/build.py"
    open(os.path.join(WALK, "index.html"), "w", encoding="utf-8").write(page.replace(OLD_IMPORT, "'./vendor/three.module.min.js'"))
    shutil.copyfile(G(PROTO, "strokes.js"), os.path.join(WALK, "strokes.js"))
    shutil.copyfile(G("sketches/ink-is-shadow/vendor/three.module.min.js"), os.path.join(WALK, "vendor", "three.module.min.js"))
    for f in sorted(os.listdir(G(PROTO, "paper"))):
        if f.endswith(".png"): shutil.copyfile(G(PROTO, "paper", f), os.path.join(WALK, "paper", f))
    # the folder used to be walk/: old links still work, name after the # included
    os.makedirs(os.path.join(DIST, "walk"))
    open(os.path.join(DIST, "walk", "index.html"), "w", encoding="utf-8").write(
        '<!doctype html><meta charset="utf-8"><title>moved</title><script>location.replace("../try/" + location.hash)</script><a href="../try/">The prototype has moved here.</a>\n')
    # its views and hours, read from how the page itself routes its plain #names (so a new view shows up here by itself)
    m = re.search(r"VIEWS = \[([^\]]*)\]", page)
    names = re.findall(r"'([a-z]+)'", m.group(1)) if m else []
    m = re.search(r"HASH\.find\(h => \[([^\]]*)\]", page)
    hours = re.findall(r"'([a-z]+)'", m.group(1)) if m else []
    m = re.search(r"TEAM \? undefined : '([a-z]+)'", page)
    first = m.group(1) if m else None
    names.sort(key=lambda n: n != first)
    m = re.search(r"^// Views, by name after the #:(.*)$", page, flags=re.M)     # its own words for each view
    said = dict(re.findall(r"([a-z]+) \(([^)]*)\)", m.group(1))) if m else {}
    protos.append({"key": "station", "title": "The station", "href": "try/",
                   "line": "The place in 3D. It still has the old controls for now: drag to look, hold to walk.",
                   "views": [{"hash": n, "line": said.get(n, "")} for n in names], "hours": hours})
CT = "sketches/controls-test/index.html"
if os.path.isfile(G(CT)) and protos:
    cpage = rd(CT)
    assert cpage.count(OLD_IMPORT) == 1, "the controls test page's three.js import has changed: fix it in site/build.py"
    assert not re.search(r"""(?:src|href)=["'](?!#|https?:)|from\s+['"]\./|fetch\(""", cpage), "the controls test page now loads other files: copy them in site/build.py"
    os.makedirs(os.path.join(DIST, "controls-test"))
    open(os.path.join(DIST, "controls-test", "index.html"), "w", encoding="utf-8").write(cpage.replace(OLD_IMPORT, "'../try/vendor/three.module.min.js'"))
    protos.append({"key": "controls", "title": "The new controls (test page)", "href": "controls-test/",
                   "line": "A test of the new gestures on stand-in shapes, not the station. Best on a phone.", "views": [], "hours": []})

# ------------------------------------------------------------------ elements you can turn round (owner.md 38)
# The station prototype is getting a view of one element at a time, by plain hash (try/#view-pump). The hashes that
# exist are listed in concepts/look-notes.md; every "#view-name" written there is picked up. A view goes under the
# element whose heading has that name in it ("## 1. Pump (two of them)" for view-pump); for a name that doesn't
# match a heading, add it to ELEMENT_VIEWS. A hash the prototype itself doesn't mention is left out, so nothing
# is embedded before it works. No views, no notes file: the page is simply the list.
ELEMENT_VIEWS = {}   # "view-name": "words from the element's heading", only for names that don't match by themselves
NOTES = os.environ.get("GAS_LOOK_NOTES") or G("concepts/look-notes.md")   # the variable is for trying it before the notes exist
found = list(dict.fromkeys(re.findall(r"#(view-[a-z0-9-]+)", open(NOTES, encoding="utf-8").read()))) if os.path.isfile(NOTES) else []
proto_src = rd(PROTO + "/index.html") if protos else ""
embedded = []
if "elements" in docs:
    def place(m):
        title = re.sub(r"<[^>]+>", "", m.group(2)).lower()
        for v in found:
            name = v[len("view-"):]
            want = ELEMENT_VIEWS.get(v, name.replace("-", " ")).lower()
            known = re.search(r"\bview\b", proto_src) and (os.environ.get("GAS_LOOK_NOTES") or re.search(rf"['\"`#-]{re.escape(name)}\b", proto_src))
            if v not in embedded and known and re.search(rf"\b{re.escape(want)}", title):
                embedded.append(v)
                return (m.group(0) + f'<div class="embed" data-src="try/#{v}"><div class="frame"></div>'
                        f'<p class="embedbar"><button type="button">Tap to turn it and zoom</button><a class="u" href="try/#{v}">open full screen</a></p></div>')
        return m.group(0)
    docs["elements"]["html"] = re.sub(r"<h2>(\d+)\.\s*(.*?)</h2>", place, docs["elements"]["html"])

# ------------------------------------------------------------------ the note at the top of the first page (hand-kept: site/now.md), as it is
note = md(open(os.path.join(HERE, "now.md"), encoding="utf-8").read())

data = {"project": {"name": NAME, "line": LINE}, "words": WORDS, "note": note, "protos": protos, "docs": docs}
tpl = open(os.path.join(HERE, "app.html"), encoding="utf-8").read()
js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
open(os.path.join(DIST, "index.html"), "w", encoding="utf-8").write(tpl.replace("/*DATA*/", js))
open(os.path.join(DIST, ".nojekyll"), "w").close()

# safety: no picture from the records may be in the output (the prototype's own paper textures are the only images)
bad = [os.path.join(dp, f) for dp, _, fs in os.walk(DIST) for f in fs if f.lower().endswith((".jpg", ".jpeg", ".webp", ".gif", ".png")) and os.sep + os.path.join("try", "paper") not in dp]
assert not bad, f"unexpected images in the output: {bad}"
tot = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(DIST) for f in fs)
print(f"prototypes {len(protos)} · pages {len(docs)} · elements in 3D {len(embedded)} · {tot/1048576:.1f} MiB -> {os.path.relpath(DIST, ROOT)}/")
