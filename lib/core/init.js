/**
 * The purpose of the `init` service is to be
 * the place where code that must be run before the
 * http service starts listening to incoming request.
 *
 * For example, if you need to verify that a database
 * is created, or pre-heat a cache this is where that
 * code belongs.
 *
 * I recommend not putting the actual business logic in
 * this file, but rather just the calls to init methods
 * of services. For example if the `github` service
 * had an `init()`, this is where you'd want to call it.
 */

export default async function init() {
}
