import { vi, it, expect, beforeEach, afterEach } from 'vitest'
import { gitPull } from './git-pull'

// Mock child_process
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

import { execSync } from 'child_process'

const mockExecSync = execSync as unknown as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.clearAllMocks()
})

it('gitPull should return true on successful execution', () => {
  mockExecSync.mockReturnValueOnce(undefined)
  const result = gitPull()
  expect(result).toBe(true)
  expect(mockExecSync).toHaveBeenCalledWith('git pull', { stdio: 'inherit' })
})

it('gitPull should return false on execution failure', () => {
  const error = new Error('fatal: not a git repository')
  mockExecSync.mockImplementationOnce(() => {
    throw error
  })
  const result = gitPull()
  expect(result).toBe(false)
  expect(mockExecSync).toHaveBeenCalledWith('git pull', { stdio: 'inherit' })
})

it('gitPull should handle non-Error exceptions', () => {
  mockExecSync.mockImplementationOnce(() => {
    throw 'Unknown error'
  })
  const result = gitPull()
  expect(result).toBe(false)
})
