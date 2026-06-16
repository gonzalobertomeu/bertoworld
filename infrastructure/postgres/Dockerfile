FROM alpine
RUN apk add --no-cache bash postgresql-client
COPY src /src
RUN chmod +x /src/provide.sh
ENTRYPOINT ["/src/provide.sh"]
CMD ["/src/init"]
