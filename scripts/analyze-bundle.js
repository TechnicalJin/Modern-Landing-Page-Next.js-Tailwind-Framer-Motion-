#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Bundle Analyzer Script
 * Analyzes Next.js bundle size and provides optimization insights
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔍 Running Bundle Analysis...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeNextBuild() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log(`${colors.red}❌ Build directory not found. Please run 'npm run build' first.${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`${colors.blue}📦 Build Directory Analysis${colors.reset}`);
  console.log('─'.repeat(50));

  // Analyze .next directory size
  const getDirectorySize = (dirPath) => {
    let totalSize = 0;
    
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
      }
    }
    
    return totalSize;
  };

  const totalBuildSize = getDirectorySize(buildDir);
  console.log(`\n${colors.bright}Total Build Size:${colors.reset} ${formatBytes(totalBuildSize)}`);

  // Analyze subdirectories
  const subdirs = ['static', 'server', 'cache'];
  console.log(`\n${colors.blue}📂 Subdirectory Breakdown:${colors.reset}`);
  
  subdirs.forEach(subdir => {
    const subdirPath = path.join(buildDir, subdir);
    if (fs.existsSync(subdirPath)) {
      const size = getDirectorySize(subdirPath);
      console.log(`  ${subdir.padEnd(15)} ${formatBytes(size)}`);
    }
  });

  // Check for large files
  console.log(`\n${colors.yellow}⚠️  Large Files (>100KB):${colors.reset}`);
  
  const findLargeFiles = (dirPath, threshold = 100 * 1024) => {
    const largeFiles = [];
    
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        largeFiles.push(...findLargeFiles(filePath, threshold));
      } else {
        const stats = fs.statSync(filePath);
        if (stats.size > threshold) {
          largeFiles.push({
            path: filePath.replace(process.cwd(), ''),
            size: stats.size,
          });
        }
      }
    }
    
    return largeFiles;
  };

  const largeFiles = findLargeFiles(buildDir)
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  largeFiles.forEach(file => {
    const sizeColor = file.size > 500 * 1024 ? colors.red : colors.yellow;
    console.log(`  ${file.path}`);
    console.log(`    ${sizeColor}${formatBytes(file.size)}${colors.reset}`);
  });

  // Recommendations
  console.log(`\n${colors.green}💡 Optimization Recommendations:${colors.reset}`);
  console.log('─'.repeat(50));
  
  const recommendations = [
    '✓ Use dynamic imports for large components',
    '✓ Optimize images with next/image',
    '✓ Enable compression in production',
    '✓ Remove unused dependencies',
    '✓ Tree-shake icon libraries',
    '✓ Use font-display: swap for web fonts',
    '✓ Minimize third-party scripts',
    '✓ Enable SWC minification',
  ];

  recommendations.forEach(rec => console.log(`  ${rec}`));

  console.log('\n');
}

// Run analysis
try {
  analyzeNextBuild();
  
  console.log(`${colors.blue}🚀 For detailed visual analysis, run:${colors.reset}`);
  console.log(`   ${colors.bright}ANALYZE=true npm run build${colors.reset}\n`);
  
} catch (error) {
  console.error(`${colors.red}Error analyzing bundle:${colors.reset}`, error.message);
  process.exit(1);
}
