const fs = require('fs');
const path = require('path');

class I18nKeyCleaner {
    constructor() {
        this.usedKeys = new Set();
        this.translationData = {};
    }

    // First, let's explore what's actually in your project
    exploreProjectStructure() {
        console.log('🔍 Exploring your project structure...\n');

        const currentDir = process.cwd();
        console.log(`📍 Current directory: ${currentDir}`);

        // List all items in current directory
        try {
            const items = fs.readdirSync(currentDir);
            console.log('\n📁 Items in current directory:');
            items.forEach(item => {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                const type = stat.isDirectory() ? '📁' : '📄';
                console.log(`  ${type} ${item}`);
            });

            // Look for potential directories
            const possibleDirs = items.filter(item => {
                const fullPath = path.join(currentDir, item);
                return fs.statSync(fullPath).isDirectory() &&
                    !['node_modules', '.git', 'dist', 'build', '.next'].includes(item);
            });

            console.log('\n🎯 Potential source directories found:');
            possibleDirs.forEach(dir => console.log(`  📁 ${dir}`));

            return possibleDirs;

        } catch (error) {
            console.error(`❌ Error reading current directory: ${error.message}`);
            return [];
        }
    }

    // Find all React/TypeScript files in the project
    findAllSourceFiles(directories = []) {
        const allFiles = [];
        const fileExtensions = ['.tsx', '.ts', '.jsx', '.js'];

        // If no directories specified, use the packages structure
        if (directories.length === 0) {
            directories = [
                'packages/connect',
                'packages/gateway',
                'packages/shared',
                'packages/circulars'
            ];

            // Also check if these directories exist and show what we find
            console.log('🎯 Checking for packages structure...');
            directories.forEach(dir => {
                const fullPath = path.resolve(dir);
                if (fs.existsSync(fullPath)) {
                    console.log(`  ✅ Found: ${dir}`);
                } else {
                    console.log(`  ❌ Not found: ${dir}`);
                }
            });
        }

        console.log(`\n🔍 Scanning directories: ${directories.join(', ')}\n`);

        const scanDir = (dirPath, depth = 0) => {
            if (depth > 10) return; // Prevent infinite recursion

            try {
                const items = fs.readdirSync(dirPath);

                for (const item of items) {
                    const fullPath = path.join(dirPath, item);
                    const stat = fs.statSync(fullPath);

                    if (stat.isDirectory()) {
                        // Skip common non-source directories
                        if (!['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.nyc_output'].includes(item)) {
                            scanDir(fullPath, depth + 1);
                        }
                    } else if (fileExtensions.some(ext => item.endsWith(ext))) {
                        allFiles.push(fullPath);
                    }
                }
            } catch (error) {
                console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`);
            }
        };

        // Scan each directory
        directories.forEach(dir => {
            const fullPath = path.resolve(dir);
            if (fs.existsSync(fullPath)) {
                console.log(`📁 Scanning: ${dir}`);
                scanDir(fullPath);
            } else {
                console.log(`❌ Directory not found: ${dir}`);
            }
        });

        console.log(`\n✅ Found ${allFiles.length} source files total`);
        return allFiles;
    }

    // Extract i18n keys from content
    extractKeys(content) {
        const keys = new Set();

        // More comprehensive patterns for React intl usage
        const patterns = [
            // intl.formatMessage({ id: "key" })
            /intl\.formatMessage\(\s*{\s*id:\s*["'`]([^"'`]+)["'`]/gi,
            // formatMessage({ id: "key" })
            /formatMessage\(\s*{\s*id:\s*["'`]([^"'`]+)["'`]/gi,
            // <FormattedMessage id="key" />
            /<FormattedMessage[^>]+id=["'`]([^"'`]+)["'`]/gi,
            // defineMessages patterns
            /id:\s*["'`]([^"'`]+)["'`]/gi,
            // intl.get("key") - if using other libraries
            /intl\.get\(\s*["'`]([^"'`]+)["'`]/gi,
            // t("key") - if using other libraries
            /\bt\(\s*["'`]([^"'`]+)["'`]/gi
        ];

        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                keys.add(match[1]);
            }
        });

        return keys;
    }

    // Scan all files for used keys
    scanAllFiles() {
        // First explore and find all source files
        const sourceFiles = this.findAllSourceFiles();

        if (sourceFiles.length === 0) {
            console.log('❌ No source files found! Please check your project structure.');
            return;
        }

        console.log('\n🔍 Scanning files for i18n keys...\n');

        let totalKeys = 0;
        let filesWithKeys = 0;

        sourceFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const keys = this.extractKeys(content);

                if (keys.size > 0) {
                    filesWithKeys++;
                    const relativePath = path.relative(process.cwd(), filePath);
                    console.log(`📄 ${relativePath}: ${keys.size} keys`);

                    // Add to our used keys set
                    keys.forEach(key => {
                        this.usedKeys.add(key);
                        totalKeys++;
                    });

                    // Show the keys found (limit to first 5 per file for readability)
                    const keyArray = Array.from(keys);
                    if (keyArray.length <= 5) {
                        console.log(`   Keys: ${keyArray.join(', ')}`);
                    } else {
                        console.log(`   Keys: ${keyArray.slice(0, 5).join(', ')}... and ${keyArray.length - 5} more`);
                    }
                }
            } catch (error) {
                console.warn(`⚠️  Could not read ${filePath}: ${error.message}`);
            }
        });

        console.log(`\n📊 Scan Summary:`);
        console.log(`   Files scanned: ${sourceFiles.length}`);
        console.log(`   Files with keys: ${filesWithKeys}`);
        console.log(`   Total key occurrences: ${totalKeys}`);
        console.log(`   Unique keys found: ${this.usedKeys.size}`);

        if (this.usedKeys.size > 0) {
            console.log(`\n🔑 All unique keys found:`);
            Array.from(this.usedKeys).sort().forEach(key => {
                console.log(`   - ${key}`);
            });
        }
    }

    // Load and process translation files
    processTranslationFiles() {
        console.log('\n📚 Processing translation files...\n');

        const translationFiles = [
            'packages/gateway/src/app/i18n/messages/ar.json',
            'packages/gateway/src/app/i18n/messages/en.json'
        ];

        translationFiles.forEach(fileName => {
            const filePath = path.resolve(fileName);

            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const data = JSON.parse(content);

                    console.log(`✅ Loaded ${fileName}: ${Object.keys(data).length} keys`);

                    if (this.usedKeys.size === 0) {
                        console.log(`⚠️  No used keys found - cannot clean ${fileName}`);
                        return;
                    }

                    // Create cleaned version
                    const cleanedData = {};
                    const originalKeys = Object.keys(data);

                    // Keep only used keys, preserving order
                    originalKeys.forEach(key => {
                        if (this.usedKeys.has(key)) {
                            cleanedData[key] = data[key];
                        }
                    });

                    const removedCount = originalKeys.length - Object.keys(cleanedData).length;

                    // Create backup
                    const backupPath = `${fileName}.backup`;
                    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));

                    // Write cleaned file
                    fs.writeFileSync(fileName, JSON.stringify(cleanedData, null, 2));

                    console.log(`✅ Cleaned ${fileName}:`);
                    console.log(`   Original: ${originalKeys.length} keys`);
                    console.log(`   Kept: ${Object.keys(cleanedData).length} keys`);
                    console.log(`   Removed: ${removedCount} keys`);
                    console.log(`   Backup created: ${backupPath}`);

                    // Show what was removed (limit output)
                    const removedKeys = originalKeys.filter(key => !this.usedKeys.has(key));
                    if (removedKeys.length <= 10) {
                        console.log(`   Removed keys: ${removedKeys.join(', ')}`);
                    } else {
                        console.log(`   Removed keys: ${removedKeys.slice(0, 10).join(', ')}... and ${removedKeys.length - 10} more`);
                    }

                } catch (error) {
                    console.error(`❌ Error processing ${fileName}: ${error.message}`);
                }
            } else {
                console.log(`❌ Translation file not found: ${fileName}`);
            }
        });
    }

    // Generate detailed report
    generateReport() {
        const report = {
            summary: {
                scanDate: new Date().toISOString(),
                totalUsedKeys: this.usedKeys.size,
                usedKeys: Array.from(this.usedKeys).sort()
            },
            translationFiles: {}
        };

        // Process each translation file for the report
        [
            'packages/gateway/src/app/i18n/messages/ar.json',
            'packages/gateway/src/app/i18n/messages/en.json'
        ].forEach(fileName => {
            const filePath = path.resolve(fileName);
            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const data = JSON.parse(content);
                    const originalKeys = Object.keys(data);

                    const backupPath = `${fileName}.backup`;
                    let originalData = {};
                    if (fs.existsSync(backupPath)) {
                        const backupContent = fs.readFileSync(backupPath, 'utf8');
                        originalData = JSON.parse(backupContent);
                    }

                    const originalKeyCount = Object.keys(originalData).length || originalKeys.length;
                    const removedKeys = Object.keys(originalData).filter(key => !this.usedKeys.has(key)) || [];

                    report.translationFiles[fileName] = {
                        originalKeys: originalKeyCount,
                        currentKeys: originalKeys.length,
                        removedKeys: removedKeys.length,
                        removedKeysList: removedKeys
                    };
                } catch (error) {
                    console.warn(`Could not process ${fileName} for report: ${error.message}`);
                }
            }
        });

        // Save report
        fs.writeFileSync('i18n-cleanup-report.json', JSON.stringify(report, null, 2));
        console.log('\n📋 Detailed report saved to: i18n-cleanup-report.json');

        return report;
    }

    // Main execution
    async run() {
        console.log('🚀 Starting comprehensive i18n cleanup...\n');

        try {
            // Step 1: Scan all files for used keys
            this.scanAllFiles();

            // Step 2: Process translation files
            this.processTranslationFiles();

            // Step 3: Generate report
            this.generateReport();

            console.log('\n🎉 Cleanup completed successfully!');
            console.log('💡 Backup files (.backup) created for safety');
            console.log('📋 Check i18n-cleanup-report.json for detailed results');

        } catch (error) {
            console.error('❌ Error during cleanup:', error.message);
            console.error(error.stack);
            process.exit(1);
        }
    }
}

// Run the cleaner
if (require.main === module) {
    const cleaner = new I18nKeyCleaner();
    cleaner.run();
}

module.exports = I18nKeyCleaner;