class ApiError {
    constructor(status, message) {
        // super();    
        this.status = status
        this.message = message
    }

    static BadRequest (message) {
        return new ApiError(484, message)
    }

    static internat (message) {
        return new ApiError(500, message)
    }

    static forbidden (message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError