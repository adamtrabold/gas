#!/usr/bin/env python3
"""Build the gas station project site from the repo.

    python3 site/build.py        -> site/dist/  (index.html, media/, walk/, .nojekyll)

Adapted from the synths-to-go site generator (site/design/concepts/herbarium/prototype/build.py there):
same approach, same viewer. It reads design/gas-station/ and git, renders every markdown record to HTML,
copies the stills as they are (they are already web-sized, lossless PNGs), copies the walkable prototype
with its three.js import path fixed, and writes one index.html with the data embedded as JSON and the
viewer (app.html) inline. Relative URLs only, so it works from a sub-path on GitHub Pages.

The one hand-kept input is site/now.md (where things stand, what is waiting on the owner).
Nothing under design/gas-station/inspo/ is ever copied: those images are other people's work.
Needs: Python 3, markdown, Pillow.
"""
import os, re, json, html, shutil, subprocess, fnmatch
from PIL import Image
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
GS_REL = "design/gas-station"
GS = os.path.join(ROOT, GS_REL)
DIST = os.path.join(HERE, "dist")
MEDIA = os.path.join(DIST, "media")

NAME = "gas station"
LINE = "the design work for Adam Trabold's portfolio site, a walkable ink-drawn gas station"

shutil.rmtree(DIST, ignore_errors=True)
for d in ("stills", "t", "vendor"):
    os.makedirs(os.path.join(MEDIA, d))

def G(*a): return os.path.join(GS, *a)
def rd(rel): return open(G(rel), encoding="utf-8").read()
def git(*a): return subprocess.run(["git", "-C", ROOT, *a], capture_output=True, text=True).stdout

# ------------------------------------------------------------------ stills (copies only; never inspo/)
STILLS_DIR = "concepts/stills"
stills = {}
for f in sorted(os.listdir(G(STILLS_DIR))):
    if not f.lower().endswith(".png"): continue
    stem = f[:-4]
    src = G(STILLS_DIR, f)
    shutil.copyfile(src, os.path.join(MEDIA, "stills", f))
    im = Image.open(src); W, H = im.size
    rgb = im.convert("RGB")
    if H > 2.2 * W: rgb = rgb.crop((0, 0, W, int(W * 2 / 3)))      # a tall sheet: its card shows the head of the sheet
    rgb.thumbnail((640, 640), Image.LANCZOS)
    rgb.save(os.path.join(MEDIA, "t", stem + ".jpg"), "JPEG", quality=74, optimize=True)
    stills[stem] = {"name": stem, "src": f"media/stills/{f}", "thumb": f"media/t/{stem}.jpg", "w": W, "h": H,
                    "tw": rgb.size[0], "th": rgb.size[1], "path": f"{GS_REL}/{STILLS_DIR}/{f}", "docs": []}

def named_stills(text):
    """stills a record names: by file name, by a range ("s2-fix-1 to s2-fix-4") or by a pattern ("s2j-*")"""
    found = [s for s in stills if re.search(r"(?<![\w-])" + re.escape(s) + r"(?![\w-])", text)]
    for m in re.finditer(r"([a-z0-9][a-z0-9-]*-)(\d)(?:\.png)?`?\s+to\s+`?\1(\d)", text):
        found += [f"{m.group(1)}{i}" for i in range(int(m.group(2)), int(m.group(3)) + 1) if f"{m.group(1)}{i}" in stills]
    for m in re.finditer(r"(?<![\w-])([a-z0-9][a-z0-9-]*\*)", text):
        found += fnmatch.filter(stills, m.group(1))
    return [s for s in stills if s in set(found)]

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
    if base.endswith(".png") and base[:-4] in stills and "inspo" not in p: return "#still-" + base[:-4]
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

# ------------------------------------------------------------------ the records
def slug(rel): return re.sub(r"[^a-z0-9]+", "-", rel[:-3].lower()).strip("-")
def classify(rel):
    """-> (section of the site, kind in plain words, fixed route or None)"""
    b = os.path.basename(rel)
    if rel == "owner.md": return "owner", "the owner's record", "#owner"
    if rel == "elements.md": return "elements", "the element list", "#elements"
    if rel == "jobs.md": return "jobs", "the jobs", "#jobs"
    if rel == "scores.md": return "scores", "scores", "#scores"
    if rel == "concepts/05-left-on.md": return "concept", "the concept", "#concept"
    if rel in ("concepts/00-shared.md", "concepts/coverage-05.md"): return "concept", "concept", None
    if re.match(r"sheet-\d+-judge\.md", b): return "scores", "director's check of a sheet", None
    if re.match(r"sheet-\d+\.md", b): return "sheets", "designer's notes on a sheet", None
    if re.match(r"score-\d+\.md", b): return "scores", "director's score", None
    if re.match(r"steer-\d+\.md", b): return "scores", "director's steer", None
    if b.endswith("-judge.md"): return "scores", "director's check", None
    if rel.startswith("notes/"): return "archive", "team notes", None
    if rel.startswith("concepts/0"): return "archive", "superseded concept", None
    if rel.startswith("inspo/"): return "archive", "reference notes (text only)", None
    return "archive", "record", None

