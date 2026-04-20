import { vi, it, expect, beforeEach, afterEach, describe } from 'vitest'
import { npmInstall, hasPackageJson } from './npm-install'

// Mock child_process and fs
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

vi.mock('fs', () => ({
  existsSync: vi.fn(),
}))

import { execSync } from 'child_process'
import { existsSync } from 'fs'

const mockExecSync = execSync as unknown as ReturnType<typeof vi.fn>
const mockExistsSync = existsSync as unknown as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('hasPackageJson', () => {
  it('should return true when package.json exists', () => {
    mockExistsSync.mockReturnValueOnce(true)
    const result = hasPackageJson()
    expect(result).toBe(true)
  })

  it('should return false when package.json does not exist', () => {
    mockExistsSync.mockReturnValueOnce(false)
    const result = hasPackageJson()
    expect(result).toBe(false)
  })

  it('should check the provided cwd directory', () => {
    mockExistsSync.mockReturnValueOnce(true)
    hasPackageJson('/custom/path')
    // Path joins may use backslashes on Windows
    const callArgs = (mockExistsSync.mock.calls[0][0] as string).replace(
      /\\/g,
      '/',
    )
    expect(callArgs).toBe('/custom/path/package.json')
  })
})

describe('npmInstall', () => {
  it('should run npm install when package.json exists', () => {
    mockExistsSync.mockReturnValueOnce(true)
    mockExecSync.mockReturnValueOnce(undefined)
    const result = npmInstall()
    expect(result).toBe(true)
    expect(mockExecSync).toHaveBeenCalledWith('npm install', {
      stdio: 'inherit',
    })
  })

  it('should return true and skip when package.json does not exist', () => {
    mockExistsSync.mockReturnValueOnce(false)
    const result = npmInstall()
    expect(result).toBe(true)
    expect(mockExecSync).not.toHaveBeenCalled()
  })

  it('should return false on npm install failure', () => {
    mockExistsSync.mockReturnValueOnce(true)
    const error = new Error('npm ERR! code ERESOLVE')
    mockExecSync.mockImplementationOnce(() => {
      throw error
    })
    const result = npmInstall()
    expect(result).toBe(false)
  })

  it('should handle non-Error exceptions', () => {
    mockExistsSync.mockReturnValueOnce(true)
    mockExecSync.mockImplementationOnce(() => {
      throw 'Unknown error'
    })
    const result = npmInstall()
    expect(result).toBe(false)
  })
})
