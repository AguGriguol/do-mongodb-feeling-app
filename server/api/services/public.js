
function PublicService ({ User, Company, ApplicationModule }) {

    const access = async function (data, query, auth) {
        return { accessToken: '', refreshToken: '', user: null };
    }

    return {
        access
    };
}

module.exports = PublicService;