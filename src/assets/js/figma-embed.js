/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { IconColor } from './icon';

registerBlockVariation('core/embed', {
	name: 'figma',
	title: 'Figma',
	description: __('Embed Figma designs.', 'embed-block-figma'),
	icon: { src: IconColor, foreground: 'transparent' },
	patterns: [/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/i],
	attributes: {
		providerNameSlug: 'figma',
		responsive: true,
	},
	isActive: (attributes) => attributes.providerNameSlug === 'figma',
});
