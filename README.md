# ForexLab public website

A standalone, buildless English/Arabic website for the ForexLab research and paper-trading project. Static HTML, CSS, JavaScript and a local SVG icon only. No application backend, database, account interface, credentials, analytics, external fonts or market feed.

**Status: prepared and tested locally. Not uploaded or deployed.** Publication requires the owner's separate explicit authorization.

Repository: `https://github.com/fahem-ai-maker/forexlab-website`

Intended GitHub Pages address: `https://fahem-ai-maker.github.io/forexlab-website/`

## Local preview

From this folder, with Python installed:

```powershell
python -m http.server 8088 --bind 127.0.0.1 --directory .
```

Open `http://127.0.0.1:8088/`. Stop the server with Ctrl+C. No build, npm installation or application server is required. Relative links also support the GitHub Pages `/forexlab-website/` prefix. A static HTTP preview is recommended over opening files directly.

English HTML remains readable with JavaScript disabled. JavaScript enables Arabic/RTL switching, mobile navigation and an optional browser-local language preference. `?lang=en` and `?lang=ar` override the saved preference. No language preference is sent to a server by the website script.

## Exact files to publish

Copy these files to the **public repository root**, preserving the `assets` subdirectory. Do not publish the surrounding research workspace or nest the whole folder beneath the repository root.

```text
.nojekyll
README.md
index.html
about.html
features.html
contact.html
privacy.html
terms.html
assets/favicon.svg
assets/styles.css
assets/site.js
```

There are no other required files. The chart on the home page is explicitly an illustration, not market data or a performance result. The contact channel is the supplied public repository's issue tracker; issues are public and GitHub may require sign-in. No contact form or email address is invented.

## Publication — only after explicit owner authorization

The following is a future manual procedure. It has **not** been executed.

1. Use a new, separate local checkout of **only** `forexlab-website`. Never initialize or push the ForexLab research workspace as this public repository. Run these PowerShell commands from the workspace containing `public-website`, after confirming `.tools/forexlab-website-publish` does not already exist:

```powershell
git clone https://github.com/fahem-ai-maker/forexlab-website.git .tools/forexlab-website-publish
$siteFiles = @('.nojekyll','README.md','index.html','about.html','features.html','contact.html','privacy.html','terms.html')
foreach ($siteFile in $siteFiles) {
    Copy-Item -LiteralPath (Join-Path 'public-website' $siteFile) -Destination (Join-Path '.tools/forexlab-website-publish' $siteFile)
}
New-Item -ItemType Directory -Force -Path '.tools/forexlab-website-publish/assets' | Out-Null
$siteAssets = @('favicon.svg','styles.css','site.js')
foreach ($siteAsset in $siteAssets) {
    Copy-Item -LiteralPath (Join-Path 'public-website/assets' $siteAsset) -Destination (Join-Path '.tools/forexlab-website-publish/assets' $siteAsset)
}
git -C .tools/forexlab-website-publish status --short
git -C .tools/forexlab-website-publish remote -v
```

2. Review the checkout and confirm its remote is exactly the public website repository, with no private files or unrelated changes. Stage only the explicit public files, review the staged diff, then commit and push after approval:

```powershell
git -C .tools/forexlab-website-publish add -- .nojekyll README.md index.html about.html features.html contact.html privacy.html terms.html assets/favicon.svg assets/styles.css assets/site.js
git -C .tools/forexlab-website-publish diff --cached --stat
git -C .tools/forexlab-website-publish diff --cached
git -C .tools/forexlab-website-publish commit -m "Add ForexLab bilingual public website"
git -C .tools/forexlab-website-publish push origin HEAD:main
```

If Git reports branch divergence or permissions errors, stop and review; do not force-push or discard existing files. Existing unrelated repository contents are not deleted by these commands. Never put access tokens into commands, files or the website. Use your normal authorized Git credential mechanism.

3. In this repository's **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save. No custom domain, build workflow, backend or secrets are needed. If organization or account settings prevent branch publishing, resolve those settings with the owner rather than uploading private project files or changing targets.
4. Wait for GitHub's deployment result. Once published, open `https://fahem-ai-maker.github.io/forexlab-website/`. Test all six pages, English/Arabic switching, the mobile menu, local assets, contact link and legal pages. Do not claim deployment succeeded until the remote result is verified.

## Local validation performed

Chromium checks cover all six pages in English and Arabic at 390, 768 and 1440 px widths; navigation; RTL; language persistence and URL selection; mobile menu/Escape behavior; blocked browser storage; English fallback without JavaScript; and relative assets under `/forexlab-website/`. The test server and browser use local static files only, with no external requests. Exact test results and screenshots are held outside the publish folder in the local workspace's `.tools/website-validation/` directory.

The existing research application is not required for these checks and is unchanged. GitHub repository access, Pages configuration, deployment, external issue-tracker availability and real-device rendering have not been verified remotely. No regulatory approval, profitable strategy or verified live trading is claimed. Review the public content and contact channel before any later publication.
