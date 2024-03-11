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
	$n = function ( $function_name ) {
		return __NAMESPACE__ . "\\$function_name";
	};

	add_action( 'enqueue_block_assets', $n( 'blocks_styles' ) );

	register_blocks();
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
function blocks_styles() {}
