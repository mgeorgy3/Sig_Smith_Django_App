import * as httpClient from "./httpClient"


function subscribePrice(accountId, symbol, listener, context) {
    if (!accountId) {
        this.getAccountId((error, accountId) => error || this.subscribePrice(accountId, symbol, listener, context))
        return
    }

    const existingSubscriptions = this.getHandlers("price/" + symbol)

    if (!this.streamPrices) {
        this.streamPrices = _.throttle(this._streamPrices.bind(this, accountId))
    }

    this.off("price/" + symbol, listener, context)
    this.on("price/" + symbol, listener, context)

    if (existingSubscriptions.length === 0) {
        this.streamPrices()
    }
}

function unsubscribePrice(symbol, listener, context) {
    this.off("price/" + symbol, listener, context)
    this.streamPrices()
}

// Kills rates streaming keep alive request for account and creates a new one whenever subscription list changes. Should always be throttled.
function _streamPrices(accountId) {
    this.priceSubscriptions = Object.keys(this.getHandlers())
        .reduce((memo, event) => {
            const match = event.match("^price/(.+)$")
            if (match) {
                memo.push(match[1])
            }
            return memo
        }, [])
        .sort()
        .join("%2C")

    const changed = !this.lastPriceSubscriptions || this.priceSubscriptions !== this.lastPriceSubscriptions

    this.lastPriceSubscriptions = this.priceSubscriptions

    if (!changed) {
        return
    }

    if (this.pricesRequest) {
        this.pricesRequest.abort()
    }

    if (this.priceSubscriptions === "") {
        return
    }

    clearTimeout(this.pricesTimeout)
    this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)

    this.pricesRequest = httpClient.sendRequest(
        {
            hostname: this.streamHost,
            method: "GET",
            path: `/v3/accounts/${this.accountId}/pricing/stream?instruments=` + this.priceSubscriptions,
            headers: {
                Authorization: "Bearer " + this.accessToken
            },
            stream: true
        },
        this._onPricesResponse.bind(this, accountId),
        this._onPricesData.bind(this)
    )
    }

function _onPricesResponse(accountId, error, body, statusCode) {
    if (statusCode !== 200) {
        if (body && body.disconnect) {
            this.trigger("message", accountId, "Prices streaming API disconnected.\nOANDA code " + body.disconnect.code + ": " + body.disconnect.message)
        } else {
            this.trigger("message", accountId, "Prices streaming API disconnected with status " + statusCode)
        }
    }
    clearTimeout(this.pricesTimeout)
    this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)
}

function _onPricesData(data) {
    // Single data chunks sometimes contain more than one tick. Each always end with /r/n. Whole chunk therefore not JSON parsable, so must split.
    // A tick may also be split across data chunks, so must buffer
    data.split(/\n/).forEach((line) => {
        let update
        if (line) {
            this._pricesBuffer.push(line)
            try {
                update = JSON.parse(this._pricesBuffer.join(""))
            } catch (error) {
                if (this._pricesBuffer.length <= 5) {
                    // Wait for next update.
                    return
                }
                // Drop if cannot produce object after 5 updates
                console.error("Error Unable to parse OANDA price subscription update", this._pricesBuffer.join("\n"), error)
                this._pricesBuffer = []
                return
            }
            this._pricesBuffer = []

            const {type} = update

            if (type === "HEARTBEAT") {
                clearTimeout(this.pricesTimeout)
                this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)
                return
            }
            if (type === "PRICE") {
                const price = new ClientPrice(update)
                this.trigger("price/" + update.instrument, price)
            }
        }
    }, this)
}

function _pricesHeartbeatTimeout() {
    console.warn("OANDAAdapterV20: No heartbeat received from prices stream for 10 seconds. Reconnecting.")
    delete this.lastPriceSubscriptions
    this.streamPrices()
}

