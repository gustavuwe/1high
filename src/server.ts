import Fastify from 'fastify';

const app = Fastify({

});

app.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

app.listen({ port: 3000 }, (err, adress) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
