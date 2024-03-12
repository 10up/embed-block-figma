<?php
/**
 * Plugin class
 *
 * @package FigmaBlock
 */

namespace FigmaBlock;

/**
 * Main plugin class
 */
class Plugin {

	/**
	 * Plugin singleton instance.
	 *
	 * @var Plugin $instance Plugin Singleton instance
	 */
	public static $instance = null;

	/**
	 * Lazy initialize the plugin.
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new Plugin();
		}

		return self::$instance;
	}

	/**
	 * Setup needed hooks.
	 */
	public function enable() {
		add_action( 'init', [ $this, 'init' ], 20 );
		add_action( 'init', [ $this, 'i18n' ] );
	}

	/**
	 * Initializes the plugin.
	 */
	public function init() {
		Block\setup();
	}

	/**
	 * Load translations.
	 */
	public function i18n() {
		load_plugin_textdomain( 'figma-block', false, FIGMA_BLOCK_PATH . '/languages' );
	}
}
