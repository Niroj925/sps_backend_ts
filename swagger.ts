import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'SPS API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['**/*.ts,.js'],
}

const specs = swaggerJsdoc(options)

export default specs;
