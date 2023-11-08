
const app = require('./app')
const appBlog = require('./appBlog')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(3002, () => {
  logger.info(`Server running on port 3002`)
})

appBlog.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})