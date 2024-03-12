/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';

/**
 * WordPress dependencies
 */
import { renderToString } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Removes all previously set aspect ratio related classes and return the rest
 * existing class names.
 *
 * @param {string} existingClassNames Any existing class names.
 * @return {string} The class names without any aspect ratio related class.
 */
export const removeAspectRatioClasses = ( existingClassNames ) => {
	if ( ! existingClassNames ) {
		// Avoids extraneous work and also, by returning the same value as
		// received, ensures the post is not dirtied by a change of the block
		// attribute from `undefined` to an emtpy string.
		return existingClassNames;
	}
	const aspectRatioClassNames = ASPECT_RATIOS.reduce(
		( accumulator, { className } ) => {
			accumulator[ className ] = false;
			return accumulator;
		},
		{ 'wp-has-aspect-ratio': false }
	);
	return classnames( existingClassNames, aspectRatioClassNames );
};

/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {Function} onReplace Function to call with the created fallback block.
 */
export function fallback( url, onReplace ) {
	const link = <a href={ url }>{ url }</a>;
	onReplace(
		createBlock( 'core/paragraph', { content: renderToString( link ) } )
	);
}

/**
 * Returns the attributes derived from the preview, merged with the current attributes.
 *
 * @param {Object}  currentAttributes The current attributes of the block.
 * @param {Object}  preview           The preview data.
 * @param {string}  title             The block's title, e.g. Twitter.
 * @param {boolean} isResponsive      Boolean indicating if the block supports responsive content.
 * @return {Object} Merged attributes.
 */
export const getMergedAttributesWithPreview = (
	currentAttributes,
	preview,
	title,
	isResponsive
) => {
	const { allowResponsive, className } = currentAttributes;

	return {
		...currentAttributes,
		...getAttributesFromPreview(
			preview,
			title,
			className,
			isResponsive,
			allowResponsive
		),
	};
};
