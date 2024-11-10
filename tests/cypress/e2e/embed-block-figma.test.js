/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Figma Embed Block', () => {
	beforeEach(() => {
		cy.loginToWordPress();
		cy.createPost({ title: 'Figma Embed Example' });
		cy.insertBlock('Figma');
	});

	it('Displays the Figma Embed block', () => {
		cy.get('.wp-block-embed[data-title="Figma"]').should('exist').and('be.visible');
		cy.savePost();
	});

	it('Embeds a valid Figma URL', () => {
		const figmaUrl =
			'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs';
		cy.get('.wp-block-embed[data-title="Figma"] form input').type(figmaUrl, { force: true });
		cy.get('.wp-block-embed[data-title="Figma"] form').submit();

		// Verify Figma embed appears in editor
		cy.get('.wp-block-embed__wrapper').should('exist');

		// Publish and verify on front-end
		cy.savePost();
		cy.visit('/?p=1'); // Replace with actual post ID or URL if possible
		cy.get('.wp-block-embed__wrapper').should('exist');
	});
});
