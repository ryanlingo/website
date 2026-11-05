#!/usr/bin/env python3
"""Import one of Ryan Lingo's Medium posts into content/blog as a Markdown page.

Medium blocks direct page downloads, so the script reads the post from the author's
RSS feed, which only holds the 10 most recent posts. It converts the HTML to Markdown,
downloads the images into content/blog/images, and drops the 99P Labs subscribe
paragraph and Medium's "originally published" footer.

Usage:
  python3 scripts/import-medium.py URL --description "One sentence." --tags intelligence/ai
  python3 scripts/import-medium.py --list
"""

import argparse
import datetime
import email.utils
import html
import os
import re
import sys
import urllib.request
from html.parser import HTMLParser

FEED = "https://medium.com/feed/@ryanlingo"
UA = {"User-Agent": "Mozilla/5.0"}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "content", "blog")


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read()


def feed_items():
    xml = fetch(FEED).decode("utf-8")
    for item in re.findall(r"<item>(.*?)</item>", xml, re.S):
        get = lambda tag: re.search(rf"<{tag}>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</{tag}>", item, re.S)
        yield {
            "title": html.unescape(get("title").group(1)),
            "link": get("link").group(1).split("?")[0],
            "date": email.utils.parsedate_to_datetime(get("pubDate").group(1)).date(),
            "body": get("content:encoded").group(1),
        }


def slugify(text):
    text = text.replace("’", "").replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


class ToMarkdown(HTMLParser):
    """Converts the small set of tags Medium's feed uses into Markdown blocks."""

    def __init__(self, slug):
        super().__init__(convert_charrefs=True)
        self.slug = slug
        self.blocks = []  # finished Markdown blocks
        self.buf = ""  # text of the block being built
        self.lists = []  # stack of "ul" or "ol" with item counters
        self.href = None
        self.images = []  # (url, local file name)
        self.in_pre = False
        self.quote = False

    def flush(self, prefix=""):
        text = self.buf.strip()
        if text:
            self.blocks.append(prefix + text)
        self.buf = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("p", "h1", "h2", "h3", "h4"):
            self.flush()
        elif tag in ("strong", "b"):
            self.buf += "**"
        elif tag in ("em", "i"):
            self.buf += "*"
        elif tag == "a":
            self.href = a.get("href")
            self.buf += "["
        elif tag == "code" and not self.in_pre:
            self.buf += "`"
        elif tag == "pre":
            self.flush()
            self.in_pre = True
        elif tag == "blockquote":
            self.flush()
            self.quote = True
        elif tag in ("ul", "ol"):
            self.flush()
            self.lists.append([tag, 0])
        elif tag == "li":
            self.flush()
            kind = self.lists[-1] if self.lists else ["ul", 0]
            kind[1] += 1
            self.buf = "  " * (len(self.lists) - 1) + (f"{kind[1]}. " if kind[0] == "ol" else "- ")
        elif tag == "img":
            src = a.get("src", "")
            if "/_/stat" in src or not src:
                return  # Medium's tracking pixel
            ext = os.path.splitext(src.split("?")[0])[1] or ".png"
            name = f"{self.slug}-{len(self.images) + 1}{ext}"
            self.images.append((src, name))
            self.flush()
            self.blocks.append(f"![TODO: describe this image]({'images/' + name})")
        elif tag == "br":
            self.buf += "\n"
        elif tag == "figcaption":
            self.flush()

    def handle_endtag(self, tag):
        if tag == "p":
            self.flush("> " if self.quote else "")
        elif tag in ("h1", "h2", "h3"):
            self.flush("## ")
        elif tag == "h4":
            self.flush("### ")
        elif tag in ("strong", "b"):
            self.buf += "**"
        elif tag in ("em", "i"):
            self.buf += "*"
        elif tag == "a":
            self.buf += f"]({self.href})"
            self.href = None
        elif tag == "code" and not self.in_pre:
            self.buf += "`"
        elif tag == "pre":
            self.blocks.append("```\n" + self.buf.strip("\n") + "\n```")
            self.buf = ""
            self.in_pre = False
        elif tag == "blockquote":
            self.flush("> ")
            self.quote = False
        elif tag == "li":
            self.flush()
        elif tag in ("ul", "ol"):
            self.flush()
            self.lists.pop()
            self.blocks.append("")  # end the list
        elif tag == "figcaption":
            # A caption becomes an italic line under its image.
            text = self.buf.strip()
            if text:
                self.blocks.append(f"*{text}*")
            self.buf = ""

    def handle_data(self, data):
        self.buf += data if self.in_pre else re.sub(r"\s+", " ", data)


