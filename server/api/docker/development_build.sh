docker build -f ./Dockerfile.development --tag feeldev:latest ../../
docker run \
--env-file "$PWD"/../.env_development \
-v "$PWD"/../database:/srv/api/database \
-v "$PWD"/../routes:/srv/api/routes \
-v "$PWD"/../services:/srv/api/services \
-v "$PWD"/../models:/srv/api/models \
-v "$PWD"/../middlewares:/srv/api/middlewares \
-v "$PWD"/../dependencies:/srv/api/dependencies \
-v "$PWD"/../node_modules:/srv/api/node_modules \
-p 20000:20000 \
feeldev:latest