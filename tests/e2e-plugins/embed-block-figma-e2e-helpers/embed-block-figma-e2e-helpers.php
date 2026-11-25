<?php
/**
 * Plugin Name: Embed Block for Figma E2E Helpers
 * Description: Test-only support plugin for the E2E suite. Blocks outbound HTTP from the test site. Loaded only by .wp-env.test.json.
 * Version: 0.1.0
 *
 * @package FigmaBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fails every outbound HTTP request from the test site.
 *
 * Without this, core's oEmbed proxy first tries oEmbed discovery against the
 * Figma URL over the network and only falls back to the plugin's embed handler
 * when that fails. Blocking it keeps the editor preview on the plugin's handler
 * and the suite off the network.
 *
 * @param false|array|WP_Error $preempt Whether to preempt the request.
 * @param array                $args    Request arguments.
 * @param string               $url     Request URL.
 * @return WP_Error Error for every request.
 */
function embed_block_figma_e2e_block_http( $preempt, $args, $url ) {
	return new WP_Error( 'e2e_http_blocked', 'Outbound HTTP is blocked in E2E: ' . $url );
}
add_filter( 'pre_http_request', 'embed_block_figma_e2e_block_http', 10, 3 );
