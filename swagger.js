const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Users API",
        description: "Users API for CSE341 BYU class"
    },
    host: "localhost:26000",
    schemes: ['http', 'https']
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)