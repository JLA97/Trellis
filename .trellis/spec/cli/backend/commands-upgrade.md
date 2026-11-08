# `trellis upgrade` Command

How `trellis upgrade` upgrades the globally installed Trellis CLI package.

This command is intentionally separate from `trellis update`:

- `trellis upgrade` updates the **CLI binary** by running npm's global install.
- `trellis update` updates a **project's bundled Trellis files** under `.trellis/`
  and platform directories.

---

## User-facing contract

```text
trellis upgrade [--tag <tag-or-version>] [--dry-run]
```

Behavior:

- Builds and runs `npm install -g @mindfoldhq/trellis@<tag>`.
- POSIX execution must spawn `npm` directly without shell execution.
- Windows execution must route through `cmd.exe /d /s /c npm install -g ...`
  instead of directly spawning `npm.cmd`.
- Uses the current CLI channel by default:
  - stable versions install `@latest`
  - `-beta.*` versions install `@beta`
  - `-rc.*` versions install `@rc`
- `--tag <tag-or-version>` overrides the inferred channel. Accept simple npm
  dist-tags or versions such as `latest`, `beta`, `rc`, or `0.6.0-beta.8`.
- `--dry-run` prints the exact npm command and exits without changing anything.

The implementation uses npm's configured global prefix even when the user
installed Node through pnpm, Homebrew, Volta, proto, or another manager.

### GitHub Release packages

The fork packer sets `trellisReleaseRepository` to a GitHub `owner/repository`
in the staged CLI manifest. For this package, `upgrade` and `upgrade --tag latest`
install `https://github.com/<repository>/releases/latest/download/trellis.tgz`
with `--prefer-online` so npm revalidates the mutable URL. An explicit release tag
installs `/releases/download/<tag>/trellis.tgz`. Use `npm_config_prefix` when the
fork was installed to a custom prefix.

`trellis update` prints the release page and skips the npm version lookup for
this package. Project version comparison still uses the CLI version.

Reject malformed repository names and tags before preparing the command. Unit
tests cover the default URL, the pinned URL, and rejection of shell metacharacters.
The release smoke test must also run `upgrade --dry-run` from the installed tarball
to verify the staged manifest is read. The npm registry behavior is the default
when the field is absent.

---

## Failure behavior

- If npm is unavailable, fail with the manual npm command.
- If npm exits non-zero, surface the exit code.
- If npm is interrupted by a signal, report the signal.
- Append troubleshooting guidance for npm global prefix / PATH mismatches,
  permissions, existing-bin or locked-file conflicts, and the manual command.
- Do not automatically run `sudo`, pass `--force`, rewrite npm prefix, delete
  files, or detect package managers.
- Reject shell-shaped `--tag` input before spawning npm. Never build a shell
  command string for POSIX execution.

## Success behavior

After npm reports success, print both:

```text
trellis --version
```

and a platform-specific binary-resolution check:

```text
which trellis   # POSIX
where trellis   # Windows
```

This catches the common case where npm installed into one global prefix while
the user's shell still resolves an older `trellis` binary earlier on PATH.

---

## Update hints

Any user-facing hint that previously said:

```text
npm install -g @mindfoldhq/trellis@latest
```

should now prefer:

```text
trellis upgrade
```

This applies to CLI startup warnings, `trellis update` downgrade guidance, and
session-start update hints.

---

## Test requirements

- Tag inference: stable → `latest`, beta → `beta`, RC → `rc`.
- Explicit tag override.
- Invalid tag rejection.
- POSIX direct npm command with `shell: false`.
- Windows `cmd.exe /d /s /c npm ...` command plan with `shell: false`.
- Dry-run does not spawn npm.
- Non-zero npm exit becomes a command failure with troubleshooting guidance.
