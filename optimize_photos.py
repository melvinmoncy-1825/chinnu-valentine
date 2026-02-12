import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

def optimize_images(folder):
    if not os.path.exists(folder):
        print(f"Skipping {folder} (not found)")
        return

    print(f"Optimizing images in {folder}...")
    for filename in os.listdir(folder):
        filepath = os.path.join(folder, filename)
        
        # Check if it's an image (including renamed HEICs)
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.heic')):
            try:
                with Image.open(filepath) as img:
                    # Convert to RGB
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Resize if width > 1200
                    if img.width > 1200:
                        ratio = 1200 / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((1200, new_height), Image.Resampling.LANCZOS)
                    
                    # Save (if it was HEIC or renamed HEIC, save as proper JPG)
                    # We save over the original filename even if it was fake .jpg
                    img.save(filepath, "JPEG", quality=75, optimize=True)
                    print(f"✓ Optimized: {filename}")
            except Exception as e:
                print(f"✗ Could not process {filename}: {e}")

# Folders to process
folders = [
    "photos",
    "memories/bike",
    "memories/train",
    "memories/secret"
]

for f in folders:
    optimize_images(f)

print("✨ All photos optimized!")
