describe('TOCAR O VÍDEO - INTERAGINDO COM iFrame', () => {

    it('DEVE PODER TOCAR O VÍDEO DE EXEMPLO', () => {
        cy.startEnv()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]')
            .should('exist') //verifica se o iframe existe
            .its('0.contentDocument.body') // acessa o conteúdo "body" do primeiro [0] iframe
            .then(cy.wrap) // encapsula o conteúdo do iframe para que possamos interagir com ele
            .as('iFramePlayer') // cria um alias para o conteúdo do iframe

        cy.get('@iFramePlayer')
            .find('.play-button') // procura o botão de play dentro do iframe
            .should('be.visible') //verifica se o botão de play está visível
            .click() //clica no botão de play para iniciar o vídeo

        cy.get('@iFramePlayer')
            .find('.play-button') // procura o botão de play dentro do iframe
            .should('not.exist') //verifica se o botão de play não existe mais, indicando que o vídeo está tocando

        cy.get('@iFramePlayer')
            .find('.pause-button') // procura o botão de pause dentro do iframe
            .should('be.visible') //verifica se o botão de pause está visível, indicando que o vídeo está tocando
    })

})