/*
const logger = require('@forrestjs/core/src/logger');
const mymakelogger = require('./mymakelogger');
//delete logger["makeLogger"]
logger.makeLogger=mymakelogger.makeLogger
module.exports = logger
*/
const {logger: mylogger} = require("./mylogger")

const forrest = require('@forrestjs/core');
const serviceFastify = require("@forrestjs/service-fastify");
const pinologger = require("./pinologger")

const serviceLogger = ({setContext}) => {
  console.log("--->", mylogger)
  setContext("log", mylogger)
}



const firstFeature = ({getContext}) => {
    const logger= getContext("log")
    logger.info("hello! %o", 123)
    logger.warn("THIS IS A WARN")
}

const apis = [
  {
    target: "$FASTIFY_ROUTE",
    handler: (_, { getConfig, getContext }) => ({
      method: "GET",
      url: "/print-logs",
      handler: async (request, reply) => {
        const logger= getContext("log")
        logger.debug("DEBUG MESSAGE")
        logger.info("INFO MESSAGE")
        logger.warn("THIS IS A WARN")
        logger.error("ERRORRRRR !!!!")
        reply.status(200)
        return "logs printed"
      }
    })
  },
  {
    target: "$FASTIFY_ROUTE",
    handler: (_, { getConfig, getContext, setContext }) => ({
      method: "POST",
      url: "/new-log-level",
      handler: async (request, reply) => {
        const logger= getContext("log")        
        const newLogLevel = request.body.newLogLevel
        logger.setLogLevel(newLogLevel)        
        setContext("log", logger)
        reply.status(200)
        return "Level updated to "+ newLogLevel
      }
    })
  },
]


//console.log(logger.makeLogger)

forrest
  // Kick off the asynchronous Boot Lifecycle
  .run({
    trace: 'compact',
    settings: {
        logger: {
            level: "info",
            transport: pinologger.transport,
        }
    },
    services: [serviceFastify, serviceLogger],
    features: [apis /*firstFeature*/],
  })
  // Log any boot error
  .catch(console.error);