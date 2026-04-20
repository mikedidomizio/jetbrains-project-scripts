# JetBrains Project Scripts

A collection of utility scripts designed to run automatically when a
JetBrains IDE (e.g., WebStorm) opens a project. Each script is
self-contained, independently executable, and fully tested.

## Purpose

When working across many projects, it's easy to forget routine
housekeeping tasks like pulling the latest changes from Git or ensuring
dependencies are up to date. These scripts automate those tasks so they
run silently in the background every time you open your project.

## Available Scripts

### `git-pull`

Runs `git pull` in the project's root directory. Useful for ensuring
your local branch is up to date with the remote whenever you start a
work session.

```bash
npm run git-pull
```

- ✓ Succeeds silently if already up to date
- ✗ Logs an error (but does **not** throw) if the pull fails —
  won't block your IDE from opening

---

### `npm-install`

Checks for a `package.json` in the project root and runs
`npm install` if one is found. Keeps your `node_modules` in sync
automatically after branch switches or dependency updates.

```bash
npm run npm-install
```

- ⊘ Skips silently if no `package.json` is present
- ✓ Runs `npm install` and logs success
- ✗ Logs an error (but does **not** throw) if install fails

---

## Adding Scripts to a JetBrains Project

Scripts can be wired into WebStorm (or any JetBrains IDE) as
**startup tasks** that run automatically when the project opens:

1. Open **Settings** → **Tools** → **Startup Tasks**
2. Click **+** and choose **npm script** (or **Shell Script**)
3. Select `git-pull` or `npm-install` from the script list
4. Click **OK** — the selected script will now run every time the
   project opens

---

## Development

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm test -- --run

# Lint and auto-fix
npm run lint

# Build TypeScript
npm run build
```