function _requestHTTP(request, callback) {
    const {method, path} = request
    if (method === "GET") {
        if (this.requesting[path]) {
            this.once(this.requesting[path], callback)
            return
        }
        this.requesting[path] = path
    }
    request.hostname = this.restHost
    request.headers = request.headers || {
        Authorization: "Bearer " + this.accessToken
    }


    // Here is where the request is called.
    this._sendRequest(request, (error, body, statusCode) => {
        callback(error, body, statusCode)
        if (method === "GET") {
            this.trigger(this.requesting[path], error, body, statusCode)
            delete this.requesting[path]
        }
    })
} subscribePrice(accountId, symbol, listener, context) {
        if (!accountId) {
            this.getAccountId((error, accountId) => error || this.subscribePrice(accountId, symbol, listener, context))
            return
        }

        const existingSubscriptions = this.getHandlers("price/" + symbol)

        if (!this.streamPrices) {
            this.streamPrices = _.throttle(this._streamPrices.bind(this, accountId))
        }

        this.off("price/" + symbol, listener, context)
        this.on("price/" + symbol, listener, context)

        if (existingSubscriptions.length === 0) {
            this.streamPrices()
        }
    }

    unsubscribePrice(symbol, listener, context) {
        this.off("price/" + symbol, listener, context)
        this.streamPrices()
    }

    // Kills rates streaming keep alive request for account and creates a new one whenever subscription list changes. Should always be throttled.
    _streamPrices(accountId) {
        this.priceSubscriptions = Object.keys(this.getHandlers())
            .reduce((memo, event) => {
                const match = event.match("^price/(.+)$")
                if (match) {
                    memo.push(match[1])
                }
                return memo
            }, [])
            .sort()
            .join("%2C")

        const changed = !this.lastPriceSubscriptions || this.priceSubscriptions !== this.lastPriceSubscriptions

        this.lastPriceSubscriptions = this.priceSubscriptions

        if (!changed) {
            return
        }

        if (this.pricesRequest) {
            this.pricesRequest.abort()
        }

        if (this.priceSubscriptions === "") {
            return
        }

        clearTimeout(this.pricesTimeout)
        this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)

        this.pricesRequest = httpClient.sendRequest(
            {
                hostname: this.streamHost,
                method: "GET",
                path: `/v3/accounts/${this.accountId}/pricing/stream?instruments=` + this.priceSubscriptions,
                headers: {
                    Authorization: "Bearer " + this.accessToken
                },
                stream: true
            },
            this._onPricesResponse.bind(this, accountId),
            this._onPricesData.bind(this)
        )
    }

    _onPricesResponse(accountId, error, body, statusCode) {
        if (statusCode !== 200) {
            if (body && body.disconnect) {
                this.trigger("message", accountId, "Prices streaming API disconnected.\nOANDA code " + body.disconnect.code + ": " + body.disconnect.message)
            } else {
                this.trigger("message", accountId, "Prices streaming API disconnected with status " + statusCode)
            }
        }
        clearTimeout(this.pricesTimeout)
        this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)
    }

    _onPricesData(data) {
        // Single data chunks sometimes contain more than one tick. Each always end with /r/n. Whole chunk therefore not JSON parsable, so must split.
        // A tick may also be split across data chunks, so must buffer
        data.split(/\n/).forEach((line) => {
            let update
            if (line) {
                this._pricesBuffer.push(line)
                try {
                    update = JSON.parse(this._pricesBuffer.join(""))
                } catch (error) {
                    if (this._pricesBuffer.length <= 5) {
                        // Wait for next update.
                        return
                    }
                    // Drop if cannot produce object after 5 updates
                    console.error("Error Unable to parse OANDA price subscription update", this._pricesBuffer.join("\n"), error)
                    this._pricesBuffer = []
                    return
                }
                this._pricesBuffer = []

                const {type} = update

                if (type === "HEARTBEAT") {
                    clearTimeout(this.pricesTimeout)
                    this.pricesTimeout = setTimeout(this._pricesHeartbeatTimeout.bind(this), 10000)
                    return
                }
                if (type === "PRICE") {
                    const price = new ClientPrice(update)
                    this.trigger("price/" + update.instrument, price)
                }
            }
        }, this)
    }

    _pricesHeartbeatTimeout() {
        console.warn("OANDAAdapterV20: No heartbeat received from prices stream for 10 seconds. Reconnecting.")
        delete this.lastPriceSubscriptions
        this.streamPrices()
    }

    _requestHTTP(request, callback) {
        const {method, path} = request
        if (method === "GET") {
            if (this.requesting[path]) {
                this.once(this.requesting[path], callback)
                return
            }
            this.requesting[path] = path
        }
        request.hostname = this.restHost
        request.headers = request.headers || {
            Authorization: "Bearer " + this.accessToken
        }

        this._sendRequest(request, (error, body, statusCode) => {
            callback(error, body, statusCode)
            if (method === "GET") {
                this.trigger(this.requesting[path], error, body, statusCode)
                delete this.requesting[path]
            }
        })
    }