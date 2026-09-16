describe('Simulando Mouseover', () => {
    it('Deve mostrar um texto ao passar o mouse sobre o elemento', () => {

        cy.startEnv()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Isso é Mouseover!')
            .should('not.exist') // Verifica se o texto "Isso é Mouseover!" NÃO existe na página
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!')
            .should('exist') // Verifica se o texto "Isso é Mouseover!" existe na página
    })
})