<?php
/**
 * Tests the Figma embed handler.
 *
 * @package FigmaBlock
 */

namespace FigmaBlock\Tests\Integration;

use WP_UnitTestCase;

/**
 * Tests how Figma URLs are turned into embed markup.
 */
class EmbedHandlerTest extends WP_UnitTestCase {

	/**
	 * A Figma URL renders an iframe that loads Figma's embed endpoint with
	 * the original URL passed as a query argument.
	 */
	public function test_figma_url_renders_figma_embed_iframe(): void {
		global $wp_embed;

		$url = 'https://www.figma.com/file/nrPSsILSYjesyc5UHjYYa4?node-id=1-2';

		$html = $wp_embed->shortcode( array(), $url );

		$this->assertMatchesRegularExpression( '#^<iframe src="([^"]+)"#', $html );
		preg_match( '#^<iframe src="([^"]+)"#', $html, $matches );
		$src = html_entity_decode( $matches[1] );

		$this->assertStringStartsWith( 'https://www.figma.com/embed?', $src );

		wp_parse_str( wp_parse_url( $src, PHP_URL_QUERY ), $query );
		$this->assertSame( $url, $query['url'] );
	}
}
