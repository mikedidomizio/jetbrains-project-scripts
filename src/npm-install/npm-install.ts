import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

/**
 * Checks if package.json exists in the current working directory
 * @param cwd - Current working directory (defaults to process.cwd())
 * @returns true if package.json exists, false otherwise
 */
export function hasPackageJson(cwd: string = process.cwd()): boolean {
  return existsSync(join(cwd, 'package.json'))
}

/**
 * Executes `npm install` in the current working directory if package.json exists
 * @returns true if successful or skipped (no package.json), false if npm install failed
 */
export function npmInstall(): boolean {
  try {
    if (!hasPackageJson()) {
      console.log('⊘ No package.json found, skipping npm install')
      return true
    }

    console.log('Running npm install...')
    execSync('npm install', { stdio: 'inherit' })
    console.log('✓ npm install completed successfully')
    return true
  } catch (error) {
    console.error(
      '✗ npm install failed:',
      error instanceof Error ? error.message : String(error),
    )
    return false
  }
}

if (require.main === module) {
  npmInstall()
}
