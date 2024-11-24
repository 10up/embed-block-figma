/* eslint-disable no-undef */

Cypress.Commands.add('setLocalStorage', (key, value) => {
	cy.window().then((win) => {
		win.localStorage.setItem(key, value);
	});
});

Cypress.Commands.add('createPost', (options = {}) => {
	const { postType = 'post', title = '' } = options;
	const userId = '1';

	cy.setLocalStorage(
		`WP_DATA_USER_${userId}`,
		JSON.stringify({
			'core/edit-post': {
				preferences: {
					panels: {
						'post-status': {
							opened: true,
						},
					},
					features: {
						fixedToolbar: false,
						welcomeGuide: false,
						fullscreenMode: true,
						showIconLabels: false,
						themeStyles: true,
						showBlockBreadcrumbs: true,
						welcomeGuideTemplate: false,
					},
					editorMode: 'visual',
					hiddenBlockTypes: [],
					preferredStyleVariations: {},
					localAutosaveInterval: 15,
				},
			},
			'core/editor': {
				preferences: {
					isPublishSidebarEnabled: false,
				},
			},
		}),
	);

	cy.get('#wp-admin-bar-new-content-default')
		.contains(postType, { matchCase: false })
		.click({ force: true });

	cy.wait(100);

	// close the Yoast SEO metabox
	cy.get('.wpseo-metabox .handlediv').then((button) => {
		const isExpanded = button[0].getAttribute('aria-expanded') === 'true';
		if (isExpanded) {
			cy.get('.wpseo-metabox .handlediv').click();
		}
	});

	cy.wait(100);

	if (title !== '') {
		cy.get('.editor-post-title__input').type(
			`Cypress - ${title} - ${new Date(Date.now()).toLocaleDateString()}`,
		);
	}
});

Cypress.Commands.add('savePost', () => {
	cy.get('[type="button"]').contains('Publish').click();
});

Cypress.Commands.add('insertBlock', (blockName) => {
	cy.get('button[aria-label="Add block"]').first().click();
	cy.focused().type(blockName);
	cy.get('button').contains(blockName).click();
});
