<?php
/**
 * Tests the provider name the oEmbed proxy returns for Figma URLs.
 *
 * @package FigmaBlock
 */

namespace FigmaBlock\Tests\Integration;

use WP_Error;
use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Tests the `/oembed/1.0/proxy` response the block editor previews from.
 *
 * The editor derives the embed block's provider from `provider_name`, so a
 * Figma URL has to come back as "Figma" or the block stops being the Figma
 * variation.
 */
class OembedProxyTest extends WP_UnitTestCase {

	/**
	 * Administrator user ID.
	 *
	 * @var int
	 */
	protected static $admin_id;

	/**
	 * Creates the administrator used by every test.
	 *
	 * @param \WP_UnitTest_Factory $factory Test factory.
	 */
	public static function wpSetUpBeforeClass( $factory ): void {
		self::$admin_id = $factory->user->create( array( 'role' => 'administrator' ) );
	}

	/**
	 * Logs in as an administrator and replaces outbound HTTP: YouTube's
	 * oEmbed endpoint gets a canned reply, everything else fails.
	 */
	public function set_up(): void {
		parent::set_up();

		wp_set_current_user( self::$admin_id );

		// The proxy reads the global script queue when it falls back to an
		// embed handler; a real request has it set up by then.
		wp_scripts();

		add_filter(
			'pre_http_request',
			static function ( $preempt, $args, $url ) {
				if ( 0 === strpos( $url, 'https://www.youtube.com/oembed' ) ) {
					return array(
						'headers'  => array( 'content-type' => 'application/json' ),
						'body'     => wp_json_encode(
							array(
								'type'          => 'video',
								'version'       => '1.0',
								'provider_name' => 'YouTube',
								'html'          => '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
							)
						),
						'response' => array(
							'code'    => 200,
							'message' => 'OK',
						),
						'cookies'  => array(),
					);
				}

				return new WP_Error( 'http_blocked', 'Outbound HTTP is blocked in tests.' );
			},
			10,
			3
		);
	}

	/**
	 * Requests a URL from the oEmbed proxy.
	 *
	 * @param string $url URL to embed.
	 * @return \WP_REST_Response Proxy response.
	 */
	private function proxy( string $url ) {
		$request = new WP_REST_Request( 'GET', '/oembed/1.0/proxy' );
		$request->set_param( 'url', $url );

		return rest_do_request( $request );
	}

	/**
	 * A Figma URL is rendered by the plugin's handler and labelled "Figma".
	 */
	public function test_figma_url_is_labelled_figma(): void {
		$response = $this->proxy( 'https://www.figma.com/file/nrPSsILSYjesyc5UHjYYa4?node-id=1-2' );
		$data     = $response->get_data();

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame( 'Figma', $data->provider_name );
		$this->assertStringContainsString( 'https://www.figma.com/embed?', $data->html );
	}

	/**
	 * Another provider's URL keeps that provider's name.
	 */
	public function test_other_provider_keeps_its_name(): void {
		$response = $this->proxy( 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame( 'YouTube', $response->get_data()->provider_name );
	}
}
