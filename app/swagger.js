import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collok-Easy API",
      version: "1.0.0",
      description: "API documentation for Your Express.js App",
    },
  },
  apis: ["./routes/*.js"], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
