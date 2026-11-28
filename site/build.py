#!/usr/bin/env python3
"""Build the gas station project site from the repo.

    python3 site/build.py        -> site/dist/  (index.html, media/, walk/, .nojekyll)

Adapted from the synths-to-go site generator (site/design/concepts/herbarium/prototype/build.py there):
same approach, same viewer. It reads design/gas-station/ and git, renders every markdown record to HTML,
copies the stills as they are (they are already web-sized, lossless PNGs), copies the walkable prototype
with its three.js import path fixed, and writes one index.html with the data embedded as JSON and the
viewer (app.html) inline. Relative URLs only, so it works from a sub-path on GitHub Pages.

The site shows only: now (site/now.md, hand-kept), the sheets, the walkable prototype and controls test page,
and three records as pages (elements, lights, the concept). Media that no page shows is not copied.
Nothing under design/gas-station/inspo/ is ever copied: those images are other people's work.
Needs: Python 3, markdown, Pillow.
"""
import os, re, json, html, shutil, subprocess, argparse
from PIL import Image
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
GS_REL = "design/gas-station"
GS = os.path.join(ROOT, GS_REL)
# --fixture DIR: also read DIR as if it were design/gas-station/concepts/ (for trying a sheet without touching the records)
# --out DIR: write there and not to site/dist/
ap = argparse.ArgumentParser(); ap.add_argument("--fixture"); ap.add_argument("--out")
ARGS = ap.parse_args()
FIX = os.path.abspath(ARGS.fixture) if ARGS.fixture else None
DIST = os.path.abspath(ARGS.out) if ARGS.out else os.path.join(HERE, "dist")
assert not FIX or ARGS.out, "--fixture needs --out, so a trial sheet never lands in site/dist/"
MEDIA = os.path.join(DIST, "media")

# The words the site uses for its parts, in one place. The owner is still choosing the name for sheets (owner.md 36).
WORDS = {"sheets_nav": "drawings",   # the nav item and the list page
         "sheet": "Sheet",           # one of them, as in "Sheet 2"
         "try_nav": "try", "elements_nav": "elements"}
NAME = "gas station"
LINE = "the design work for Adam Trabold's portfolio site, a walkable ink-drawn gas station"

shutil.rmtree(DIST, ignore_errors=True)
for d in ("stills", "t", "vendor"):
    os.makedirs(os.path.join(MEDIA, d))

def G(*a):
    p = os.path.join(GS, *a)
    if FIX:   # a fixture file stands in for concepts/<same path>
        rel = os.path.relpath(p, os.path.join(GS, "concepts"))
        if not rel.startswith("..") and (os.path.isfile(os.path.join(FIX, rel)) or (os.path.isdir(os.path.join(FIX, rel)) and not os.path.exists(p))): return os.path.join(FIX, rel)
    return p
def rd(rel): return open(G(rel), encoding="utf-8").read()
def front(text):
    """a small front-matter block (--- / key: value lines / ---) at the top of a record -> ({key: value}, the rest)"""
    m = re.match(r"\A---\n(.*?)\n---\n", text, flags=re.S)
    if not m: return {}, text
    return {k.strip().lower(): v.strip() for k, v in (l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)}, text[m.end():]
def git(*a): return subprocess.run(["git", "-C", ROOT, *a], capture_output=True, text=True).stdout

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

