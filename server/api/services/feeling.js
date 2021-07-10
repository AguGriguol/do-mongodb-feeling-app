const mongoose = require("mongoose");
const { StatusCodes }       = require('http-status-codes');

function FeelingService ({ Feeling, FeelingType }) {

    const get = async (query, auth) => {

        let match = { user: mongoose.Types.ObjectId(auth.user._id) };
        let aggregate = [];
        if (query.type) match['feelingType.id'] = mongoose.Types.ObjectId(query.type);
        if (query.created) match.created = new Date(+query.created);
        if (query.updated) match.updated = new Date(+query.updated);
        if (query.title) match.title = new RegExp(query.title, 'i');
        aggregate.push({ $match: match });
        aggregate.push({ $sort: { updated: -1 } });

        let feelings = await Feeling.aggregate(aggregate).exec();

        return { feelings };
    }
    const create = async (body, auth) => {

        let type = await FeelingType.findOne({ _id: mongoose.Types.ObjectId(body.type) }).lean();
        if (!type) throw new Error(StatusCodes.NOT_FOUND);

        const newFeeling = {
            user: auth.user._id,
            title: body.title,
            feelingType: {
                id: type._id,
                code: type.code
            },
            shortDescription: body.shortDescription || '',
            feelingDescription: body.feelingDescription || ''
        }

        let feeling = await Feeling(newFeeling).save();

        return { feeling };
    }

    return {
        get,
        create
    };
}

module.exports = FeelingService;