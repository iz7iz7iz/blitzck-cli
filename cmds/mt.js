const mediatypes = require("../data/mtdata.json");
const makeList = require("../utils/makelist");
const listAll = require("../utils/listall");
const jexp = require("../utils/jsonexport");
const xexp = require("../utils/xmlexport");
const yexp = require("../utils/yamlexport");
const help = require("./help");

module.exports = (args) => {
  try {
    const search = args.search || args.s;
    const all = args.all || args.a;
    const list = args.list || args.l;
    const json = args.json || args.j;
    const xml = args.xml || args.x;
    const yaml = args.yaml || args.y;

    let result = mediatypes;

    if (search) {
      let format = search.toLowerCase();
      let idx = mediatypes.findIndex(x => x.format === format);

      if (idx >= 0) {
        result = mediatypes[idx].mimetype;
        console.log(`\n${format} media type is "${result}"\n`);
      } else {
        console.log(`\n${format} is not in the database.`);
        makeList(mediatypes, "format", "media types");
      }
    } else if (all) {
      listAll(mediatypes, "Media Types");
    } else if (list) {
      makeList(mediatypes, "format", "media types");
    } else if (json) {
      jexp(result);
    } else if (xml) {
      xexp("mimetypes", "mt", result)
    } else if (yaml) {
      yexp(result);
    } else {
      help(args);
    }

  } catch (err) {
    console.error(err)
  }
}