docs, order = {}, []
for dp, dn, fs in os.walk(GS):
    dn[:] = sorted(d for d in dn if d not in ("sketches", "stills", "out"))
    for f in sorted(fs):
        if not f.endswith(".md") or f == "COPYRIGHT-NOTICE.md": continue
        rel = os.path.relpath(os.path.join(dp, f), GS)
        sec, kind, route = classify(rel)
        docs[slug(rel)] = {"slug": slug(rel), "rel": rel, "path": f"{GS_REL}/{rel}", "sec": sec, "kind": kind, "route": route or "#doc-" + slug(rel)}
        PATHMAP[os.path.normpath(rel)] = docs[slug(rel)]["route"]
        order.append(slug(rel))
for s in order:
    d = docs[s]; t = rd(d["rel"])
    d.update(title=plain(h1(t)) or d["rel"], lead=first_para(t), changed=changed(d["rel"]), html=md(t, src=d["rel"]),
             jump=[plain(h) for h, _ in sections(t) if h][:40], stills=named_stills(t), kb=round(len(t) / 1024))
    for st in d["stills"]: stills[st]["docs"].append(s)

# ------------------------------------------------------------------ the owner's record, newest first (words untouched)
ot = rd("owner.md")
osecs = sections(ot)
owner = {"path": docs["owner"]["path"], "changed": docs["owner"]["changed"],
         "intro": md("\n".join(l for l in (osecs[0][1] if osecs and osecs[0][0] is None else "").splitlines() if not l.startswith("# ")), src="owner.md"),
         "sections": [], "open": None}
for head, body in osecs:
    if head is None: continue
    m = re.match(r"(\d+)\.\s*(.*)", head)
    sec = {"n": m.group(1) if m else "", "title": plain(m.group(2) if m else head), "html": md(body, src="owner.md")}
    if not m and head.lower().startswith("still open"): owner["open"] = sec
    else: owner["sections"].append(sec)
owner["sections"].reverse()

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
# the three views the prototype offers by name (its own words for them, from the comment at the top of its source)
VIEWS = [("together", "Together", "The slab, the island, both pumps and the canopy, from the road. This is how the link opens."),
         ("slab", "The slab", "The slab, the island and both pumps in open sun."),
         ("pump", "The pump", "One pump, alone.")]
walk = {"path": f"{GS_REL}/{PROTO}/index.html", "changed": changed(PROTO + "/index.html"),
        "views": [{"hash": k, "title": t, "line": l} for k, t, l in VIEWS if re.search(rf"\b{k}:", page)]}

# ------------------------------------------------------------------ sheets (the current way concepts are shared)
SHEET_VIEWS = {1: ["pump"], 2: ["together", "pump", "slab"]}   # which walkable views match a sheet; others: the views its notes name
sheets = []
for s in order:
    m = re.fullmatch(r"concepts/sheet-(\d+)\.md", docs[s]["rel"])
    if not m: continue
    n = int(m.group(1)); t = rd(docs[s]["rel"])
    imgs = [k for k in stills if re.match(rf"sheet-{n}-", k)]
    js = slug(f"concepts/sheet-{n}-judge.md")
    jt = rd(docs[js]["rel"]) if js in docs else ""
    qmd, qfrom = "", ""
    for pat, lab in ((r"Final wording of the questions", "the director's final wording"), (r"What to ask him, in plain words", "the director's wording"), (r"Questions\s*$", "the designer's wording")):
        qmd = under(jt, pat) if lab != "the designer's wording" else under(t, pat)
        if qmd:   # the questions themselves: the numbered list only, not the director's notes to the team after it
            keep, seen = [], False
            for ln in qmd.splitlines():
                if re.match(r"\s*\d+[.)]\s", ln): seen = True
                elif seen and ln.strip() and not ln.startswith((" ", "\t")): break
                keep.append(ln)
            qmd = "\n".join(keep).strip() if seen else qmd
            qfrom = lab; break
    ans = next((x for x in owner["sections"] if re.search(rf"\bSheet {n}\b", x["title"])), None)
    views = SHEET_VIEWS.get(n) or [k for k, _, _ in VIEWS if re.search(rf"#{k}\b", t)]
    names = [x for x in dict.fromkeys(named_stills(t) + named_stills(jt)) if not re.match(r"(sheet-|pairs-)", x)]
    sheets.append({"n": n, "code": str(n), "title": re.sub(r"^Sheet \d+\s*[—–-]\s*", "", docs[s]["title"]), "images": imgs, "doc": s, "judge": js if js in docs else None,
                   "verdicts": [plain(x) for x in re.findall(r"^#{1,2} +((?:Verdict|After the fixes):?.*)$", jt, flags=re.M)],
                   "questions": md(qmd, src=docs[s]["rel"]) if qmd else "", "qfrom": qfrom, "answered": ans["n"] if ans else None,
                   "views": [v for v in views if any(w["hash"] == v for w in walk["views"])], "frames": names, "changed": docs[s]["changed"]})
