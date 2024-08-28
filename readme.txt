=== Embed Block for Figma ===
Contributors:      10up, dkotter, jeffpaul
Tags:              gutenberg, figma, embed, blocks, custom blocks
Tested up to:      6.6
Stable tag:        0.2.0
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

= 0.2.0 - 2024-07-11 =

**Initial public plugin release. 🎉**

* **Changed:** Bump WordPress "tested up to" version 6.6 (props [@psorensen](https://github.com/psorensen), [@jeffpaul](https://github.com/jeffpaul) via [#21](https://github.com/10up/figma-block/pull/21)).
* **Changed:** Updated documentation (props [@jeffpaul](https://github.com/jeffpaul) via [#17](https://github.com/10up/figma-block/pull/17)).
* **Security:** Bump `braces` from 3.0.2 to 3.0.3 (props [@dependabot](https://github.com/apps/dependabot), [@psorensen](https://github.com/psorensen) via [#15](https://github.com/10up/figma-block/pull/15)).
* **Security:** Bump `ws` from 7.5.9 to 7.5.10 (props [@dependabot](https://github.com/apps/dependabot), [@psorensen](https://github.com/psorensen) via [#15](https://github.com/10up/figma-block/pull/15)).

= 0.1.0 - 2024-06-25 =

* Initial private plugin release.
