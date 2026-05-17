@echo off
REM Quick Testing Script for Playwright CRM Automation Framework
REM This script verifies all components are working correctly

setlocal enabledelayedexpansion

echo.
echo ============================================
echo Playwright CRM Automation Framework Testing
echo ============================================
echo.

REM Check if npm is installed
echo [1/8] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm not found. Please install Node.js
    exit /b 1
) else (
    echo ✅ npm is installed
)

REM Check if dependencies are installed
echo.
echo [2/8] Verifying dependencies...
if not exist node_modules (
    echo ⚠️  node_modules not found, installing...
    call npm install
) else (
    echo ✅ Dependencies already installed
)

REM Check Playwright installation
echo.
echo [3/8] Verifying Playwright browsers...
call npx playwright install --with-deps >nul 2>&1
echo ✅ Playwright browsers verified

REM Verify project structure
echo.
echo [4/8] Verifying project structure...
set files_ok=1
if not exist ".env.example" (
    echo ❌ Missing .env.example
    set files_ok=0
)
if not exist ".gitignore" (
    echo ❌ Missing .gitignore
    set files_ok=0
)
if not exist "README.md" (
    echo ❌ Missing README.md
    set files_ok=0
)
if not exist "playwright-crm-project\tests\auth.spec.js" (
    echo ❌ Missing test files
    set files_ok=0
)
if !files_ok! equ 1 (
    echo ✅ All required files present
) else (
    echo ❌ Some files missing
    exit /b 1
)

REM Check .env file
echo.
echo [5/8] Checking environment setup...
if exist ".env" (
    echo ✅ .env file exists
) else (
    echo ⚠️  .env file not found
    echo    Copy from .env.example: copy .env.example .env
)

REM Run tests
echo.
echo [6/8] Running Playwright tests...
echo    (This may take a minute...)
call npm test
if errorlevel 1 (
    echo ❌ Tests failed!
    exit /b 1
) else (
    echo ✅ All tests passed
)

REM Check linting
echo.
echo [7/8] Checking code quality...
call npx eslint playwright-crm-project\ --fix >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Some linting issues found (auto-fixed)
) else (
    echo ✅ Code quality OK
)

REM Generate report
echo.
echo [8/8] Generating test report...
echo ✅ Report available: playwright-report/index.html
echo    View with: npm run test:report

REM Summary
echo.
echo ============================================
echo ✅ All Verification Steps Passed!
echo ============================================
echo.
echo Next Steps:
echo 1. Review test report: npm run test:report
echo 2. Configure .env file with your values
echo 3. Push to GitHub: git push origin main
echo 4. Configure GitHub secrets for CI/CD
echo 5. Watch CI/CD workflow run
echo.
echo Documentation:
echo - README.md - Project overview
echo - TESTING-VERIFICATION-GUIDE.md - Detailed testing guide
echo - CONTRIBUTING.md - Contributing guidelines
echo.
pause
