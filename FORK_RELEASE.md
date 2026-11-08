# Personal Trellis releases

The [JLA97/Trellis releases](https://github.com/JLA97/Trellis/releases) carry a single installable npm tarball. It bundles the CLI, Codex templates, core from the same checkout, and production JavaScript dependencies. Installing it uses npm and Node.js 20 or later. Project hooks and task scripts still need Python 3.9 or later and Git.

## Install or update

```sh
npm install --global --prefer-online --prefix "$HOME/.local/trellis-fork" \
  https://github.com/JLA97/Trellis/releases/latest/download/trellis.tgz
export PATH="$HOME/.local/trellis-fork/bin:$PATH"
trellis --version
```

Use the same command for subsequent installs. If you set `npm_config_prefix` to the installation prefix, `trellis upgrade` can install the latest fork asset into that prefix. Use `trellis upgrade --tag <release-tag>` with the same prefix to reinstall a specific release. The CLI version follows upstream template compatibility. The GitHub release tag includes the fork revision.

## Cut a release

Push the commit to `JLA97/Trellis` and wait for branch CI. Then push a new tag
of the form `fork-v<package-version>-<revision>` on that tested `main` commit.
Use the exact version shared by the CLI and core manifests and the next positive
fork revision. Set `REVISION` to the next unused number for that version. The
CLI version stays aligned with the bundled Trellis templates.

```sh
git push origin main
# After CI passes, tag the tested main commit. Use the next unused revision.
version=$(node -p 'require("./packages/cli/package.json").version')
tag="fork-v${version}-${REVISION:?set REVISION to the next unused fork revision}"
git tag "$tag" origin/main
git push origin "refs/tags/$tag"
```

Fork branch pushes and release tags both pack `trellis.tgz`, write `SHA256SUMS`,
and test a fresh offline installation. On a release tag, the release job checks
the commit and assets, then publishes the draft as the latest GitHub Release. If publication
fails after upload, rerun the failed jobs within seven days to reuse the verified
build artifact and finish the draft. An existing
release with different or incomplete assets requires review before retrying.
Use a fresh revision for a different source commit.

To verify a published download, save both assets in the same directory and run
`shasum -a 256 -c SHA256SUMS`.

## Build and verify locally

From a clean checkout, use macOS or Linux with `tar` and the pnpm version in
the root `package.json`. Initialize submodules for the tests.

```sh
git submodule update --init --recursive
pnpm install --frozen-lockfile
pnpm lint && pnpm typecheck
out=$(mktemp -d)
node packages/cli/scripts/pack-fork-release.js JLA97/Trellis "$out"
pnpm test
```

Verify the artifact with a fresh prefix and cache. Run initialization in a new test project.

```sh
npm install --global --offline --ignore-scripts \
  --prefix "$out/install" --cache "$out/npm-cache" "$out/trellis.tgz"
git init -q "$out/project"
(
  cd "$out/project" &&
  "$out/install/bin/trellis" --version &&
  "$out/install/bin/tl" upgrade --dry-run &&
  "$out/install/bin/trellis" init --codex --yes --user smoke &&
  test -f .trellis/workflow.md &&
  test -f .codex/config.toml &&
  grep -Fq '".codex/config.toml"' .trellis/.template-hashes.json &&
  "$out/install/bin/trellis" update --dry-run
)
```

Expect the update dry run to report `Already up to date!`.
