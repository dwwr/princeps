# princeps

Princeps (n., latin): prince, chief, first & foremost, first among many, not a follower.

LinkedIn Easy Apply postings almost always pre-check "Follow [company] to stay up to date with their page." How much time have you already wasted unchecking that box again & again? How many of those postings are ghost jobs, collecting followers for their company pages?

This extension automatically unchecks that box.

The job applicant is princeps, first among many. They are not a free follower.

<img width="485" height="416" alt="Screenshot 2026-11-22 at 10 51 44 AM" src="https://github.com/user-attachments/assets/89ea101a-61a0-4a70-8ed6-63080eec936c" />


## Load locally

The extension is the folder itself. There is no build.

Chrome:

1. Open `chrome://extensions`.
2. Turn on Developer mode.
3. Choose Load unpacked and select this folder.

Firefox:

1. Open `about:debugging#/runtime/this-firefox`.
2. Choose Load Temporary Add-on.
3. Select `manifest.json` in this folder.

Open an Easy Apply flow. The follow box should be cleared, and other checkboxes should stay as they are.

Firefox drops a temporary add-on when you quit the browser, so load `manifest.json` again next time. Chrome keeps an unpacked extension installed.

## Pack for the stores

```sh
npm test
npm run pack
```

`npm run pack` writes `dist/princeps-0.1.0.zip` with `manifest.json`, `src/content.js`, `icons/`, and `LICENSE`. That zip is the package for both the Chrome Web Store and addons.mozilla.org, and it is the source Firefox reviews.

Listing text, the privacy answers, and the submit checklist are in [store/listing.md](store/listing.md). The privacy policy is [PRIVACY.md](PRIVACY.md). Put it at a public URL before you submit.
