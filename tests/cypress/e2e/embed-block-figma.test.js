/* eslint-disable no-undef */

describe('Figma Embed Block', () => {
	before(() => {
		cy.login();
	});

	beforeEach(() => {
		// Navigate to the Block Editor
		cy.visit('/wp-admin/post-new.php');
	});

	it('should add Figma Embed block and verify embedding a Figma URL', () => {
		// Add the Figma Embed Block
		cy.get('.block-editor-inserter__toggle').click();
		cy.get('.block-editor-inserter__search-input').type('Figma Embed');
		cy.contains('Figma Embed').click();

		// Enter a valid Figma URL in the block
		const figmaUrl =
			'https://www.figma.com/proto/ToHUf6DPOXqPLkZ5LOglFl/Sample-Embed?node-id=1%3A2&scaling=scale-down';
		cy.get('input[placeholder="Enter Figma URL"]').type(figmaUrl);

		// Verify that the block fetches and displays the Figma file in the editor
		cy.get('.figma-embed-preview').should('exist');

		// Save the post
		cy.get('.editor-post-publish-button').click();
		cy.get('.editor-post-publish-panel__header-publish-button').click();

		// Verify Figma embed appears on the front-end
		cy.visit('/?p=1'); // Replace with the post URL or ID
		cy.get('.figma-embed').should('exist');
	});
});