SHEET_IMGS = {}
def sheet_image(href, src, card=False):
    """a drawing a sheet places: a PNG under concepts/stills/, copied as it is. None for anything else (never inspo/).
    card=True also makes the small picture for the sheet's card."""
    if not href or href.startswith("http") or not src: return None
    rel = os.path.normpath(os.path.join(os.path.dirname(src), html.unescape(href)))
    if not rel.startswith("concepts/stills/") or not rel.lower().endswith(".png") or not os.path.isfile(G(rel)): return None
    sub = rel[len("concepts/stills/"):]
    if rel not in SHEET_IMGS:
        out = os.path.join(MEDIA, "stills", sub); os.makedirs(os.path.dirname(out), exist_ok=True)
        shutil.copyfile(G(rel), out)
        W, H = Image.open(G(rel)).size
        SHEET_IMGS[rel] = {"src": "media/stills/" + sub, "w": W, "h": H}
    f = SHEET_IMGS[rel]
    if card and "thumb" not in f:
        tn = re.sub(r"[^A-Za-z0-9]+", "-", sub[:-4]) + ".jpg"
        rgb = Image.open(G(rel)).convert("RGB")
        if f["h"] > 2.2 * f["w"]: rgb = rgb.crop((0, 0, f["w"], int(f["w"] * 2 / 3)))      # a tall sheet: its card shows the head of the sheet
        rgb.thumbnail((640, 640), Image.LANCZOS); rgb.save(os.path.join(MEDIA, "t", tn), "JPEG", quality=74, optimize=True)
        f.update(thumb="media/t/" + tn, tw=rgb.size[0], th=rgb.size[1])
    return f

def figures(h, src):
    """a paragraph that is only images becomes figures: one image alone, or several side by side (they stack on a phone).
    The caption is the image's alt text; its optional title ("Route 66, PROPOSED") becomes tags."""
    def para(m):
        figs = []
        for tag in re.findall(r"<img [^>]*>", m.group(0)):
            a = dict(re.findall(r'(\w+)="([^"]*)"', tag))
            f = sheet_image(a.get("src", ""), src)
            if not f: return m.group(0)
            tags = " ".join(f'<span class="cst">{t.strip()}</span>' for t in a.get("title", "").split(",") if t.strip())
            cap = a.get("alt", "")
            figs.append(f'<figure style="max-width:{round(f["w"] / 2)}px"><img data-done src="{f["src"]}" width="{f["w"]}" height="{f["h"]}" alt="{cap}" loading="lazy">'
                        + (f'<figcaption>{cap}{" " if cap and tags else ""}{tags}</figcaption>' if cap or tags else "") + "</figure>")
        return figs[0] if len(figs) == 1 else f'<div class="pair" style="--n:{len(figs)}">{"".join(figs)}</div>'
    return re.sub(r"<p>(?:\s*<img [^>]*>\s*(?:<br\s*/?>)?\s*)+</p>", para, h)

def md(text, src=None):
    text = re.sub(r"<!--.*?-->", "", front(text)[1], flags=re.S)
    h = markdown.markdown(loosen_lists(text), extensions=["tables", "fenced_code", "sane_lists"])
    h = figures(h, src)
    # no record embeds an image today; if one ever does, show its words only (inspiration images are never published)
    h = re.sub(r"<img (?![^>]*data-done)[^>]*?alt=\"([^\"]*)\"[^>]*>", lambda m: f'<span class="ref">[image: {m.group(1)}]</span>', h)
    h = re.sub(r"<img (?![^>]*data-done)[^>]*>", '<span class="ref">[image]</span>', h).replace(" data-done", "")
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

def under(text, heading_re):
    """the markdown under the first heading that matches, up to the next # or ## heading or a rule"""
    out, on = [], False
    for line in text.splitlines():
        if on and (re.match(r"^#{1,2} ", line) or line.strip() == "---"): break
        if on: out.append(line)
        elif re.match(r"^#{1,3} +" + heading_re, line): on = True
    return "\n".join(out).strip()

def h1(t):
    m = re.search(r"^# (.+)$", t, flags=re.M); return m.group(1).strip() if m else ""
def plain(s): return re.sub(r"[*`_]", "", s)
def first_para(text):
    for blk in re.sub(r"<!--.*?-->", "", text, flags=re.S).split("\n\n"):
        b = blk.strip()
        if b and not b.startswith(("#", "|", "---", ">")):
            t = plain(b.replace("\n", " "))
            return t if len(t) <= 220 else t[:220].rsplit(" ", 1)[0].rstrip(",;:(") + "…"
    return ""
def changed(rel):
    return git("log", "-1", "--format=%ad", "--date=format:%d %b %H:%M", "--", f"{GS_REL}/{rel}").strip().lstrip("0")