def convert(body, slug):
    parser = ToMarkdown(slug)
    parser.feed(body)
    parser.flush()
    blocks = parser.blocks
    # Drop Medium's footer, the 99P Labs subscribe paragraph, and a "Conclusion"
    # heading that only held that paragraph.
    blocks = [b for b in blocks if "was originally published in" not in b]
    # Medium sometimes joins the subscribe text onto the end of the last paragraph.
    blocks = [re.sub(r"\s*If you enjoyed this piece.*$", "", b, flags=re.S) for b in blocks]
    blocks = [b for b in blocks if b.strip() or b == ""]
    while blocks and (blocks[-1] == "" or re.fullmatch(r"## (Conclusion|Closing)", blocks[-1])):
        blocks.pop()
    # Join list items with single newlines and other blocks with blank lines.
    out = ""
    for b in blocks:
        is_item = re.match(r"\s*(- |\d+\. )", b)
        prev_item = re.match(r"\s*(- |\d+\. )", out.rsplit("\n", 1)[-1]) if out else None
        out += ("\n" if is_item and prev_item else "\n\n") + b if out else b
    out = re.sub(r"\n{3,}", "\n\n", out)
    return out.strip() + "\n", parser.images


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url", nargs="?", help="the post's medium.com address")
    ap.add_argument("--description", default="TODO: one sentence that summarizes the post.")
    ap.add_argument("--tags", nargs="*", default=[], help="topic tags, e.g. intelligence/ai")
    ap.add_argument("--confidence", default="likely", help="e.g. likely, possible")
    ap.add_argument("--importance", type=int, default=5, help="0 to 10")
    ap.add_argument("--slug", help="file name without .md (default: from the title)")
    ap.add_argument("--list", action="store_true", help="list the posts in the feed")
    args = ap.parse_args()

    items = list(feed_items())
    if args.list or not args.url:
        for it in items:
            print(it["date"], it["title"], it["link"], sep="  |  ")
        return

    post_id = args.url.rstrip("/").split("?")[0].split("-")[-1]
    match = [it for it in items if it["link"].endswith(post_id)]
    if not match:
        sys.exit("That post isn't in the feed, which only holds the 10 most recent posts.")
    post = match[0]
    slug = args.slug or slugify(post["title"])
    path = os.path.join(BLOG, slug + ".md")
    if os.path.exists(path):
        sys.exit(f"{path} already exists.")

    body, images = convert(post["body"], slug)
    os.makedirs(os.path.join(BLOG, "images"), exist_ok=True)
    for src, name in images:
        with open(os.path.join(BLOG, "images", name), "wb") as f:
            f.write(fetch(re.sub(r"/max/\d+/", "/max/2000/", src)))

    date = post["date"].isoformat()
    title = post["title"].replace('"', '\\"')
    front = [
        "---",
        f'title: "{title}"',
        f'description: "{args.description}"',
        f"created: {date}",
        f"modified: {date}",  # the post last changed when it was published
        "status: finished",
        f"confidence: {args.confidence}",
        f"importance: {args.importance}",
    ]
    if args.tags:
        front.append("tags: [" + ", ".join(args.tags) + "]")
    front += ["---", "", ""]
    note = f"\n*Originally published on the [99P Labs blog]({post['link']}) on {date}.*\n"
    with open(path, "w") as f:
        f.write("\n".join(front) + body + note)
    print(f"Wrote {os.path.relpath(path, ROOT)} with {len(images)} images.")
    if images:
        print("Replace each 'TODO: describe this image' with a short description of the image.")


if __name__ == "__main__":
    main()
