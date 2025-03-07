describe('CRUD de Paciente', () => {
    beforeEach(() => {
      cy.loginGerente(); // Garante que o gerente está logado
    });
  
    it('Tentativa de criação de paciente inválido', () => {
      // Seleciona o paciente no dropdown
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
        .click({ force: true });
    
      // Confirmação de que está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
    
      // Criando Paciente com erro
      cy.get('#pacientes > .p-3 > :nth-child(1) > .col-12 > .newUser > strong').click();
      cy.get('#criar-paciente-nome').type('k'); 
      cy.get('#criar-paciente-data-nascimento').type('1990-05-20');
      cy.get('#criar-paciente-cpf').type('123'); // CPF inválido
      cy.get('#criar-paciente-email').type('joaosilva.com'); // E-mail inválido
      cy.get('#criar-paciente-password').type('senha123');
    
      // Clicar no botão para criar o paciente
      cy.get('#newUserBtn').click();
    
      // Verificar se aparece uma mensagem de erro
      cy.contains('Erro ao criar paciente').should('be.visible'); // Ajustar conforme necessário
    });
    
  
    it('Criando um Paciente válido', () => {
      //Seleciona o paciente no drop dawn
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
      .click({ force: true });
      //Confirmação de está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
      //Criando Paciente
      cy.get('#pacientes > .p-3 > :nth-child(1) > .col-12 > .newUser > strong').click();
      cy.get('#criar-paciente-nome').type('João da Silva');
      cy.get('#criar-paciente-data-nascimento').type('1990-05-20', { force: true });
      cy.get('#criar-paciente-cpf').type('14172331416');
      cy.get('#criar-paciente-email').type('joao.silva@example.com');
      cy.get('#criar-paciente-password').type('senha123');
      // Clicar no botão para criar o paciente
      cy.get('#newUserBtn').click();
  
      // Verificar se o paciente foi cadastrado corretamente (ajustar conforme necessário)
      cy.contains('Paciente criado com sucesso').should('be.visible');
      cy.wait(1000);
      cy.get('#userForm > .modal-dialog > .modal-content > .modal-header > .btn-close').click();
  
    });
    
    it('Verificando os dados do paciene', () => {
      //Seleciona o paciente no drop dawn
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
      .click({ force: true });
      //Confirmação de está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-success > .bi').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-success > .bi').click();
      cy.wait(1000);
      cy.get('#readData > .modal-dialog > .modal-content > .modal-header > .btn-close').click();
    });
  
    
    it('Editando os dados do paciente (Falho)', () => {
      //Seleciona o paciente no drop dawn
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
      .click({ force: true });
      //Confirmação de está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-primary > .bi').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-primary > .bi').click();
      //CPF invalido
      cy.get('#update-patient-cpf').type('141723');
      cy.get('#update-patient-name').clear({ force: true }).type('TESTE DE ALTERAÇÃO', { force: true });
      cy.get('#update-patient-birthdate').clear({ force: true }).type('2025-01-01', { force: true });
      cy.get('#update-patient-password').clear({ force: true }).type('senha123', { force: true });
  
      //Clicar no botão de atualizar
      cy.get('#updateUserBtn').click();
  
      cy.contains('Erro ao atualizar paciente').should('be.visible');
      cy.wait(1000);
      cy.get('#updateUserForm > .modal-dialog > .modal-content > .modal-header > .btn-close').click();
      
    });
  
    it('Editando os dados do paciente (Sucesso)', () => {
      //Seleciona o paciente no drop dawn
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
      .click({ force: true });
      //Confirmação de está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-primary > .bi').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-primary > .bi').click();
      cy.get('#update-patient-cpf').type('14172331416');
      cy.get('#update-patient-name').clear({ force: true }).type('TESTE DE ALTERAÇÃO', { force: true });
      cy.get('#update-patient-birthdate').clear({ force: true }).type('2025-01-01', { force: true });
      cy.get('#update-patient-password').clear({ force: true }).type('senha123', { force: true });
  
      //Clicar no botão de atualizar
      cy.get('#updateUserBtn').click();
  
      cy.contains('Paciente atualizado com sucesso').should('be.visible');
      cy.wait(1000);
      cy.get('#updateUserForm > .modal-dialog > .modal-content > .modal-header > .btn-close').click();
      
    });
    
    it('Excluindo paciente', () => {
      //Seleciona o paciente no drop dawn
      cy.get('body > header > section.bottom-header > div > nav > ul > li.menu-drop > div > a:nth-child(1)')
      .click({ force: true });
      //Confirmação de está na seção de paciente
      cy.get('#pacientes > h2').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-danger').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(6) > .btn-danger').click();
      cy.get('#pacientes > #deleteModal > .modal-content > #confirmDelete').click();
      
  
    });
  });
  