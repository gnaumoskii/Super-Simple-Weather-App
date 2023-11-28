describe("Weather Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
        cy.intercept('GET', '**').as("getWeather");
        cy.wait("@getWeather");
    });

    it("Scroll to Weekly Weather", () => {
        cy.getDataTest("weather-content").scrollTo("bottom");
        cy.getDataTest("weather-group").should("be.visible");
        cy.getDataTest("weather-group").find("li").should("have.length", 7);
    });

    it("Click button to scroll to Weekly Weather", () => {
        cy.getDataTest("weekly-weather-button").click({force: true});
        cy.getDataTest("weather-group").should("be.visible");
        cy.getDataTest("weather-group").find("li").should("have.length", 7);

    });

    it("Todays Weather data is visible", () => {
        cy.getDataTest("weather-text").should("be.visible");
        cy.getDataTest("weather-card").first().should("be.visible");
    });
    
    it("Open Weather Details", () => {
        cy.getDataTest("weather-card").first().click({force: true});
        cy.getDataTest("weather-details").should("exist").and("be.visible");
    });

    it("Close Weather Details", () => {
        cy.getDataTest("weather-card").first().click({force: true});
        cy.getDataTest("weather-details").should("exist").and("be.visible");
        cy.getDataTest("modal-backdrop").click({force: true});
        cy.getDataTest("weather-details").should("not.exist");
    });
});
