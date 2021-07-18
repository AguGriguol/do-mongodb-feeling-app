const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

function FeelingService({ Feeling, FeelingType }) {
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
    };
    const getOne = async (identifier) => {
        let feeling = await Feeling.findOne({
            _id: mongoose.Types.ObjectId(identifier),
        }).exec();
        if (!feeling) throw new Error(StatusCodes.NOT_FOUND);

        return { feeling };
    };
    const create = async (body, auth) => {
        let type = await FeelingType.findOne({
            _id: mongoose.Types.ObjectId(body.type),
        }).lean();
        if (!type) throw new Error(StatusCodes.NOT_FOUND);

        const newFeeling = {
            user: auth.user._id,
            title: body.title,
            feelingType: {
                id: type._id,
                code: type.code,
            },
            shortDescription: body.shortDescription || '',
            feelingDescription: body.feelingDescription || '',
        };

        if (body.feelingPicture)
            newFeeling.feelingPicture = body.feelingPicture;

        let feeling = await Feeling(newFeeling).save();

        return { feeling };
    };
    const update = async (identifier, body) => {
        let feeling = await Feeling.findOne({
            _id: mongoose.Types.ObjectId(identifier),
        }).exec();
        if (!feeling) throw new Error(StatusCodes.NOT_FOUND);

        if (body.title) feeling.title = body.title;
        if (body.type) {
            let type = await FeelingType.findOne({
                _id: mongoose.Types.ObjectId(body.type),
            }).lean();
            if (!type) throw new Error(StatusCodes.NOT_FOUND);
            feeling.feelingType = {
                id: type._id,
                code: type.code,
            };
        }
        if (body.shortDescription) feeling.shortDescription = body.shortDescription;
        if (body.feelingDescription) feeling.feelingDescription = body.feelingDescription;
        if (body.feelingPicture) feeling.feelingPicture = body.feelingPicture;
        if (body.deletePicture) feeling.feelingPicture = undefined;

        feeling = await feeling.save();

        return { feeling };
    };
    const deleteOne = async (identifier) => {
        let feeling = await Feeling.findOne({
            _id: mongoose.Types.ObjectId(identifier),
        }).exec();
        if (!feeling) throw new Error(StatusCodes.NOT_FOUND);

        await feeling.remove();

        return true;
    };

    return {
        get,
        create,
        update,
        getOne,
        deleteOne
    };
}

module.exports = FeelingService;
