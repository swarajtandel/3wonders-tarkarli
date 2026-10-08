import os
from PIL import Image

photo_dir = "photos"
for filename in os.listdir(photo_dir):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")) and filename != "logo.png":
        filepath = os.path.join(photo_dir, filename)
        try:
            with Image.open(filepath) as img:
                if img.mode != "RGB" and not filename.lower().endswith(".png"):
                    img = img.convert("RGB")
                
                # Resize if too large
                max_size = 1200
                if max(img.size) > max_size:
                    ratio = max_size / max(img.size)
                    new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                if filename.lower().endswith(".png"):
                    img.save(filepath, optimize=True)
                else:
                    img.save(filepath, "JPEG", optimize=True, quality=80)
            print(f"Compressed {filename}")
        except Exception as e:
            print(f"Error compressing {filename}: {e}")

