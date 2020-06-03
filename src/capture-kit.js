const Promise = require('bluebird'),
      fs      = require('fs').promises,
      path    = require('path');

const {PageVisitor} = require('./page-visitor');

class CaptureKit {

    executeScript(path) {
        let CustomScript = require(path);
        let script = new CustomScript();
        let pageVisitor = new PageVisitor(this.output);

        return pageVisitor.executeWithScript(script);
    }

    play(scriptsPath) {
        return Promise
            .resolve()
            // TODO Explore the use of fs.Dirent when used with the option "withFileTypes"
            .then(() => fs.readdir(scriptsPath))
            .then(files => {
                return Promise.each(
                    files,
                    script => this.executeScript(path.resolve(scriptsPath, script))
                );
            });
    }

    setOutput(output) {
        this.output = output;
    }
}

module.exports = {CaptureKit};
