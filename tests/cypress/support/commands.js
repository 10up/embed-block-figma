/* eslint-disable no-undef */

Cypress.Commands.add('embedFigmaURL', (url) => {
	cy.getBlockEditor().find('.wp-block-embed[data-title="Figma"] form input').clear().type(url);
	cy.getBlockEditor().find('.wp-block-embed[data-title="Figma"] form').submit();

	// Wait for the preview to load or an error message to appear
	cy.wait(2000);
});
