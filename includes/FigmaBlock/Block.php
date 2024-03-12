<?php
/**
 * Block setup
 *
 * @package FigmaBlock
 */

namespace FigmaBlock;

/**
 * Block class.
 */
class Block {

	/**
	 * Set up needed hooks.
	 */
	public function setup() {
		wp_embed_register_handler(
			'figma',
			'#https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?#i',
			[ $this, 'embed_handler' ]
		);

		add_action( 'enqueue_block_editor_assets', [ $this, 'block_editor_assets' ] );
		add_filter( 'rest_request_after_callbacks', [ $this, 'filter_rest_request_after_callbacks' ], 10, 3 );
	}

	/**
	 * Register the embed handler.
	 *
	 * @param array  $matches The RegEx matches.
	 * @param array  $attr The attributes.
	 * @param string $url The URL.
	 * @return string|bool
	 */
	public function embed_handler( array $matches, array $attr, string $url ) {
		// Ensure we have a matched ID.
		if ( ! isset( $matches[1] ) ) {
			return false;
		}

		// Build the Figma embed URL.
		$url = sprintf(
			'https://www.figma.com/embed?embed_host=%1$s&embed_origin=%2$s&url=%3$s',
			esc_attr( rawurlencode( get_bloginfo( 'name' ) ) ),
			esc_attr( rawurlencode( home_url() ) ),
			esc_attr( rawurlencode( $url ) )
		);

		// Build the embed iframe.
		$embed = sprintf(
			'<iframe src="%1$s" height="%2$d" width="%3$d" frameborder="0" allowfullscreen></iframe>',
			esc_url( $url ),
			esc_attr( $attr['height'] ?? 450 ),
			esc_attr( $attr['width'] ?? 800 )
		);

		return $embed;
	}

	/**
	 * Enqueue any needed block assets.
	 */
	public function block_editor_assets() {
		$js_asset = require_once FIGMA_BLOCK_DIST_PATH . 'js/figma-embed.asset.php';

		wp_enqueue_script(
			'figma-embed-block',
			FIGMA_BLOCK_DIST_URL . 'js/figma-embed.js',
			$js_asset['dependencies'],
			$js_asset['version'],
			false
		);
	}

	/**
	 * Filters the response after executing any REST API callbacks.
	 *
	 * We do this so we can change the embed handler from the default to our
	 * custom Figma one.
	 *
	 * @param \WP_REST_Response|\WP_HTTP_Response|\WP_Error|mixed $response Result to send to the client.
	 * @param array                                               $handler  Route handler used for the request.
	 * @param \WP_REST_Request                                    $request  Request used to generate the response.
	 * @return \WP_REST_Response|\WP_HTTP_Response|\WP_Error|mixed Result to send to the client.
	 */
	public function filter_rest_request_after_callbacks( $response, array $handler, \WP_REST_Request $request ) {
		// Only run this on the oEmbed proxy endpoint.
		if ( strpos( $request->get_route(), '/oembed/1.0/proxy' ) === false ) {
			return $response;
		}

		$params = $request->get_params();

		// Ensure we have a Figma URL.
		if ( ! isset( $params['url'] ) || strpos( $params['url'], 'figma.com' ) === false ) {
			return $response;
		}

		// Set the proper provider name.
		if ( is_object( $response ) && isset( $response->provider_name ) ) {
			$response->provider_name = 'Figma';
		}

		return $response;
	}
}
