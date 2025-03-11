exports.onPreInit = () => {
  console.log("Debugging build process...");
}

exports.onPreBuild = () => {
  console.log("Starting build...");
}

exports.onPostBuild = () => {
  console.log("Build completed successfully");
}

// Add error handler
exports.onCreateNode = ({ node }) => {
  // Safety check for LMDB or similar libraries
  if (node && node.internal && node.internal.type === 'SitePage') {
    try {
      // Add any specialized handling here if needed
    } catch (e) {
      console.log("Handled potential error in node creation", e.message);
      // Return gracefully without throwing
    }
  }
} 