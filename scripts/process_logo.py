"""One-off script: extract Alphabyte logo from JPEG with transparent background."""
from PIL import Image
from collections import deque

SRC = "../WhatsApp Image 2026-11-01 at 3.15.04 PM.jpeg"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

def is_light(p):
    r, g, b = p[0], p[1], p[2]
    return r > 200 and g > 200 and b > 200

# Flood fill from borders over light pixels -> outer background
seen = [[False] * w for _ in range(h)]
dq = deque()
for x in range(w):
    for y in (0, h - 1):
        if is_light(px[x, y]) and not seen[y][x]:
            seen[y][x] = True
            dq.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if is_light(px[x, y]) and not seen[y][x]:
            seen[y][x] = True
            dq.append((x, y))
while dq:
    x, y = dq.popleft()
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and is_light(px[nx, ny]):
            seen[ny][nx] = True
            dq.append((nx, ny))

out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
op = out.load()
for y in range(h):
    for x in range(w):
        if seen[y][x]:
            continue  # transparent background
        r, g, b, _ = px[x, y]
        if is_light((r, g, b)):
            op[x, y] = (255, 255, 255, 255)  # inner circuit lines -> pure white
        else:
            op[x, y] = (r, g, b, 255)

bbox = out.getbbox()
out = out.crop(bbox)
out.save("public/images/logo.png")

# Light variant for dark backgrounds: burgundy -> white, white lines -> charcoal
light = Image.new("RGBA", out.size, (0, 0, 0, 0))
lp = light.load()
sp = out.load()
for y in range(out.size[1]):
    for x in range(out.size[0]):
        r, g, b, a = sp[x, y]
        if a == 0:
            continue
        if r > 200 and g > 200 and b > 200:
            lp[x, y] = (23, 25, 27, 255)
        else:
            lp[x, y] = (255, 255, 255, 255)
light.save("public/images/logo-light.png")

# Favicon
out.resize((64, 64 * out.size[1] // out.size[0]), Image.LANCZOS).save("public/favicon.png")
print("logo size:", out.size)
