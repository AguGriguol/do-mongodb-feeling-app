const awilix = require('awilix');

//Services
const PublicService = require('../services/public');
const FeelingTypeService = require('../services/feelingType');
const FeelingService = require('../services/feeling');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    //Services
    PublicService: awilix.asFunction(PublicService).singleton(),
    FeelingTypeService: awilix.asFunction(FeelingTypeService).singleton(),
    FeelingService: awilix.asFunction(FeelingService).singleton(),
});

//Models
container.loadModules([
    [
        '../models/**/*.js',
        {
            register: awilix.asValue,
            lifetime: awilix.Lifetime.TRANSIENT
        }
    ],
], {
        cwd: __dirname,
        formatName: name => `${name.charAt(0).toUpperCase()}${name.substring(1)}`
});

module.exports = container;