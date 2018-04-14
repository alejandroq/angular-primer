all: build

build:
	@ docker build -f .docker/ng@latest/Dockerfile -t angulardev/ngcli:latest .
	@ if [ ! -d "./$(app)" ]; then \
        bash ng new $(app) --service-worker --routing; \
    fi

prod:
	# build production container here
	@ cd $(app) && \
		docker run -d -p 3000:8080 angulardev/angular-universal npm server

.PHONY: build prod