=== Embed Block for Figma ===
Contributors:      10up, dkotter, jeffpaul
Tags:              gutenberg, figma, embed, blocks, custom blocks
Tested up to:      7.1
Stable tag:        0.4.0
License:           GPL-2.0-or-later
License URI:       https://spdx.org/licenses/GPL-2.0-or-later.html

Display Figma files using an Embed block.

== Description ==

* Embed a Figma file using a block in the WordPress editor.
* Paste a Figma URL on a new line in the Block Editor to automatically convert it to a Figma Embed block.
* Block settings allow for altering margins of rendered Figma file embed

== Screenshots ==

1. The Figma Embed block with sample URL pre-embed.
2. The rendered Figma Embed block in the editor / admin.
3. The Figma Embed block settings prior to rendering in the editor / admin.
4. Front-end rendering of the Figma Embed block.

== Getting Started ==

Once the plugin is installed and activated, you should see a new Figma Embed block. Insert this block into your content and enter the URL of the Figma file you want to embed.

Assuming it's a valid URL, the block will automatically fetch the Figma file and display it in the editor. Once saved, this will also display on the front-end.

== Changelog ==

= 0.4.0 - 2025-05-19 =

**Note that this release bumps the WordPress minimum version from 6.4 to 6.6.**

* **Changed:** Bump WordPress "tested up to" version 6.8 (props [@thrijith](https://github.com/thrijith), [@jeffpaul](https://github.com/jeffpaul) via [#42](https://github.com/10up/embed-block-figma/pull/42), [#43](https://github.com/10up/embed-block-figma/pull/43), [#48](https://github.com/10up/embed-block-figma/pull/48), [#49](https://github.com/10up/embed-block-figma/pull/49)).
* **Changed:** Bump WordPress "requires at least" version 6.6 (props [@thrijith](https://github.com/thrijith), [@jeffpaul](https://github.com/jeffpaul) via [#42](https://github.com/10up/embed-block-figma/pull/42), [#43](https://github.com/10up/embed-block-figma/pull/43), [#48](https://github.com/10up/embed-block-figma/pull/48), [#49](https://github.com/10up/embed-block-figma/pull/49)).
* **Changed:** Bump Support Level from `Beta` to `Stable` (props [@jeffpaul](https://github.com/jeffpaul), [@dkotter](https://github.com/dkotter) via [#52](https://github.com/10up/embed-block-figma/pull/52)).
* **Security:** Bump `express` from 4.21.1 to 4.21.2 (props [@dependabot](https://github.com/apps/dependabot), [@dkotter](https://github.com/dkotter) via [#47](https://github.com/10up/embed-block-figma/pull/47)).
* **Security:** Bump `body-parser` from 1.20.2 to 1.20.3 (props [@dependabot](https://github.com/apps/dependabot), [@iamdharmesh](https://github.com/iamdharmesh) via [#38](https://github.com/10up/embed-block-figma/pull/38)).
* **Security:** Bump `http-proxy-middleware` from 2.0.7 to 2.0.9 and `tar-fs` from 2.1.1 to 3.0.8 (props [@dependabot](https://github.com/apps/dependabot), [@dkotter](https://github.com/dkotter) via [#53](https://github.com/10up/embed-block-figma/pull/53)).

= 0.3.1 - 2024-09-05 =

**Initial plugin release on WordPress.org 🎉**

= 0.3.0 - 2024-08-29 =

* **Added:** WordPress.org Playground preview (props [@thrijith](https://github.com/thrijith), [@dkotter](https://github.com/dkotter), [@jeffpaul](https://github.com/jeffpaul) via [#29](https://github.com/10up/embed-block-figma/pull/29)).
* **Changed:** Updated plugin name from "Figma Block" to "Embed Block for Figma" (props [@thrijith](https://github.com/thrijith), [@dkotter](https://github.com/dkotter), [@jeffpaul](https://github.com/jeffpaul) via [#28](https://github.com/10up/embed-block-figma/pull/28), [#31](https://github.com/10up/embed-block-figma/pull/31)).
* **Security:** Bump `webpack` from 5.90.3 to 5.94.0 (props [@dependabot](https://github.com/apps/dependabot), [@dkotter](https://github.com/dkotter) via [#30](https://github.com/10up/embed-block-figma/pull/30)).

= 0.2.0 - 2024-07-11 =

**Initial public plugin release. 🎉**

* **Changed:** Bump WordPress "tested up to" version 6.6 (props [@psorensen](https://github.com/psorensen), [@jeffpaul](https://github.com/jeffpaul) via [#21](https://github.com/10up/embed-block-figma/pull/21)).
* **Changed:** Updated documentation (props [@jeffpaul](https://github.com/jeffpaul) via [#17](https://github.com/10up/embed-block-figma/pull/17)).
* **Security:** Bump `braces` from 3.0.2 to 3.0.3 (props [@dependabot](https://github.com/apps/dependabot), [@psorensen](https://github.com/psorensen) via [#15](https://github.com/10up/embed-block-figma/pull/15)).
* **Security:** Bump `ws` from 7.5.9 to 7.5.10 (props [@dependabot](https://github.com/apps/dependabot), [@psorensen](https://github.com/psorensen) via [#15](https://github.com/10up/embed-block-figma/pull/15)).

= 0.1.0 - 2024-06-25 =

* Initial private plugin release.

== Upgrade Notice ==

= 0.4.0 =
Note that this release bumps the WordPress minimum version from 6.4 to 6.6.
