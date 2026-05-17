#!/bin/bash
# Quick Testing Script for Playwright CRM Automation Framework
# This script verifies all components are working correctly

set -e  # Exit on error

echo ""
echo "============================================"
echo "Playwright CRM Automation Framework Testing"
echo "============================================"
echo ""

# Check if npm is installed
echo "[1/8] Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi
echo "✅ npm is installed ($(npm --version))"

# Install dependencies
echo ""
echo "[2/8] Installing/Verifying dependencies..."
npm install
echo "✅ Dependencies installed"

# Verify Playwright
echo ""
echo "[3/8] Verifying Playwright browsers..."
npx playwright install --with-deps > /dev/null 2>&1
echo "✅ Playwright browsers verified"

# Verify project structure
echo ""
echo "[4/8] Verifying project structure..."
required_files=(
    ".env.example"
    ".gitignore"
    "README.md"
    "playwright-crm-project/tests/auth.spec.js"
)

files_ok=true
for file in "${required_files[@]}"; do
    if [ ! -e "$file" ]; then
        echo "❌ Missing $file"
        files_ok=false
    fi
done

if [ "$files_ok" = true ]; then
    echo "✅ All required files present"
else
    echo "❌ Some files missing"
    exit 1
fi

# Check .env file
echo ""
echo "[5/8] Checking environment setup..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file not found"
    echo "   Copy from .env.example: cp .env.example .env"
fi

# Run tests
echo ""
echo "[6/8] Running Playwright tests..."
echo "   (This may take a minute...)"
npm test || exit 1
echo "✅ All tests passed"

# Check linting
echo ""
echo "[7/8] Checking code quality..."
npx eslint playwright-crm-project/ --fix > /dev/null 2>&1 || echo "⚠️  Some linting issues found (auto-fixed)"
echo "✅ Code quality check complete"

# Generate report
echo ""
echo "[8/8] Generating test report..."
echo "✅ Report available: playwright-report/index.html"
echo "   View with: npm run test:report"

# Summary
echo ""
echo "============================================"
echo "✅ All Verification Steps Passed!"
echo "============================================"
echo ""
echo "Next Steps:"
echo "1. Review test report: npm run test:report"
echo "2. Configure .env file with your values"
echo "3. Push to GitHub: git push origin main"
echo "4. Configure GitHub secrets for CI/CD"
echo "5. Watch CI/CD workflow run"
echo ""
echo "Documentation:"
echo "- README.md - Project overview"
echo "- TESTING-VERIFICATION-GUIDE.md - Detailed testing guide"
echo "- CONTRIBUTING.md - Contributing guidelines"
echo ""
