<?php
/**
 * Blocks setup
 *
 * @package FigmaBlock
 */

namespace FigmaBlock\Blocks;

/**
 * Set up blocks.
 */
function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\block_editor_assets' );

	// register_blocks();
}

/**
 * Registers blocks that are located within the src directory.
 */
function register_blocks() {
	$block_dist_path = FIGMA_BLOCK_DIST_PATH . 'blocks/block';

	if ( file_exists( $block_dist_path ) ) {
		register_block_type( $block_dist_path );
	}
}

/**
 * Enqueue JavaScript/CSS for blocks.
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
