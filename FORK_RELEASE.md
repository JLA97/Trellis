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

From a clean checkout of the commit to publish, use macOS or Linux with the pnpm version in the root `package.json`. Initialize submodules for the upstream tests.

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

Use a fresh tag of the form `fork-v<upstream-version>-<revision>`. Push the tested commit and tag to the fork and attach the tarball and its checksum.

```sh
tag=fork-v0.6.17-1  # Set the version and next revision for this release.
(cd "$out" && shasum -a 256 trellis.tgz > SHA256SUMS)
git tag "$tag"
git push --atomic origin HEAD:refs/heads/main "refs/tags/$tag"
gh release create "$tag" "$out/trellis.tgz" "$out/SHA256SUMS" \
  --repo JLA97/Trellis --verify-tag --latest --title "$tag" --generate-notes
```
