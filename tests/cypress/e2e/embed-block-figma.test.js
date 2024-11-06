/* eslint-disable no-undef */

describe('Figma Embed Block', () => {
	before(() => {
		cy.login();
	});

	beforeEach(() => {
		cy.visit('/wp-admin/post-new.php');
	});

	it('should add Figma Embed block and verify embedding a Figma URL', () => {
		cy.get('.block-editor-inserter__toggle').click();
		cy.get('.block-editor-inserter__search input[type="search"]').type('Figma Embed');
		cy.get('.editor-block-list-item-embed/figma').click();

		const figmaUrl = 'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs';
		cy.get('.wp-block-embed[data-title="Figma"] form input').type(figmaUrl);
		cy.get('.wp-block-embed[data-title="Figma"] form').submit();

		cy.get('.wp-block-embed__wrapper').should('exist');

		cy.get('.editor-post-publish-button').click();
		cy.get('.editor-post-publish-button').click();

		cy.url().then((postUrl) => {
			cy.visit(postUrl);
			cy.get('.wp-block-embed__wrapper').should('exist');
		});
	});
});
