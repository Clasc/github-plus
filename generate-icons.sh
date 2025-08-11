#!/bin/bash

# Script to generate PNG icons from SVG for Chrome extension
# Requires ImageMagick or Inkscape to be installed

set -e

# Colors
MAIN_COLOR="#ffc217"
SECONDARY_COLOR="#b7bfd2"

# Check if required tools are available
if command -v magick >/dev/null 2>&1; then
    CONVERTER="magick"
elif command -v convert >/dev/null 2>&1; then
    CONVERTER="convert"
elif command -v inkscape >/dev/null 2>&1; then
    CONVERTER="inkscape"
else
    echo "Error: No suitable image converter found."
    echo "Please install ImageMagick or Inkscape:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p icons

echo "Generating PNG icons from SVG..."

# Generate different sizes
SIZES=(16 32 48 128)

for size in "${SIZES[@]}"; do
    echo "Generating ${size}x${size} icon..."

    if [ "$CONVERTER" = "inkscape" ]; then
        inkscape icon.svg -w $size -h $size -o "icons/icon${size}.png"
    else
        $CONVERTER icon.svg -resize ${size}x${size} "icons/icon${size}.png"
    fi

    echo "✓ icons/icon${size}.png created"
done

echo ""
echo "🎉 All icons generated successfully!"
echo "Files created:"
for size in "${SIZES[@]}"; do
    echo "  - icons/icon${size}.png (${size}x${size})"
done

echo ""
echo "Next steps:"
echo "1. Update manifest.json to include icon references"
echo "2. Load the extension in Chrome (chrome://extensions/)"
echo "3. Test on a GitHub PR page"

# Verify files were created
echo ""
echo "File verification:"
for size in "${SIZES[@]}"; do
    if [ -f "icons/icon${size}.png" ]; then
        file_size=$(ls -lh "icons/icon${size}.png" | awk '{print $5}')
        echo "✓ icon${size}.png - $file_size"
    else
        echo "✗ icon${size}.png - MISSING"
    fi
done
