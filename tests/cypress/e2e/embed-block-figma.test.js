/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Figma Embed Block Tests', () => {
	before(() => {
		cy.login();
	});

	beforeEach(() => {
		cy.login();
	});

	it('Should display the Figma Embed block and allow embedding a Figma URL', () => {
		const title = 'Figma Embed';
		cy.createPost({
			title,
			beforeSave: () => {
				cy.insertBlock('Figma Embed');
				cy.embedFigmaURL(
					'https://embed.figma.com/design/nrPSsILSYjesyc5UHjYYa4?embed-host=figma-embed-docs',
				);

				cy.openDocumentSettingsSidebar('Post');
				cy.clickPublish();

				cy.get('.wp-block-embed__wrapper iframe')
					.should('exist')
					.and('have.attr', 'src')
					.and('contain', 'https://www.figma.com/embed');
			},
		});
	});
});
