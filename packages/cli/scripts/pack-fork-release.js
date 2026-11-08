import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  linkSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [repository, destination] = process.argv.slice(2);
if (!repository || !/^[a-z\d][a-z\d-]*\/[a-z\d][a-z\d_.-]*$/i.test(repository) || !destination) {
  console.error("Usage: node packages/cli/scripts/pack-fork-release.js <owner/repo> <output-directory>");
  process.exit(1);
}

const root = fileURLToPath(new URL("../../../", import.meta.url));
const outputDirectory = resolve(destination);
mkdirSync(outputDirectory, { recursive: true });
const stagingDirectory = mkdtempSync(join(outputDirectory, ".trellis-pack-"));
const deployment = join(stagingDirectory, "package");

try {
  execFileSync("pnpm", ["build"], { cwd: root, stdio: "inherit" });
  execFileSync("pnpm", [
    "--config.inject-workspace-packages=true",
    "--config.node-linker=hoisted",
    "--filter", "@mindfoldhq/trellis",
    "deploy", "--prod", deployment,
  ], { cwd: root, stdio: "inherit", env: { ...process.env, HUSKY: "0" } });

  const manifestPath = join(deployment, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  // Deploy can encode workspace paths and peer suffixes in its manifest.
  for (const name of Object.keys(manifest.dependencies)) {
    const installed = JSON.parse(
      readFileSync(join(deployment, "node_modules", name, "package.json"), "utf8"),
    );
    manifest.dependencies[name] = installed.version;
  }
  manifest.name = `@${repository.split("/")[0].toLowerCase()}/trellis`;
  manifest.repository.url = `https://github.com/${repository}.git`;
  manifest.trellisReleaseRepository = repository;
  manifest.engines.node = ">=20";
  manifest.private = true;
  manifest.bundleDependencies = true;
  manifest.files.push("COPYRIGHT");
  delete manifest.devDependencies;
  delete manifest.publishConfig;
  delete manifest.scripts;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  copyFileSync(join(root, "FORK_RELEASE.md"), join(deployment, "README.md"));
  for (const file of ["COPYRIGHT", "LICENSE"]) {
    copyFileSync(join(root, file), join(deployment, file));
  }

  // The hoisted production tree already contains every bundled dependency.
  // Archive it directly to avoid asking npm pack to resolve the tree again.
  const archive = join(stagingDirectory, "trellis.tgz");
  execFileSync("tar", [
    "-czf", archive,
    "--exclude=*/node_modules/.bin",
    "--exclude=*/node_modules/.pnpm",
    "--exclude=*/node_modules/.modules.yaml",
    "-C", stagingDirectory,
    "package/package.json",
    ...manifest.files.map((file) => `package/${file}`),
    "package/node_modules",
  ], { stdio: "inherit", env: { ...process.env, COPYFILE_DISABLE: "1" } });
  const artifact = join(outputDirectory, "trellis.tgz");
  linkSync(archive, artifact);
  console.log(artifact);
} finally {
  rmSync(stagingDirectory, { recursive: true, force: true });
}
