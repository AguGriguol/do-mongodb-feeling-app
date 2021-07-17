function PublicService({ User }) {
    const access = async (data) => {
        let user = await User.findOne({ identifier: data.identifier }).exec();
        if (!user) {
            const newUser = {
                identifier: data.identifier,
            };
            user = await new User(newUser).save();
        }
        let access = user.getToken();

        return {
            accessToken: access.accessToken,
            refreshToken: access.refreshToken,
            user,
        };
    };

    return {
        access,
    };
}

module.exports = PublicService;
