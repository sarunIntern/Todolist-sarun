const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env:{
    username: "admin@email.com",
    password: "admin1234",
    Token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNhcnVuNDE0NCIsImVtYWlsIjoic2FydW40MTQ0QGdtYWlsLmNvbSIsInJvbGUiOiJ1IiwiaWF0IjoxNjc0MTIzMzQ3LCJleHAiOjE2NzQxMjY5NDd9.HFN85FH-r76gClrMn5U18t_Rxz2wp30Fz9smW7ktWsA"
}
});
