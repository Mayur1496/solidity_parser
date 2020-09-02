const parser = require('solidity-parser-diligence');
const {Command, flags} = require('@oclif/command');
const fs = require('fs');

class SolidityParserCommand extends Command {
  async run() {
    const {args} = this.parse(SolidityParserCommand);
    var filePath = args.FILE_PATH;
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath, 
            {encoding:'utf8', flag:'r'});
      
      try{
        var ast = parser.parse(data, { loc: true });
        this.log(JSON.stringify(ast));
      } catch(e){
        this.log(e)
        if (e instanceof parser.ParserError) {
            this.log(e.errors)
        }
      }
    }else{
      this.error(`Incorrect File path : ${filePath}
        No Such file exists `);
    }
  }
}

SolidityParserCommand.description = `AST generator for solidity file`

SolidityParserCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
}

SolidityParserCommand.args = [
  {
    name: 'FILE_PATH',
    required: true,
    description: 'Path of the file to be executed',
    hidden: false
  }
]

module.exports = SolidityParserCommand
