# RDUK - Redis Cache Store Provider

[![Build Status](https://travis-ci.org/rd-uk/rduk-cache-store-redis.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-cache-store-redis)

this module must be used together with [rduk-cache](https://github.com/rd-uk/rduk-cache/)

It's an implementation of [BaseCacheStoreProvider](https://github.com/rd-uk/rduk-cache/blob/master/lib/cacheStore/baseProvider.js)

## Cache configuration

You must add the cache store section in your config file.

1. Add a `config.yml` file to your app (more information [here](https://github.com/rd-uk/rduk-configuration))
1. Add a `cacheStore` section

```yaml
# config example
---
cacheStore:
    name: redis
    providers:
        -
            name: redis
            type: rduk-cache-store-redis
            url: redis://...

```

## Connection pooling
You can configurate the maximum number of simultaneous connections to your redis server.

```yaml
# config example
---
cacheStore:
    name: redis
    providers:
        -
            name: redis
            type: rduk-cache-store-redis
            url: redis://...
            maxConnection: 20 # default: 10

```

## Data serialization
By default, data are serialized as `data:application/json;base64`