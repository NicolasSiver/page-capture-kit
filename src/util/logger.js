const chalk  = require('chalk'),
      format = require('date-fns/format');

class Logger {
    error(message) {
        console.error(chalk.red(this.formatMesasge(message)));
    }

    formatMesasge(value) {
        return `[${format(new Date(), 'yyyy-MM-dd HH-mm-ss:SSS')}] ${value}`;
    }

    log(message) {
        console.log(this.formatMesasge(message));
    }
}

module.exports = {
    logger: new Logger()
};
