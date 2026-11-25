/**
 * Editor: the Figma embed variation can be inserted and previews a Figma URL,
 * and a pasted Figma URL becomes that variation.
 */

/**
 * WordPress dependencies
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Figma embed block', () => {
	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllPosts();
	} );

	test( 'embeds a Figma URL in the editor', async ( {
		admin,
		editor,
		page,
	} ) => {
		await admin.createNewPost( { title: 'Figma Embed' } );

		// Insert through the slash inserter so the Figma variation itself
		// must be registered: `core/embed/figma` isn't a block name.
		// By label, not role: the empty-post appender is a button in released
		// WordPress and a document (a real empty paragraph) since Gutenberg
		// PR #81231.
		await editor.canvas
			.getByLabel( 'Add default block', { exact: true } )
			.click();
		await page.keyboard.type( '/figma' );
		await expect(
			page.getByRole( 'option', { name: 'Figma', exact: true } )
		).toBeVisible();
		await page.keyboard.press( 'Enter' );

		const block = editor.canvas.locator(
			'.wp-block-embed[data-title="Figma"]'
		);
		await block
			.getByRole( 'textbox' )
			.fill(
				'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs'
			);
		await block.getByRole( 'button', { name: 'Embed' } ).click();

		await expect(
			block.locator( '.wp-block-embed__wrapper iframe' )
		).toHaveAttribute( 'title', /figma\.com/ );
	} );

	test( 'turns a pasted Figma URL into the Figma embed block', async ( {
		admin,
		editor,
		pageUtils,
	} ) => {
		const url =
			'https://www.figma.com/design/nrPSsILSYjesyc5UHjYYa4/Project-Name?node-id=1-2';

		await admin.createNewPost( { title: 'Figma Paste' } );
		await editor.canvas
			.getByLabel( 'Add default block', { exact: true } )
			.click();
		pageUtils.setClipboardData( { plainText: url } );
		await pageUtils.pressKeys( 'primary+v' );

		await expect(
			editor.canvas.locator( '.wp-block-embed[data-title="Figma"]' )
		).toBeVisible();
		// The preview's provider name alone labels the block "Figma", so also
		// check `responsive`: only the variation sets it, and core applies the
		// variation only when the URL matches its paste pattern (on paste in
		// newer WordPress, after the preview in older releases).
		await expect
			.poll( () => editor.getBlocks() )
			.toMatchObject( [
				{
					name: 'core/embed',
					attributes: {
						url,
						providerNameSlug: 'figma',
						responsive: true,
					},
				},
			] );
	} );
} );
