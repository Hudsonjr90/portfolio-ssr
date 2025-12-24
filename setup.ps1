# Portfolio SSR Migration Script

Write-Host "Installing Next.js dependencies..." -ForegroundColor Green

# Navigate to the project directory
Set-Location "d:\personalReps\portfolio-ssr"

# Install dependencies
npm install

Write-Host "`nMigration completed!" -ForegroundColor Green
Write-Host "Project structure:" -ForegroundColor Yellow
Write-Host "  - Next.js 14 with App Router" -ForegroundColor White
Write-Host "  - TypeScript support" -ForegroundColor White
Write-Host "  - All components migrated" -ForegroundColor White
Write-Host "  - SSR-ready architecture" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. cd d:\personalReps\portfolio-ssr" -ForegroundColor White
Write-Host "  2. npm run dev" -ForegroundColor White
Write-Host "  3. Open http://localhost:3000" -ForegroundColor White