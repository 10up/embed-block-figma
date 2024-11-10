/* eslint-disable no-undef */

describe('Figma Embed Block', () => {
	before(() => {
		cy.login(); // Custom login command, if available
	});

	beforeEach(() => {
		// Navigate to the Block Editor and ensure it fully loads
		cy.visit('/wp-admin/post-new.php');
		cy.url().should('include', '/post-new.php');

		// Wait for the Block Editor to load completely
		cy.wait(5000); // Add a slight delay
		cy.get('body').should('not.have.class', 'is-loading'); // Check if editor is ready

		// Check for the presence of block editor with alternative selector
		cy.get('div[role="region"] .block-editor-writing-flow', { timeout: 20000 }).should('exist');
	});

	it('should add Figma Embed block and verify embedding a Figma URL', () => {
		// Open block inserter
		cy.get('.block-editor-inserter__toggle', { timeout: 10000 }).should('be.visible').click();
		cy.get('.block-editor-inserter__search input[type="search"]').type('Figma Embed', {
			force: true,
		});

		// Select Figma Embed Block
		cy.get('.editor-block-list-item-embed/figma').click();

		// Enter a valid Figma URL
		const figmaUrl =
			'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs';
		cy.get('.wp-block-embed[data-title="Figma"] form input').type(figmaUrl, { force: true });
		cy.get('.wp-block-embed[data-title="Figma"] form').submit();

		// Verify embed in editor
		cy.get('.wp-block-embed__wrapper', { timeout: 10000 }).should('exist');

		// Save post
		cy.get('.editor-post-publish-button').click();
		cy.get('.editor-post-publish-panel__header-publish-button').click();

		// Verify Figma embed on front-end
		cy.visit('/?p=1'); // Replace with actual post URL/ID
		cy.get('.wp-block-embed__wrapper').should('exist');
	});
});
