/**
 * Admin: the plugin can be activated from the Plugins screen.
 */

/**
 * WordPress dependencies
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Admin', () => {
	// Leave the plugin active for later specs even if a step fails.
	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin( 'embed-block-for-figma' );
	} );

	test( 'activates the plugin when it is deactivated', async ( {
		admin,
		page,
		requestUtils,
	} ) => {
		// The row's slug depends on how the plugin was installed.
		const row = page.locator(
			'#the-list tr[data-slug^="embed-block-figma"]'
		);

		await requestUtils.deactivatePlugin( 'embed-block-for-figma' );
		await admin.visitAdminPage( 'plugins.php' );
		await row
			.getByRole( 'link', { name: 'Activate Embed Block for Figma' } )
			.click();

		await expect( page.getByText( 'Plugin activated.' ) ).toBeVisible();
		await expect(
			row.getByRole( 'link', {
				name: 'Deactivate Embed Block for Figma',
			} )
		).toBeVisible();
	} );
} );
