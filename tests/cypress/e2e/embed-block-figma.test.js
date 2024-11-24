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
});
