# Embed Block for Figma

![Figma Block](https://github.com/10up/embed-block-figma/blob/develop/.wordpress-org/banner-1544x500.png)

[![Support Level](https://img.shields.io/badge/support-beta-blueviolet.svg)](#support-level) ![Required PHP Version](https://img.shields.io/wordpress/plugin/required-php/retro-winamp-block?label=Requires%20PHP) ![Required WP Version](https://img.shields.io/wordpress/plugin/wp-version/retro-winamp-block?label=Requires%20WordPress) ![WordPress tested up to version](https://img.shields.io/badge/WordPress-v6.5%20tested-success.svg) [![GPLv2 License](https://img.shields.io/github/license/10up/embed-block-figma.svg)](https://github.com/10up/embed-block-figma/blob/develop/LICENSE.md) [![Dependency Review](https://github.com/10up/embed-block-figma/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/10up/embed-block-figma/actions/workflows/dependency-review.yml) [![PHP Compatibility](https://github.com/10up/embed-block-figma/actions/workflows/php-compat.yml/badge.svg)](https://github.com/10up/embed-block-figma/actions/workflows/php-compat.yml) [![PHP Linting](https://github.com/10up/embed-block-figma/actions/workflows/phpcs.yml/badge.svg)](https://github.com/10up/embed-block-figma/actions/workflows/phpcs.yml) [![JS Linting](https://github.com/10up/embed-block-figma/actions/workflows/eslint.yml/badge.svg)](https://github.com/10up/embed-block-figma/actions/workflows/eslint.yml) [![WordPress Playground Demo](https://img.shields.io/github/v/release/10up/embed-block-figma?logo=wordpress&logoColor=FFFFFF&label=Playground%20Demo&labelColor=3858E9&color=3858E9)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/10up/embed-block-figma/trunk/.wordpress-org/blueprints/blueprint.json)

> A Figma Block for the WordPress block editor (Gutenberg).

## Features

* Embed a Figma file using a block in the WordPress editor.
* Paste a Figma URL on a new line in the Block Editor to automatically convert it to a Figma Embed block.
* Block settings allow for altering margins of rendered Figma file embed

![Screenshot of the rendered Figma Embed block in the editor / admin](.wordpress-org/screenshot-2.png)

## Requirements

* PHP 7.4+
* [WordPress](http://wordpress.org) 6.5+

## Installation

* You can install the plugin manually by [downloading a zip file](https://github.com/10up/embed-block-figma/releases/latest) from GitHub.
* You then need to upload the zip file to your WordPress site by going to *WP-Admin > Plugins > Add New > Upload Plugin* and selecting the zip file from your computer.

![Screenshot of the Figma Embed block settings prior to rendering in the editor / admin](.wordpress-org/screenshot-3.png)

## Getting Started

Once the plugin is installed and activated, you should see a new Figma Embed block. Insert this block into your content and enter the URL of the Figma file you want to embed.

![Screenshot of Figma Embed block with sample URL pre-embed](.wordpress-org/screenshot-1.png)

Assuming it's a valid URL, the block will automatically fetch the Figma file and display it in the editor. Once saved, this will also display on the front-end.

![Screenshot of the front-end rendering of the Figma Embed block](.wordpress-org/screenshot-4.png)

## Support Level

**Beta:** This project is quite new and we're not sure what our ongoing support level for this will be. Bug reports, feature requests, questions, and pull requests are welcome. If you like this project please let us know, but be cautious using this in a Production environment!

## Changelog

A complete listing of all notable changes to Embed Block for Figma are documented in [CHANGELOG.md](CHANGELOG.md).

## Contributing

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct, [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us, and [CREDITS.md](CREDITS.md) for a listing of maintainers, contributors, and libraries for Embed Block for Figma.

## Like what you see?

[![Work with us at 10up](https://10up.com/uploads/2016/10/10up-Github-Banner.png)](http://10up.com/contact/)
