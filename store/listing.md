# Store listing

Paste this into the Chrome Web Store and addons.mozilla.org dashboards. Upload `dist/princeps-0.1.0.zip` from `npm run pack`. The privacy policy is [PRIVACY.md](../PRIVACY.md). It needs a public URL before you submit. A GitHub link works only if this repository is public.

## Name

Princeps

## Summary

Unchecks the pre-selected Follow company box on LinkedIn Easy Apply. The box reads “Follow [company] to stay up to date with their page.” Unofficial, not affiliated with LinkedIn, and it does not fill out or submit applications.

## Description

Princeps unchecks one box.

On LinkedIn Easy Apply, the last step includes a checkbox that is selected by default: “Follow [company] to stay up to date with their page.” Princeps clears that checkbox when it appears, including when a later step selects it again.

Princeps does not fill in applications, click Submit, follow or unfollow pages, or change any other checkbox.

It runs only on linkedin.com. It does not read the page for any other purpose, and it does not store or send page content, account data, or browsing history.

Princeps is unofficial and is not affiliated with LinkedIn.

## Category

Productivity

## Permission justification

The content script is limited to linkedin.com so it can find the Easy Apply checkbox labeled “Follow [company] to stay up to date with their page” and uncheck it when it is selected. The extension does not store or transmit page content, and it does not request any other permission.

## Chrome privacy tab

- Data use: select none of the data-type checkboxes. The extension collects nothing.
- Remote code: No, I am not using remote code.
- Limited-use certifications: agree only to statements that match “collects nothing.” Do not certify that data is sold, used for advertising, or used for creditworthiness. There is no user data to limit.
- Privacy policy URL: a public link to PRIVACY.md.

## Firefox

`browser_specific_settings.gecko.data_collection_permissions.required` is `["none"]`. Do not declare any other collection. The add-on id is `princeps@dwwr.github.io` and must stay the same for updates.

## Screenshot

Capture one screenshot during a local test, after the follow box is unchecked. 1280×800 pixels, or 640×400. Square corners, no padding. Upload it in the dashboard. It is not part of the zip.

## Submit checklist

1. Create a Chrome Web Store developer account (one-time fee) and a free addons.mozilla.org account.
2. Load the folder unpacked in Chrome (`chrome://extensions`) and as a temporary add-on in Firefox (`about:debugging`), and confirm the Easy Apply follow box is cleared and other checkboxes are left alone.
3. Take the screenshot above.
4. Run `npm test`, then `npm run pack`.
5. Upload `dist/princeps-0.1.0.zip` to both stores.
6. Paste the name, summary, description, category, and permission justification. Set the privacy-policy URL.
7. On Chrome, justify the linkedin.com content script and certify that no data is collected and no remote code is used.
8. Submit. For a later update, bump `version` in `manifest.json` and pack again. Keep the Firefox id.
