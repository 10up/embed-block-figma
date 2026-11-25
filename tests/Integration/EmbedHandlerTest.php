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
	 *
	 * @dataProvider data_figma_urls
	 *
	 * @param string $url Figma URL to embed.
	 */
	public function test_figma_url_renders_figma_embed_iframe( string $url ): void {
		global $wp_embed;

		$html = $wp_embed->shortcode( array(), $url );

		$this->assertMatchesRegularExpression( '#^<iframe src="([^"]+)"#', $html );
		preg_match( '#^<iframe src="([^"]+)"#', $html, $matches );
		$src = html_entity_decode( $matches[1] );

		$this->assertStringStartsWith( 'https://www.figma.com/embed?', $src );

		wp_parse_str( wp_parse_url( $src, PHP_URL_QUERY ), $query );
		$this->assertSame( $url, $query['url'] );
	}

	/**
	 * Figma URL forms that must keep embedding.
	 *
	 * @return array<string, array{0: string}>
	 */
	public static function data_figma_urls(): array {
		return array(
			'file with node-id'      => array( 'https://www.figma.com/file/nrPSsILSYjesyc5UHjYYa4?node-id=1-2' ),
			'design with file name'  => array( 'https://www.figma.com/design/nrPSsILSYjesyc5UHjYYa4/Project-Name?node-id=1-2' ),
			'embed.figma.com design' => array( 'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs' ),
		);
	}

	/**
	 * A URL on another host is left for core's other embed handlers and
	 * oEmbed providers.
	 *
	 * @dataProvider data_non_figma_urls
	 *
	 * @param string $url Non-Figma URL.
	 */
	public function test_non_figma_url_is_not_handled( string $url ): void {
		global $wp_embed;

		$this->assertFalse( $wp_embed->get_embed_handler_html( array(), $url ) );
	}

	/**
	 * URLs that are not on a Figma host.
	 *
	 * @return array<string, array{0: string}>
	 */
	public static function data_non_figma_urls(): array {
		return array(
			'youtube video'                 => array( 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' ),
			'other host with figma path'    => array( 'https://example.com/file/nrPSsILSYjesyc5UHjYYa4' ),
			'figma.com as a subdomain'      => array( 'https://www.figma.com.example.com/file/nrPSsILSYjesyc5UHjYYa4' ),
			'figma.com as a path component' => array( 'https://example.com/figma.com/file/nrPSsILSYjesyc5UHjYYa4' ),
		);
	}
}
