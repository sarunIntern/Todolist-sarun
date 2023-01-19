/// <reference types="cypress" />
describe('Test user api', () => {
  
     it('List user api', () => {
        
        cy.request({
            method:'GET',
            url:'http://localhost:3000/api/auth/User/Listtodolist/todolist',
            headers:{Token:Cypress.env('Token')},
            
        }).then((Response)=>{
            expect(Response.status).to.eq(200)
            cy.log(Response.data)
        })
       
    })

   
})