# ------------------------------------------------------------------ the records the site shows (everything else stays in the repo)
# The site is for three things: the latest sheet, walking the place, and the short lists the owner is asked to approve.
PAGES = [("elements", "elements.md", "#elements"), ("lights", "lights.md", "#lights"), ("concept", "concepts/05-left-on.md", "#concept")]
docs = {}
for key, rel, route in PAGES:
    if os.path.isfile(G(rel)): PATHMAP[os.path.normpath(rel)] = route
for key, rel, route in PAGES:
    if not os.path.isfile(G(rel)): continue
    t = front(rd(rel))[1]
    docs[key] = {"title": plain(h1(t)) or rel, "html": md(t, src=rel), "jump": [plain(h) for h, _ in sections(t) if h][:40]}

# ------------------------------------------------------------------ the walkable prototype (copied; import path fixed; behaviour untouched)
PROTO = "sketches/place"
WALK = os.path.join(DIST, "walk")
os.makedirs(os.path.join(WALK, "vendor")); os.makedirs(os.path.join(WALK, "paper"))
page = rd(PROTO + "/index.html")
OLD_IMPORT = "'../ink-is-shadow/vendor/three.module.min.js'"
assert page.count(OLD_IMPORT) == 1, "the prototype's three.js import has changed: fix OLD_IMPORT in site/build.py"
open(os.path.join(WALK, "index.html"), "w", encoding="utf-8").write(page.replace(OLD_IMPORT, "'./vendor/three.module.min.js'"))
shutil.copyfile(G(PROTO, "strokes.js"), os.path.join(WALK, "strokes.js"))
shutil.copyfile(G("sketches/ink-is-shadow/vendor/three.module.min.js"), os.path.join(WALK, "vendor", "three.module.min.js"))
for f in sorted(os.listdir(G(PROTO, "paper"))):
    if f.endswith(".png"): shutil.copyfile(G(PROTO, "paper", f), os.path.join(WALK, "paper", f))
# the controls test page (a throwaway for feeling the gestures): copied the same way, sharing the prototype's three.js
CT = "sketches/controls-test/index.html"
controls_test = None
if os.path.isfile(G(CT)):
    cpage = rd(CT)
    assert cpage.count(OLD_IMPORT) == 1, "the controls test page's three.js import has changed: fix it in site/build.py"
    assert not re.search(r"""(?:src|href)=["'](?!#|https?:)|from\s+['"]\./|fetch\(""", cpage), "the controls test page now loads other files: copy them in site/build.py"
    os.makedirs(os.path.join(DIST, "controls-test"))
    open(os.path.join(DIST, "controls-test", "index.html"), "w", encoding="utf-8").write(cpage.replace(OLD_IMPORT, "'../walk/vendor/three.module.min.js'"))
    controls_test = True
# the three views the prototype offers by name (its own words for them, from the comment at the top of its source)
VIEWS = [("together", "Together", "The slab, the island, both pumps and the canopy, from the road. This is how the link opens."),
         ("slab", "The slab", "The slab, the island and both pumps in open sun."),
         ("pump", "The pump", "One pump, alone.")]
walk = {"views": [{"hash": k, "title": t, "line": l} for k, t, l in VIEWS if re.search(rf"\b{k}:", page)]}

