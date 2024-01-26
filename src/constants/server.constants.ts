class ResMessage {
    static dbErr = "Oops! Something went wrong while communicating with database. Plz try later 🗄️."
    static controllerErr = "Oops! Something went wrong while listening to your request on server. Plz try later 🗄️."
    static validationErr = "Invalid payload."
    static unauthorizedErr = "Unauthorized api call."
}
class ResStatus {
    // success                  -> 200 succesffully executed.
    // created                  -> 201 resource created (e.g. insert, add).
    // bad-request              -> 400 a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    // unauthorized             -> 401 need to authenticate.
    // forbidden                -> 403 not allowed.
    // not-found                -> 404 wrong url -> the endpoint is valid but the resource itself does not exist.
    // method-not-allowed       -> 405 using get required post.
    // request-timeout          -> 408 timoout limmit reached maybe sloe internet.
    // internal-server-error    -> 500 server error (something wrong withe code).
    // bad-gateway              -> 502 an another api server was using stop responding or giving error.
    // service-unavailable      -> 503 can not process the request right now due to any reason.

    static success = 200;
    static created = 201;
    static badRequest = 400;
    static unauthorized = 401;
    static forbidden = 403;
    static notFound = 404;
    static methodNotAllowed = 405;
    static requestTimeout = 408;
    static internalServerError = 500;
    static badGateway = 502;
    static serviceUnavailable = 503;
}

export { ResMessage, ResStatus }