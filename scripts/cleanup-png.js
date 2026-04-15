const { glob } = require('glob');
const { promises: fs } = require('fs');
const path = require('path');

async function cleanupPNG() {
  try {
    // Find all PNG files in dist/assets/images
    const pngFiles = await glob('dist/assets/images/**/*.png');

    if (pngFiles.length === 0) {
      console.log('✓ No PNG files found in dist (WebP only deployment)');
      return;
    }

    for (const pngFile of pngFiles) {
      await fs.unlink(pngFile);
      console.log(`  ✓ Removed: ${path.basename(pngFile)}`);
    }

    console.log(`\n✅ Cleaned up ${pngFiles.length} PNG files from dist (using WebP only)\n`);
  } catch (error) {
    console.error('❌ Error during PNG cleanup:', error.message);
    process.exit(1);
  }
}

cleanupPNG();
