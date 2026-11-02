"""One-off script: generate the 1200x630 Open Graph image for Alphabyte."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
CHARCOAL = (23, 25, 27)
GREEN = (22, 133, 29)
BURGUNDY = (163, 13, 80)
WHITE = (255, 255, 255)

img = Image.new("RGB", (W, H), CHARCOAL)
d = ImageDraw.Draw(img)

# subtle grid (pre-blended with charcoal, RGB mode ignores alpha)
GRID = (32, 35, 38)
for x in range(0, W, 44):
    d.line([(x, 0), (x, H)], fill=GRID, width=1)
for y in range(0, H, 44):
    d.line([(0, y), (W, y)], fill=GRID, width=1)

# accent glows (simple radial-ish circles)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([W - 380, -180, W + 120, 320], fill=GREEN + (46,))
gd.ellipse([-160, H - 260, 340, H + 240], fill=BURGUNDY + (36,))
glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["GaussianBlur"]).GaussianBlur(60))
img.paste(glow, (0, 0), glow)

def font(path_candidates, size):
    for p in path_candidates:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()

bold = font(
    [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ],
    72,
)
medium = font(
    [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ],
    30,
)
small = font(
    [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ],
    26,
)

# logo
logo = Image.open("public/images/logo-light.png").convert("RGBA")
logo_h = 110
logo_w = int(logo.width * logo_h / logo.height)
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
img.paste(logo, (90, 90), logo)

# headline
d.text((90, 260), "ALPHABYTE", font=bold, fill=WHITE)
d.text((90, 352), "Build. Automate. Grow.", font=medium, fill=GREEN)
d.text(
    (90, 410),
    "Web · Mobile · ERP · CRM · 3D & AR",
    font=medium,
    fill=(200, 203, 205),
)

# bottom rule + url
d.rectangle([90, 520, 210, 526], fill=GREEN)
d.text((90, 548), "alphabyte — software development & digital solutions", font=small, fill=(168, 172, 175))

img.save("public/images/og.png")
print("og.png saved")
