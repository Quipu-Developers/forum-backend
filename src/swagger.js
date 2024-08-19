// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Board API',
            version: '1.0.0',
            description: 'A simple Express Board API',
        },
        servers: [
            {
                url: 'http://localhost:3001/',
            },
        ],
    },
    apis: ['./routes/*.js'], // API 문서화할 파일 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
