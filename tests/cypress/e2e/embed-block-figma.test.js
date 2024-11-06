/* eslint-disable no-undef */

describe('Figma Embed Block', () => {
	before(() => {
		cy.login(); // Assumes a custom login command is available
	});

	beforeEach(() => {
		// Navigate to the Block Editor
		cy.visit('/wp-admin/post-new.php');
		cy.get('.block-editor-writing-flow', { timeout: 10000 }).should('exist'); // Ensure editor loads
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
