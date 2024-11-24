/* eslint-disable no-undef */

Cypress.Commands.add('embedFigmaURL', (url) => {
	cy.get('.wp-block-embed[data-title="Figma"] form input').clear().type(url).blur();
	cy.get('.wp-block-embed[data-title="Figma"] form').submit();

	// Wait for the preview to load or an error message to appear
	cy.wait(1000);
});

Cypress.Commands.add('clickPublish', () => {
	cy.get('.editor-post-publish-panel__toggle').click();
});

Cypress.Commands.add('insertBlock', (blockName) => {
	cy.get('button[aria-label="Add block"]').first().click();
	cy.focused().type(blockName);
	cy.get('button[role="menuitem"]').contains(blockName).click();
});
