/**
 * MIT License
 *
 * Copyright (c) 2017 Kim Ung <k.ung@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

var util = require('util');
var errors = require('rduk-errors');
var base = require('rduk-cache/lib/cacheStore/baseProvider');
var poolFactory = require('./pool');

var RedisCacheStoreProvider = function RedisCacheStoreProvider(config) {
    RedisCacheStoreProvider.super_.call(this, config);
};

util.inherits(RedisCacheStoreProvider, base);

RedisCacheStoreProvider.prototype.initialize = function() {
    if (!this.config.hasOwnProperty('url')) {
        errors.throwConfigurationError('redis server url is required.');
    }
    
    var pool, url = this.config.url;

    Object.defineProperty(this, 'pool', {
        get: function() {
            if (!pool) {
                pool = poolFactory.create(url, {
                    max: this.config.maxConnection || 10
                });
            }

            return pool;
        },
        configurable: true
    });
};

RedisCacheStoreProvider.prototype.getClient = function() {
    return this.pool.acquire();
};

RedisCacheStoreProvider.prototype.get = function(key) {
    return this.getClient().then(function(client) {
        return client.getAsync(key);
    });
};

RedisCacheStoreProvider.prototype.set = function(key, value) {
    return this.getClient().then(function(client) {
        return client.setAsync(key, value);
    });
};

module.exports = RedisCacheStoreProvider;
