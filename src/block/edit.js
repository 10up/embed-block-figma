/**
 * Internal dependencies
 */
import {
	removeAspectRatioClasses,
	fallback,
	getMergedAttributesWithPreview,
} from './util';
import EmbedControls from './embed-controls';
import EmbedLoading from './embed-loading';
import EmbedPlaceholder from './embed-placeholder';
import EmbedPreview from './embed-preview';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { View } from '@wordpress/primitives';

const BlockEdit = (props) => {
	const { attributes, setAttributes, onFocus } = props;
	const { url: attributesUrl } = attributes;

	const [ url, setURL ] = useState( attributesUrl );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const { invalidateResolution } = useDispatch( coreStore );

	const { preview, fetching, themeSupportsResponsive, cannotEmbed } =
		useSelect(
			( select ) => {
				const {
					getEmbedPreview,
					isPreviewEmbedFallback,
					isRequestingEmbedPreview,
					getThemeSupports,
				} = select( coreStore );
				if ( ! attributesUrl ) {
					return { fetching: false, cannotEmbed: false };
				}

				const embedPreview = getEmbedPreview( attributesUrl );
				const previewIsFallback =
					isPreviewEmbedFallback( attributesUrl );

				// The external oEmbed provider does not exist. We got no type info and no html.
				const badEmbedProvider =
					embedPreview?.html === false &&
					embedPreview?.type === undefined;
				// Some WordPress URLs that can't be embedded will cause the API to return
				// a valid JSON response with no HTML and `data.status` set to 404, rather
				// than generating a fallback response as other embeds do.
				const wordpressCantEmbed = embedPreview?.data?.status === 404;
				const validPreview =
					!! embedPreview &&
					! badEmbedProvider &&
					! wordpressCantEmbed;
				return {
					preview: validPreview ? embedPreview : undefined,
					fetching: isRequestingEmbedPreview( attributesUrl ),
					themeSupportsResponsive:
						getThemeSupports()[ 'responsive-embeds' ],
					cannotEmbed: ! validPreview || previewIsFallback,
				};
			},
			[ attributesUrl ]
		);

	/**
	 * Returns the attributes derived from the preview, merged with the current attributes.
	 *
	 * @return {Object} Merged attributes.
	 */
	const getMergedAttributes = () =>
		getMergedAttributesWithPreview(
			attributes,
			preview,
			title,
			responsive
		);

	useEffect( () => {
		if ( preview?.html || ! cannotEmbed || fetching ) {
			return;
		}

		// At this stage, we're not fetching the preview and know it can't be embedded,
		// so try removing any trailing slash, and resubmit.
		const newURL = attributesUrl.replace( /\/$/, '' );
		setURL( newURL );
		setIsEditingURL( false );
		setAttributes( { url: newURL } );
	}, [ preview?.html, attributesUrl, cannotEmbed, fetching, setAttributes ] );

	const blockProps = useBlockProps();

	if ( fetching ) {
		return (
			<View { ...blockProps }>
				<EmbedLoading />
			</View>
		);
	}

	// No preview, or we can't embed the current URL, or we've clicked the edit button.
	const showEmbedPlaceholder = ! preview || cannotEmbed || isEditingURL;

	if ( showEmbedPlaceholder ) {
		return (
			<View { ...blockProps }>
				<EmbedPlaceholder
					// icon={ icon }
					// label={ label }
					onFocus={ onFocus }
					onSubmit={ ( event ) => {
						if ( event ) {
							event.preventDefault();
						}

						// If the embed URL was changed, we need to reset the aspect ratio class.
						// To do this we have to remove the existing ratio class so it can be recalculated.
						const blockClass = removeAspectRatioClasses(
							attributes.className
						);

						setIsEditingURL( false );
						setAttributes( { url, className: blockClass } );
					} }
					value={ url }
					cannotEmbed={ cannotEmbed }
					onChange={ ( event ) => setURL( event.target.value ) }
					fallback={ () => fallback( url, onReplace ) }
					tryAgain={ () => {
						invalidateResolution( 'getEmbedPreview', [ url ] );
					} }
				/>
			</View>
		);
	}

	// Even though we set attributes that get derived from the preview,
	// we don't access them directly because for the initial render,
	// the `setAttributes` call will not have taken effect. If we're
	// rendering responsive content, setting the responsive classes
	// after the preview has been rendered can result in unwanted
	// clipping or scrollbars. The `getAttributesFromPreview` function
	// that `getMergedAttributes` uses is memoized so that we're not
	// calculating them on every render.
	const {
		caption,
		type,
		allowResponsive,
		className: classFromPreview,
	} = getMergedAttributes();
	const className = classnames( classFromPreview, props.className );

	return (
		<>
			<EmbedControls
				showEditButton={ preview && ! cannotEmbed }
				themeSupportsResponsive={ themeSupportsResponsive }
				blockSupportsResponsive={ responsive }
				allowResponsive={ allowResponsive }
				toggleResponsive={ toggleResponsive }
				switchBackToURLInput={ () => setIsEditingURL( true ) }
			/>
			<View { ...blockProps }>
				<EmbedPreview
					preview={ preview }
					previewable={ previewable }
					className={ className }
					url={ url }
					type={ type }
					caption={ caption }
					onCaptionChange={ ( value ) =>
						setAttributes( { caption: value } )
					}
					isSelected={ isSelected }
					// icon={ icon }
					// label={ label }
					insertBlocksAfter={ insertBlocksAfter }
				/>
			</View>
		</>
	);
};

export default BlockEdit;
