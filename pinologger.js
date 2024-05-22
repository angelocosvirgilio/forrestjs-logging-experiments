const logger=require("pino")()
const defaultTransport = ({ message, level, ...data }, ...args) =>{
    //console.log(`message: ${message}, level: ${level}, data: ${JSON.stringify(data)}, args: ${args}`)
    logger[level]({}, `${level}: ${message}`, ...args);
}


  // const level='INFO aaa'
// const message="Ciaooo %f"
// const data=100.65
// const args=[123, "456", "789"]
// //console.log(`${level}: ${message}`, data, ...args)

// logger.info("Hello")
module.exports = {
    transport : defaultTransport
}