sheets.sort(key=lambda x: -x["n"])
earlier = []
if "sheet-05-left-on" in stills:
    earlier.append({"code": "05", "title": "Left on, the concept sheet", "images": [k for k in ("sheet-05-left-on", "pairs-05") if k in stills],
                    "captions": {"sheet-05-left-on": "The concept sheet for Left on", "pairs-05": "Before and after pairs: the five fixes made before the link went out"},
                    "line": "The sheet and the before and after pairs shown with the concept when the director scored it 9. Sent back on the look; the sheets above came after.",
                    "doc": "concepts-05-left-on", "judge": None, "verdicts": [], "questions": "", "qfrom": "", "answered": "9" if any(x["n"] == "9" for x in owner["sections"]) else None,
                    "views": [], "frames": [], "changed": docs["concepts-05-left-on"]["changed"]})
SHEET_STEMS = {i for sh in sheets + earlier for i in sh["images"]}

# ------------------------------------------------------------------ now (hand-kept: site/now.md)
nt = open(os.path.join(HERE, "now.md"), encoding="utf-8").read()
nt = re.sub(r"<!--.*?-->", "", nt, flags=re.S)
now = {"path": "site/now.md", "blocks": [{"title": plain(h), "html": md(b)} for h, b in sections(nt) if h]}

# ------------------------------------------------------------------ history (git log)
history = []
for line in git("log", "--format=%h%x1f%ad%x1f%s", "--date=format:%Y-%m-%d|%d %b %Y|%H:%M").splitlines():
    hsh, ad, subj = line.split("\x1f", 2)
    iso, day, tm = ad.split("|")
    if not history or history[-1]["iso"] != iso: history.append({"iso": iso, "day": day.lstrip("0"), "events": []})
    history[-1]["events"].append({"t": tm, "s": subj, "h": hsh})
gl = git("log", "-1", "--format=%ad|%s", "--date=format:%d %b %H:%M").strip().split("|", 1)
updated = {"when": gl[0].lstrip("0"), "what": gl[1] if len(gl) > 1 else ""}

# ------------------------------------------------------------------ the viewer
VEND = os.path.join(HERE, "vendor", "lightbox")
shutil.copyfile(os.path.join(VEND, "lightbox.js"), os.path.join(MEDIA, "vendor", "lightbox.js"))
three_head = re.search(r"/\*\*.*?\*/", open(G("sketches/ink-is-shadow/vendor/three.module.min.js"), encoding="utf-8").read(400), flags=re.S)
licenses = [{"name": "Image viewer: Ramka (@ramka/react 0.0.2), React 18.3.1", "url": "https://ramka.dev",
             "text": open(os.path.join(VEND, "LICENSES.txt"), encoding="utf-8").read()},
            {"name": "The walkable prototype: three.js", "url": "https://github.com/mrdoob/three.js/blob/dev/LICENSE",
             "text": (three_head.group(0) if three_head else "three.js, MIT") + "\n\nThe full MIT licence text is at the address above."}]

data = {"project": {"name": NAME, "line": LINE}, "updated": updated, "now": now, "sheets": sheets, "earlier": earlier, "sheetStems": sorted(SHEET_STEMS),
        "walk": walk, "docs": docs, "order": order, "owner": owner, "stills": stills, "history": history, "licenses": licenses}
tpl = open(os.path.join(HERE, "app.html"), encoding="utf-8").read()
js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
open(os.path.join(DIST, "index.html"), "w", encoding="utf-8").write(tpl.replace("/*DATA*/", js))
open(os.path.join(DIST, ".nojekyll"), "w").close()

# safety: nothing from inspo/ may be in the output
bad = [os.path.join(dp, f) for dp, _, fs in os.walk(DIST) for f in fs if f.lower().endswith((".jpg", ".jpeg", ".webp", ".gif")) and os.path.join("media", "t") not in dp]
assert not bad, f"unexpected images in the output: {bad}"
tot = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(DIST) for f in fs)
print(f"sheets {len(sheets)} + {len(earlier)} earlier · records {len(docs)} · stills {len(stills)} · commits {sum(len(d['events']) for d in history)} · {tot/1048576:.1f} MiB -> {os.path.relpath(DIST, ROOT)}/")
