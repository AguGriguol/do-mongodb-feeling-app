
function FeelingTypeService ({ FeelingType }) {

    const get = async (query) => {

        let filters = {};
        if (query.code) filters.code = query.code;

        let feelingTypes = await FeelingType.find(filters).exec();

        return { feelingTypes };
    }

    return {
        get
    };
}

module.exports = FeelingTypeService;