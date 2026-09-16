describe('KANBAN BOARD - INTERAGINDO COM O KANBAN', () => {

    it('DEVE MOVER UMA TAREFA DE "TO-DO" PARA "DONE" E ATUALIZAR O BOARD', () => {
        cy.startEnv()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer() // cria um objeto DataTransfer para simular o arrastar e soltar

        cy.contains('div[draggable="true"]', 'Documentar API') // procura a tarefa "Documentar API" dentro do board
            .should('exist') //verifica se a tarefa existe
            .trigger('dragstart', { dataTransfer }) // dispara o evento de arrastar a tarefa, passando o objeto DataTransfer

        cy.get('.column-done') // seleciona a coluna "Done" do board
            .should('exist') //verifica se a coluna "Done" existe
            .find('h3') // procura o título da coluna "Done"
            .should('have.text', 'Done (3)') //verifica se o título da coluna é "Done (3)", indicando que há 3 tarefas na coluna

        cy.get('.column-done') // seleciona a coluna "Done" do board
            .trigger('drop', { dataTransfer }) // dispara o evento de soltar a tarefa na coluna "Done", passando o objeto DataTransfer

        cy.get('.column-done') // seleciona a coluna "Done" do board
            .find('h3') // procura o título da coluna "Done"
            .should('have.text', 'Done (4)') //verifica se o título da coluna é "Done (4)", indicando que a tarefa foi movida com sucesso

        cy.get('.column-done') // seleciona a coluna "Done" do board
            .should('include.text', 'Documentar API') //verifica se o título da coluna inclui o texto "Documentar API", indicando que a tarefa foi movida com sucesso
    })

})