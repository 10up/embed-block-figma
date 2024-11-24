/* eslint-disable no-undef */

// Add local storage item
Cypress.Commands.add('setLocalStorage', (key, value) => {
	cy.window().then((win) => {
		win.localStorage.setItem(key, JSON.stringify(value));
	});
});

// Create a new post
Cypress.Commands.add('createPost', ({ title = '' } = {}) => {
	cy.visit('/wp-admin/post-new.php');

	// Wait for the editor to load
	cy.get('.editor-post-title__input', { timeout: 10000 }).should('be.visible');

	if (title) {
		cy.get('.editor-post-title__input').type(`${title} - ${Date.now()}`);
	}
});

// Save the post
Cypress.Commands.add('savePost', () => {
	cy.get('button').contains('Publish').click();
});

// Insert a Gutenberg block
Cypress.Commands.add('insertBlock', (blockName) => {
	cy.get('button[aria-label="Add block"]').click();
	cy.get('.block-editor-inserter__search input').type(blockName);
	cy.contains('.block-editor-block-types-list__item', blockName).click();
});
