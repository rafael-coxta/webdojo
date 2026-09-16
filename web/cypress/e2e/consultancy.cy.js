describe('Formulário de Consultoria',() => {

    //ESTRUTURA DE TESTE PARA VALIDAR O PREENCHIMENTO E SUMBISSÃO VÁLIDOS DO FORMULÁRIO
    it.only('Deve preencher o formulário de consultoria com sucesso', () => {
        cy.startEnv() //utiliza o comando customizado para inicializar o ambiente de teste
        cy.submitLoginForm('papito@webdojo.com', 'katana123') //utiliza o comando customizado para submeter o login com sucesso
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //cy.contains('h4', 'Formulários')
            //.parent() //navega para o elemento pai do título "Formulários"
            //.parent() //navega para o elemento pai do elemento anterior
            //.parent() //navega para o elemento pai do elemento anterior
            //.should('be.visible') //verifica se o título "Formulários" está visível
            //.click() //clica no título "Formulários" para expandir a seção

        //cy.contains('h1', 'Consultoria')
            //.should('be.visible') //verifica se o título "Consultoria" está visível

        cy.goTo('Formulários', 'Consultoria') //utiliza o comando customizado para navegar para a página de consultoria e verificar se o título "Consultoria" está visível
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CAMPO DE TEXTO "Nome"
        cy.get('#name')
            .type('Rafael Oliveira ') //preenche o campo "Nome" com o valor "Rafael Oliveira Costa Savino"

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type('Costa Savino') //preenche o campo "Nome" adquirido por outro identificador com o valor "Fernando Papito"
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CAMPO DE TEXTO "E-mail"
        cy.get('#email')
            .type('papito@teste.com.br') //preenche o campo "E-mail"    
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CAMPO DE TEXTO "Telefone" VALIDANDO A FORMATAÇÃO
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11 98765-4321') //preenche o campo "Telefone" com um número de telefone válido
            .should('have.value', '(11) 98765-4321') //verifica se o campo "Telefone" foi preenchido corretamente
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CAMPO DE SELEÇÃO "Tipo de Consultoria" UTILIZANDO DIFERENTES ABORDAGENS
        cy.get('#consultancyType')
            .select('In Company')
        cy.contains('label', 'Tipo de Consultoria')
            .parent() //navega para o elemento pai do rótulo "Tipo de Consultoria"
            .find('select') //encontra o elemento "select" dentro do elemento pai
            .select('Individual') //seleciona a opção "In Company" no campo "Tipo de Consultoria"
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM BOTÕES DE RÁDIO "Tipo de Pessoa" UTILIZANDO DIFERENTES ABORDAGENS
        cy.contains('span', 'Pessoa Física') //é possível utilizar 'label' sem o .parent() também
            .parent() //navega para o elemento pai do rótulo "Pessoa Física"
            .find('input') //encontra o elemento "checkbox" dentro do elemento pai
            .click() //marca a caixa de seleção "Pessoa Física", poderia ser feito com .check() também
            .should('be.checked') //verifica se a caixa de seleção "Pessoa Física" está marcada
        cy.contains('label', 'Pessoa Jurídica')
            .find('input') //encontra o elemento "checkbox" dentro do rótulo "Pessoa Jurídica"
            .should('not.be.checked') //verifica se a caixa de seleção "Pessoa Jurídica" não está marcada
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CAMPO DE TEXTO "CPF" VALIDANDO A FORMATAÇÃO
        cy.contains('label', 'CPF')
            .parent() //navega para o elemento pai do rótulo "CPF"
            .find('input') //encontra o elemento "input" dentro do elemento pai
            .type('08126838620') //preenche o campo "CPF" com um número de CPF válido
            .should('have.value', '081.268.386-20') //verifica se o campo "CPF" foi preenchido corretamente
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM CHECKBOXES E SELECIONANDO TUDO COM "forEach"
        const discoveryChannels = [
            'Instagram', 
            'LinkedIn', 
            'Udemy', 
            'YouTube', 
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => { //itera sobre cada canal de descoberta na lista "discoveryChannels"
            cy.contains('label', channel) //encontra o rótulo do canal de descoberta atual
                .find('input') //encontra o elemento "checkbox" dentro do rótulo "Instagram"
                .check() //marca a caixa de seleção "Instagram"
                .should('be.checked') //verifica se a caixa de seleção "Instagram" está marcada
        })
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //ANEXANDO ARQUIVOS PARA UPLOAD
        cy.get('input[type="file"]')
            .should('not.be.visible') //verifica se o campo de upload de arquivos não está visível
            .selectFile('./cypress/fixtures/pdf_exemplo.pdf', {force: true}) //anexa o arquivo "pdf_exemplo.pdf" ao campo de upload de arquivos
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM ÁREA DE TEXTO
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Estou interessado em uma consultoria para melhorar meus conhecimentos em automação de testes.') //preenche a área de texto com uma descrição da necessidade de consultoria
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //INTERAGINDO COM ARRAY DE TAGS E SIMULANDO O TECLADO FÍSICO
        const techs = [
            'Cypress',
            'Selenium',
            'Java',
            'JavaScript',
            'Python'
        ]

        techs.forEach((tech) => { //itera sobre cada tecnologia na lista "techs"
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech) //digita a tecnologia "Cypress" no campo de tags
            .type('{enter}') //simula a tecla "Enter" para adicionar a tag "Cypress"

        cy.contains('label', 'Tecnologias') //encontra o rótulo "Tecnologias"
            .parent() //navega para o elemento pai do rótulo "Tecnologias"
            .contains('span', tech) //encontra a tag "Cypress" dentro do elemento pai
            .should('be.visible') //verifica se a tag "Cypress" está visível
        })
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //SUBMETENDO O FORMULÁRIO E VALIDANDO A MENSAGEM DE SUCESSO
        cy.contains('label', 'termos de uso')
            .find('input') //encontra o elemento "checkbox" dentro do rótulo "termos de uso"
            .check() //marca a caixa de seleção "termos de uso"
            .should('be.checked') //verifica se a caixa de seleção "termos de uso" está marcada

        cy.contains('button', 'Enviar formulário')
            .click() //clica no botão "Enviar" para submeter o formulário

        cy.get('.modal', {timeout: 7000}) //encontra o elemento modal que exibe a mensagem de sucesso através da classe CSS "modal" com time out explícito de 7 segundos para aguardar a exibição do modal
            .should('be.visible') //verifica se o modal de sucesso está visível
            .find('.modal-content') //encontra o elemento "modal-content" dentro do modal
            .should('be.visible') //verifica se o conteúdo do modal está visível
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.') //verifica se a mensagem de sucesso possui o texto correto

        //cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            //.should('be.visible') //verifica se a mensagem de sucesso é exibida após a submissão do formulário
    })


    //ESTRUTURA DE TESTE PARA VALIDAR AS MENSAGENS DE ERRO AO SUBMETER O FORMULÁRIO SEM PREENCHER OS CAMPOS OBRIGATÓRIOS
    it('Deve verificar os campos obrigatórios', () => {
        cy.startEnv() //utiliza o comando customizado para inicializar o ambiente de teste
        cy.submitLoginForm('papito@webdojo.com', 'katana123') //utiliza o comando customizado para submeter o login com sucesso

        cy.goTo('Formulários', 'Consultoria') //utiliza o comando customizado para navegar para a página de consultoria e verificar se o título "Consultoria" está visível
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        cy.contains('button', 'Enviar formulário')
            .click() //clica no botão "Enviar" para submeter o formulário
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        cy.contains('label', 'Nome Completo *') //encontra o rótulo "Nome Completo *"
            .parent() //navega para o elemento pai do rótulo "Nome Completo *"
            .find('p') //encontra o elemento "p" dentro do elemento pai
            .should('be.visible') //verifica se a mensagem de erro "Nome Completo *" é exibida
            .should('have.text', 'Campo obrigatório') //verifica se a mensagem de erro "Nome Completo *" possui o texto "Campo obrigatório"
            .and('have.class', 'text-red-400') //verifica se a mensagem de erro "Digite nome e sobrenome" possui a classe CSS "text-red-400"
            .and('have.css', 'color', 'rgb(248, 113, 113)') //verifica se a mensagem de erro "Digite nome e sobrenome" possui a cor CSS "rgb(248 113 113)"

        cy.contains('label', 'Email *') //encontra o rótulo "Email *"
            .parent() //navega para o elemento pai do rótulo "Email *"
            .find('p') //encontra o elemento "p" dentro do elemento pai
            .should('be.visible') //verifica se a mensagem de erro "Email *" é exibida
            .should('have.text', 'Campo obrigatório') //verifica se a mensagem de erro "Email *" possui o texto "Campo obrigatório"
            .and('have.class', 'text-red-400') //verifica se a mensagem de erro "Digite um email válido" possui a classe CSS "text-red-400"
            .and('have.css', 'color', 'rgb(248, 113, 113)') //verifica se a mensagem de erro "Digite um email válido" possui a cor CSS "rgb(248 113 113)"

        cy.contains('label', 'termos de uso') //encontra o rótulo "Termos de Uso *"
            .parent() //navega para o elemento pai do rótulo "Termos de Uso *"
            .find('p') //encontra o elemento "p" dentro do elemento pai
            .should('be.visible') //verifica se a mensagem de erro "Termos de Uso *" é exibida
            .should('have.text', 'Você precisa aceitar os termos de uso') //verifica se a mensagem de erro "Termos de Uso *" possui o texto "Você precisa aceitar os termos de uso"
            .and('have.class', 'text-red-400') //verifica se a mensagem de erro "Termos de Uso *" possui a classe CSS "text-red-400"
            .and('have.css', 'color', 'rgb(248, 113, 113)') //verifica se a mensagem de erro "Termos de Uso *" possui a cor CSS "rgb(248 113 113)"
    })
})