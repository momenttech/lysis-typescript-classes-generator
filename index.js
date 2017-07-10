var path = require('path');
var lysisUtils = require('api-lysis').utils;
var handlebars = lysisUtils.getHandlebars();

var tsClassesGenerator = function(parameters) {

  var templatePath = path.join(__dirname, 'templates');

  // templates
  lysisUtils.registerTemplate('base-class', path.join(templatePath, 'base-class.ts.tpl'));
  lysisUtils.registerTemplate('extended-class', path.join(templatePath, 'extended-class.ts.tpl'));
  lysisUtils.registerTemplate('index', path.join(templatePath, 'index.ts.tpl'));

  var basePath = path.join(parameters.config.basePath, (parameters.generatorConfig.dir ? parameters.generatorConfig.dir : 'backend-classes'));

  lysisUtils.createDir(path.join(basePath, 'base'));

  // create resources files from templates
  for (var resourceName in parameters.context.resources) {
    var resource = parameters.context.resources[resourceName];
    var context = { resource: resource };
    var className = lysisUtils.toCamelCase(resource.title, 'upper');

    lysisUtils.createFile('base-class', `${basePath}/base/${className}Base.ts`, context);
    // if extended-class target files exists, do not overwrite (except when required from config)
    if (!lysisUtils.exists(`${basePath}/${className}.ts`)) {
      lysisUtils.createFile('extended-class', `${basePath}/${className}.ts`, context);
    }
  }

  // create index file
  lysisUtils.createFile('index', `${basePath}/index.ts`, parameters.context);
};

// Loop on dependencies of a resource *****************************************
handlebars.registerHelper('dependencies', function(resource, opts) {
  var result = '';
  var cache = [];
  for (var fieldName in resource.fields) {
    var field = resource.fields[fieldName];
    if (!field.type.scalar) {
      if (cache.indexOf(fieldName) === -1) {
        result += opts.fn(field);
        cache.push(fieldName);
      }
    }
  }
  return result;
});

// Test the generator when starting `node index.js` directly
if (require.main === module) {
  lysisUtils.getGeneratorTester()
  .setUrl('http://127.0.0.1:8000')
  // .setUrl('https://demo.api-platform.com')
  .setGenerator(tsClassesGenerator)
  .test();
}

module.exports = tsClassesGenerator;
