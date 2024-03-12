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

		// add_filter( 'oembed_fetch_url', [ $this, 'filter_oembed_fetch_url' ] );
		// add_filter( 'pre_oembed_result', [ $this, 'filter_oembed_result' ] );
	}

	// /**
	//  * Filters the oEmbed URL to be fetched.
	//  *
	//  * @param string $provider URL of the oEmbed provider.
	//  * @return string URL of the oEmbed provider.
	//  */
	// public function filter_oembed_fetch_url( string $provider ): string {
	// 	if ( false === strpos( $provider, 'figma.com' ) ) {
	// 		return $provider;
	// 	}

	// 	$provider = add_query_arg( 'embed_host', get_bloginfo( 'name' ), $provider );
	// 	$provider = add_query_arg( 'embed_origin', home_url(), $provider );

	// 	return $provider;
	// }

	// public function filter_oembed_result() {
	// 	return '<div class="figma-embed">TEST</div>';
	// }

	/**
	 * Initializes the plugin.
	 */
	public function init() {
		wp_embed_register_handler(
			'figma',
			'#https:\/\/[\w\.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?#i',
			[ $this, 'figma_embed_handler' ]
		);

		Blocks\setup();
	}

	public function figma_embed_handler( array $matches, array $attr, string $url, array $rawattr ) {
		if ( ! isset( $matches[1] ) ) {
			return;
		}

		$url = sprintf(
			'https://www.figma.com/embed?embed_host=%1$s&embed_origin=%2$s&url=%3$s',
			esc_attr( get_bloginfo( 'name' ) ),
			esc_attr( home_url() ),
			esc_attr( $url )
		);

		$embed = sprintf(
			'<iframe src="%1$s" height="%2$spx" width="%3$spx" allowfullscreen />',
			esc_url( $url ),
			esc_attr( $attr['height'] ?? 450 ),
			esc_attr( $attr['width'] ?? 800 )
		);

		return $embed;
	}

	/**
	 * Load translations.
	 */
	public function i18n() {
		load_plugin_textdomain( 'figma-block', false, FIGMA_BLOCK_PATH . '/languages' );
	}
}
