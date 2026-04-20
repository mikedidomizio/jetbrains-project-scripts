import { execSync } from 'child_process'

/**
 * Executes `git pull` in the current working directory
 * @returns true if successful, false if failed
 */
export function gitPull(): boolean {
  try {
    console.log('Running git pull...')
    execSync('git pull', { stdio: 'inherit' })
    console.log('✓ Git pull completed successfully')
    return true
  } catch (error) {
    console.error(
      '✗ Git pull failed:',
      error instanceof Error ? error.message : String(error),
    )
    return false
  }
}

if (require.main === module) {
  gitPull()
}
