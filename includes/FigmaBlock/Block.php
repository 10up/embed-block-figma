<?php
/**
 * Block setup
 *
 * @package FigmaBlock
 */

namespace FigmaBlock\Block;

/**
 * Set up needed hooks.
 */
function setup() {
	wp_embed_register_handler(
		'figma',
		'#https:\/\/[\w\.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?#i',
		__NAMESPACE__ . '\\embed_handler'
	);

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\block_editor_assets' );
}

/**
 * Register the embed handler.
 *
 * @param array  $matches The RegEx matches.
 * @param array  $attr The attributes.
 * @param string $url The URL.
 * @return string|bool
 */
function embed_handler( array $matches, array $attr, string $url ) {
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
		'<iframe src="%1$s" height="%2$spx" width="%3$spx" allowfullscreen />',
		esc_url( $url ),
		esc_attr( $attr['height'] ?? 450 ),
		esc_attr( $attr['width'] ?? 800 )
	);

	return $embed;
}

/**
 * Enqueue any needed block assets.
 */
function block_editor_assets() {
	$js_asset = require_once FIGMA_BLOCK_DIST_PATH . 'js/figma-embed.asset.php';

	wp_enqueue_script(
		'figma-embed-block',
		FIGMA_BLOCK_DIST_URL . 'js/figma-embed.js',
		$js_asset['dependencies'],
		$js_asset['version'],
		false
	);
}