# ------------------------------------------------------------------ sheets
SHEET_VIEWS = {1: ["pump"], 2: ["together", "pump", "slab"]}   # which walkable views match a tall-image sheet; page sheets say it themselves (walk:)
CON = G("concepts")
names = sorted(set(os.listdir(CON)) | (set(os.listdir(FIX)) if FIX else set()))
owner_heads = re.findall(r"^## +(.*)$", rd("owner.md"), flags=re.M)
sheets = []
for f in names:
    m = re.fullmatch(r"sheet-(\d+)\.md", f)
    if not m: continue
    n = int(m.group(1)); rel = f"concepts/{f}"; meta, t = front(rd(rel))
    # the page format (owner.md 20): the sheet is this file, with its drawings as separate PNGs in stills/sheet-N/.
    # It wins over a tall stills/sheet-N-*.png if both exist.
    page = os.path.isdir(G(f"concepts/stills/sheet-{n}")) and bool(re.search(rf"!\[[^\]]*\]\(\s*stills/sheet-{n}/", t))
    tall = None if page else next((x for x in sorted(os.listdir(G("concepts/stills"))) if re.fullmatch(rf"sheet-{n}-.*\.png", x)), None)
    if not page and not tall: continue
    jt = rd(f"concepts/sheet-{n}-judge.md") if os.path.isfile(G(f"concepts/sheet-{n}-judge.md")) else ""
    # what it asks him: a page sheet's own "## Questions"; for a tall-image sheet, the wording the director cleared. The numbered list only.
    qmd = ""
    for src_t, pat in ((t, r"Questions\s*$"),) if page else ((jt, r"Final wording of the questions"), (jt, r"What to ask him, in plain words"), (t, r"Questions\s*$")):
        qmd = under(src_t, pat)
        if qmd:
            keep, seen = [], False
            for ln in qmd.splitlines():
                if re.match(r"\s*\d+[.)]\s", ln): seen = True
                elif seen and ln.strip() and not ln.startswith((" ", "\t")): break
                if seen: keep.append(ln)
            qmd = "\n".join(keep).strip()
            if qmd: break
    views = [v.strip().lstrip("#") for v in meta["walk"].split(",")] if "walk" in meta else ([] if page else SHEET_VIEWS.get(n, []))
    body, img = "", None
    if page:
        parts = [(h, b) for h, b in sections(t) if not (h and re.fullmatch(r"Questions", h.strip(), flags=re.I))]
        body = md("\n\n".join((f"## {h}\n" if h else "") + (b if h else re.sub(r"^# .*$", "", b, count=1, flags=re.M)) for h, b in parts), src=rel)
        card = sheet_image(re.search(rf"!\[[^\]]*\]\(\s*(stills/sheet-{n}/[^)\s]+)", t).group(1), rel, card=True)
        PATHMAP[os.path.normpath(rel)] = f"#sheet-{n}"
    else:
        card = img = sheet_image(f"stills/{tall}", rel, card=True)
    sheets.append({"n": n, "code": str(n), "title": re.sub(r"^Sheet \d+\s*[—–-]\s*", "", plain(h1(t))), "img": img, "page": body, "card": card,
                   "questions": md(qmd, src=rel) if qmd else "", "answered": any(re.search(rf"\bSheet {n}\b", x) for x in owner_heads),
                   "views": [v for v in views if any(w["hash"] == v for w in walk["views"])], "changed": changed(rel)})
sheets.sort(key=lambda x: -x["n"])

# ------------------------------------------------------------------ now (hand-kept: site/now.md)
nt = re.sub(r"<!--.*?-->", "", open(os.path.join(HERE, "now.md"), encoding="utf-8").read(), flags=re.S)
now = {"blocks": [{"title": plain(h), "html": md(b)} for h, b in sections(nt) if h]}

# ------------------------------------------------------------------ the viewer
VEND = os.path.join(HERE, "vendor", "lightbox")
shutil.copyfile(os.path.join(VEND, "lightbox.js"), os.path.join(MEDIA, "vendor", "lightbox.js"))
shutil.copyfile(os.path.join(VEND, "LICENSES.txt"), os.path.join(MEDIA, "vendor", "LICENSES.txt"))   # MIT: the notice travels with the bundle

data = {"project": {"name": NAME, "line": LINE}, "words": WORDS, "now": now, "sheets": sheets, "walk": walk, "controlsTest": controls_test, "docs": docs}
tpl = open(os.path.join(HERE, "app.html"), encoding="utf-8").read()
js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
open(os.path.join(DIST, "index.html"), "w", encoding="utf-8").write(tpl.replace("/*DATA*/", js))
open(os.path.join(DIST, ".nojekyll"), "w").close()

# safety: nothing from inspo/ may be in the output
bad = [os.path.join(dp, f) for dp, _, fs in os.walk(DIST) for f in fs if f.lower().endswith((".jpg", ".jpeg", ".webp", ".gif")) and os.path.join("media", "t") not in dp]
assert not bad, f"unexpected images in the output: {bad}"
tot = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(DIST) for f in fs)
print(f"sheets {len(sheets)} · pages {len(docs)} · {tot/1048576:.1f} MiB -> {os.path.relpath(DIST, ROOT)}/")
