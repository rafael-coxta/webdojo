describe('Login', () => {
  it('Deve logar com sucesso', () => {
    cy.startEnv() //utiliza o comando customizado para inicializar o ambiente de teste
    cy.submitLoginForm('papito@webdojo.com', 'katana123') //utiliza o comando customizado para submeter o login

    cy.wait(2000) //espera 2 segundos para o login ser processado

    cy.get('[data-cy="user-name"]')
      .should('be.visible') //verifica se o elemento com o nome do usuário está visível
      .and('have.text', 'Fernando Papito') //verifica se o nome do usuário logado é exibido corretamente

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible') //verifica se a mensagem de boas-vindas está visível
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.') //verifica se a mensagem de boas-vindas está correta
  })

  it('Não deve logar com senha inválida', () => {
    cy.startEnv() //utiliza o comando customizado para inicializar o ambiente de teste
    cy.submitLoginForm('papito@webdojo.com', 'katana321') //utiliza o comando customizado para submeter o login

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible') //verifica se a mensagem de erro é exibida
  })

  it('Não deve logar com e-mail não cadastrado', () => {
    cy.startEnv() //utiliza o comando customizado para inicializar o ambiente de teste
    cy.submitLoginForm('404@webdojo.com', 'katana123') //utiliza o comando customizado para submeter o login

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible') //verifica se a mensagem de erro é exibida
  })
})