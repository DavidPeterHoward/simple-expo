/// <reference path="../node_modules/realm/types/index.d.ts" />
/// <reference path="../node_modules/realm/types/app.d.ts" />
/// <reference path="../node_modules/realm/types/services.d.ts" />
/// <reference path="../node_modules/realm/types/auth-providers.d.ts" />

// If working on web purely, change these to /realm-web/ instead
let realm: typeof Realm;

try {
  realm = require("realm");
} catch {
  realm = require("realm-web");
}

export default realm;
