# nestjs-microservices [TCP/gRPC/Kafka]

This is the main repository where we are covering Nest JS Microservices

- This is a simple pnpm workspace and using nx monorepo setup
- This repo contains simple packages which can be used across different nestjs application 

Nest supports several built-in transport layer implementations, called transporters, which are responsible for transmitting messages between different microservice instances. Most transporters natively support both request-response and event-based message styles. Nest abstracts the implementation details of each transporter behind a canonical interface for both request-response and event-based messaging. This makes it easy to switch from one transport layer to another -- for example to leverage the specific reliability or performance features of a particular transport layer -- without impacting your application code.


YouTube : https://www.youtube.com/watch?v=_fK8g2dhzvU&list=PLIGDNOJWiL19WHIxJ0Q4aP4X3oljPha5n

## what are we covering here 

- setting up packages based nx monorepo on pnpm workspace 
- building TCP based services (one gateway and two TCP based services )
- building gRPC based services (one gateway and two gRPC based services )
- building kafka/rabbit MQ based services (one gateway and two event driven services )

## Architecture

![](./screens/arch.png)

## Setup and installation

- nvm/node js v16.x.x
- nx vscode plugin 

```
pnpm i
```

## Build

```
npm run build
```

