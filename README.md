# server-openai

## Deployment

1. Set environment variables.
```sh
export OPENAI_API_KEY="_YOUR_OPENAI_KEY_GOES_HERE_"
export OPENAI_MODEL="gpt-3.5-turbo"
export OPENAI_WRAPPER_PORT=3000
export OPENAI_WRAPPER_CONFIG="config.js"
```

2. Clear environment from prior docker resources.
```sh
docker kill openai-wrapper-container
# docker image rm openai-wrapper-image
docker system prune -f
```
> **_NOTE:_**  Use `setopt INTERACTIVE_COMMENTS` to avoid errors with comments in the script.

3. Build docker image.
```sh
docker build -t openai-wrapper-image .
```

4. Run docker container.
```sh
docker run -d \
    -p $OPENAI_WRAPPER_PORT:$OPENAI_WRAPPER_PORT \
    --name openai-wrapper-container \
    -e OPENAI_API_KEY=$OPENAI_API_KEY \
    -e OPENAI_MODEL=$OPENAI_MODEL \
    -e OPENAI_WRAPPER_PORT=$OPENAI_WRAPPER_PORT \
    -e OPENAI_WRAPPER_CONFIG=$OPENAI_WRAPPER_CONFIG \
    openai-wrapper-image
```