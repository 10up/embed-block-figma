<?php
/**
 * Tests the default embed size for Figma URLs.
 *
 * @package FigmaBlock
 */

namespace FigmaBlock\Tests\Integration;

use WP_UnitTestCase;

/**
 * Tests the `embed_defaults` size the plugin sets.
 */
class EmbedDefaultsTest extends WP_UnitTestCase {

	/**
	 * Figma URLs default to 600x452 so the editor's aspect ratio classes
	 * apply; other hosts keep core's default size.
	 */
	public function test_figma_urls_default_to_figma_size_and_other_hosts_keep_core_default(): void {
		$figma_size = wp_embed_defaults( 'https://www.figma.com/file/nrPSsILSYjesyc5UHjYYa4?node-id=1-2' );
		$other_size = wp_embed_defaults( 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' );

		$this->assertSame(
			array(
				'width'  => 600,
				'height' => 452,
			),
			$figma_size,
			'Figma URLs must default to 600x452.'
		);

		// Core's own default, with no plugin filters.
		remove_all_filters( 'embed_defaults' );
		$core_size = wp_embed_defaults( 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' );

		$this->assertSame( $core_size, $other_size, 'Other hosts must keep core\'s default size.' );
	}
}
