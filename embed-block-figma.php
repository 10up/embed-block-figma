<?php
/**
 * Plugin Name:       Embed Block for Figma
 * Plugin URI:        https://github.com/10up/embed-block-figma
 * Description:       Adds a Figma embed block to the WordPress Block Editor.
 * Version:           0.2.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            10up
 * Author URI:        https://10up.com
 * License:           GPL-2.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-2.0-or-later.html
 * Text Domain:       embed-block-figma
 * Domain Path:       /languages
 *
 * @package FigmaBlock
 */

namespace FigmaBlock;

use function TenUpToolkit\set_dist_url_path;

// Useful global constants.
define( 'FIGMA_BLOCK_VERSION', '0.2.0' );
define( 'FIGMA_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'FIGMA_BLOCK_PATH', plugin_dir_path( __FILE__ ) );
define( 'FIGMA_BLOCK_INC', FIGMA_BLOCK_PATH . 'includes/' );
define( 'FIGMA_BLOCK_DIST_URL', FIGMA_BLOCK_URL . 'dist/' );
define( 'FIGMA_BLOCK_DIST_PATH', FIGMA_BLOCK_PATH . 'dist/' );

/**
 * Get the minimum version of PHP required by this plugin.
 *
 * @return string Minimum version required.
 */
function minimum_php_requirement() {
	return '7.4';
}

/**
 * Whether PHP installation meets the minimum requirements
 *
 * @return bool True if meets minimum requirements, false otherwise.
 */
function site_meets_php_requirements() {
	return version_compare( phpversion(), minimum_php_requirement(), '>=' );
}

// Ensuring our PHP version requirement is met first before loading plugin.
if ( ! site_meets_php_requirements() ) {
	add_action(
		'admin_notices',
		function () {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					echo wp_kses_post(
						sprintf(
							/* translators: %s: Minimum required PHP version */
							__( 'The Embed Block for Figma plugin requires PHP version %s or later. Please upgrade PHP or disable the plugin.', 'embed-block-figma' ),
							esc_html( minimum_php_requirement() )
						)
					);
					?>
				</p>
			</div>
			<?php
		}
	);
	return;
}

// Require Composer autoloader if it exists.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
} else {
	add_action(
		'admin_notices',
		function () {
			$message = __( 'Error: Please run $ composer install in the Embed Block for Figma plugin directory.', 'embed-block-figma' );
			printf( '<div class="%1$s"><p>%2$s</p></div>', 'notice notice-error', esc_html( $message ) );
			error_log( esc_html( $message ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		}
	);
	return;
}

$is_local_env = in_array( wp_get_environment_type(), [ 'local', 'development' ], true );
$is_local_url = strpos( home_url(), '.test' ) || strpos( home_url(), '.local' );
$is_local     = $is_local_env || $is_local_url;

if ( $is_local && file_exists( __DIR__ . '/dist/fast-refresh.php' ) && function_exists( '\TenUpToolkit\set_dist_url_path' ) ) {
	require_once __DIR__ . '/dist/fast-refresh.php';
	set_dist_url_path( basename( __DIR__ ), FIGMA_BLOCK_DIST_URL, FIGMA_BLOCK_DIST_PATH );
}

$plugin = Plugin::get_instance();
$plugin->enable();
