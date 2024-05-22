const logger=require("pino")()
const level='INFO aaa'
const message="Ciaooo %f"
const data=100.65
const args=[123, "456", "789"]
//console.log(`${level}: ${message}`, data, ...args)

logger.info("Hello")