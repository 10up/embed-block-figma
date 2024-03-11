<?php
/**
 * Plugin Name:     Figma Block
 * Plugin URI:      https://10up.com
 * Description:     Adds a Figma embed block to the WordPress Block Editor.
 * Author:          10up
 * Author URI:      https://10up.com
 * Text Domain:     figma-block
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         FigmaBlock
 */

namespace FigmaBlock;

use TenUpToolkit;

// Useful global constants.
define( 'FIGMA_BLOCK_VERSION', '1.1.0' );
define( 'FIGMA_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'FIGMA_BLOCK_PATH', plugin_dir_path( __FILE__ ) );
define( 'FIGMA_BLOCK_INC', FIGMA_BLOCK_PATH . 'includes/' );
define( 'FIGMA_BLOCK_DIST_URL', FIGMA_BLOCK_URL . 'dist/' );
define( 'FIGMA_BLOCK_DIST_PATH', FIGMA_BLOCK_PATH . 'dist/' );

// Require Composer autoloader if it exists.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

$is_local_env = in_array( wp_get_environment_type(), [ 'local', 'development' ], true );
$is_local_url = strpos( home_url(), '.test' ) || strpos( home_url(), '.local' );
$is_local     = $is_local_env || $is_local_url;

if ( $is_local && file_exists( __DIR__ . '/dist/fast-refresh.php' ) ) {
	require_once __DIR__ . '/dist/fast-refresh.php';
	TenUpToolkit\set_dist_url_path( basename( __DIR__ ), FIGMA_BLOCK_DIST_URL, FIGMA_BLOCK_DIST_PATH );
}

if ( ! function_exists( 'glob_recursive' ) ) {
	/**
	 * Recursively glob for a file
	 *
	 * @param string $pattern Pattern to glob
	 * @param int    $flags Glob flags
	 * @return array
	 */
	function glob_recursive( $pattern, $flags = 0 ) {
		$files = glob( $pattern, $flags );

		foreach ( glob( dirname( $pattern ) . '/*', GLOB_ONLYDIR | GLOB_NOSORT ) as $dir ) {
			$files = array_merge( $files, glob_recursive( $dir . '/' . basename( $pattern ), $flags ) );
		}

		return $files;
	}
}

/**
 * Register blocks
 */
function register_blocks() {
	$blocks_dist_path = FIGMA_BLOCK_PATH . 'dist/blocks/';

	if ( file_exists( $blocks_dist_path ) ) {
		$block_json_files = glob_recursive( $blocks_dist_path . '**/*/block.json' );

		foreach ( $block_json_files as $filename ) {
			$block_folder = dirname( $filename );
			register_block_type( $block_folder );
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\register_blocks' );

/**
 * Load src modules/blocks
 */
$src_modules = glob( FIGMA_BLOCK_PATH . 'src/*/index.php' );

if ( ! empty( $src_modules ) ) {
	foreach ( $src_modules as $src_path ) {
		require_once $src_path;
	}
}
