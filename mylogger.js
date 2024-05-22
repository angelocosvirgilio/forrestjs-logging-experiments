const {getLevelNumber, makeLogger, LOG_LEVELS: levelsMap} = require('@forrestjs/core/src/logger');
const {transport} = require("./pinologger")

let _logLevel = 'info'

const logger = (level, ag1, ...args) => {

  //console.log("Current log level", _logLevel)
  const logNumber = getLevelNumber(_logLevel, levelsMap);

   if (getLevelNumber(level, levelsMap) <= logNumber) {
     if (typeof ag1 === 'string') {
       const [ag2, ...argsRest] = args;
       if (ag2) {
         if (typeof ag2 === 'object') {
           transport(
             {
               ...ag2,
               level,
               message: ag1,
             },
             ...argsRest,
           );
         } else {
           transport(
             {
               level,
               message: ag1,
             },
             ag2,
             ...argsRest,
           );
         }
       } else {
         transport({ level, message: ag1 }, ...args);
       }
     } else {
       // const { message, ...ag1Rest } = ag1;
       transport(
         ...[
           {
             ...ag1,
             level,
           },
           ...args,
         ],
       );
     }
   }
 };

 // Add the shortcut methods
 Object.keys(levelsMap).forEach((key) => {
   logger[key] = (...args) => logger(key, ...args);
 });

 // Create a custom logger clone
 logger.cloneWithLogLevel = (logLevel) =>
   makeLogger(logLevel, { transport, levelsMap });

 logger.cloneWithTransport = (transport) =>
   makeLogger(logLevel, { transport: transport, levelsMap });

 logger.trace = () => {
   console.warn(
     '[ForrestJS] `log.trace()` is deprecated and will be removed in v6.x',
   );
 };

 logger.setLogLevel = (newLevel) => {
   _logLevel = newLevel
   //console.log(`SET NEW LOG LEVEL TO ${_logLevel}`)
 }

 
//console.log("logger",logger)



module.exports = { logger };

