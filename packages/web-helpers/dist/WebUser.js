"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebUser = void 0;
var client_ts_1 = require("@verida/client-ts");
var account_web_vault_1 = require("@verida/account-web-vault");
var events_1 = require("events");
// TODO: To move to a single constants in the SDK
var VAULT_CONTEXT_NAME = "Verida: Vault";
/**
 * Usage:
 *
 * 1. Create a new instance of this class with the required configuration.
 * 2. Check if the user is logged in with this.isConnected()
 * 3. Log the user in with this.connect()
 * 4. Listen to when the user has logged in with this.on('connected')
 * 5. Listen to when the user updates their profile with this.on('profileUpdated')
 * 5. Listen to when the user logs out with this.on('disconnected')
 *
 * @event profileChanged
 * @event connect
 * @event disconnected
 */
var WebUser = /** @class */ (function (_super) {
    __extends(WebUser, _super);
    function WebUser(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.client = new client_ts_1.Client(config.clientConfig);
        return _this;
    }
    /**
     * Check if the user is connected.
     *
     * Connected means the 'context', the 'account' and the 'did' are defined.
     *
     * @returns 'true' if connected, 'false' otherwise.
     */
    WebUser.prototype.isConnected = function () {
        return !!this.context && !!this.account && !!this.did;
    };
    /**
     * Check a user is connected, throw an error if not.
     *
     * @throws An error if the user isn't connected.
     */
    WebUser.prototype.requireConnection = function () {
        if (!this.isConnected()) {
            throw new Error('Not connected to Verida Network');
        }
    };
    /**
     * Get the instance of the Verida Client.
     *
     * @returns The Verida Client instance.
     */
    WebUser.prototype.getClient = function () {
        return this.client;
    };
    /**
     * Get the Verida Context for this Application.
     *
     * @throws An error if the user isn't connected.
     * @returns The Verida Context instance.
     */
    WebUser.prototype.getContext = function () {
        this.requireConnection();
        return this.context; // We know it's not undefined
    };
    /**
     * Get the Verida Account for this user.
     *
     * @throws An error if the user isn't connected.
     * @returns The Verida Account instance.
     */
    WebUser.prototype.getAccount = function () {
        this.requireConnection();
        return this.account; // We know it's not undefined
    };
    /**
     * Get the DID of the connected user.
     *
     * @throws An error if the user isn't connected.
     * @returns The user's DID.
     */
    WebUser.prototype.getDid = function () {
        this.requireConnection();
        return this.did; // We know it's not undefined
    };
    /**
     * Fetch the public profile from the user's Vault.
     *
     * @param ignoreCache Ignore the cached version of the profile and force refresh a new copy of the profile.
     * @returns A Promise that will resolve to the user's public profile.
     */
    WebUser.prototype.getPublicProfile = function (ignoreCache) {
        if (ignoreCache === void 0) { ignoreCache = false; }
        return __awaiter(this, void 0, void 0, function () {
            var connection, profile, avatar, _a;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.requireConnection();
                        if (!ignoreCache && this.profile) {
                            // return cached profile
                            return [2 /*return*/, this.profile];
                        }
                        if (!!this.profileConnection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.getClient().openPublicProfile(this.did, VAULT_CONTEXT_NAME)];
                    case 1:
                        connection = _c.sent();
                        if (!connection) {
                            throw new Error('No profile exists for this account');
                        }
                        this.profileConnection = connection;
                        // bind an event listener to find changes
                        this.profileConnection.listen(function () { return __awaiter(_this, void 0, void 0, function () {
                            var profile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getPublicProfile(true)];
                                    case 1:
                                        profile = _a.sent();
                                        this.emit('profileChanged', profile);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.profileConnection;
                        _c.label = 2;
                    case 2:
                        profile = this.profileConnection;
                        return [4 /*yield*/, profile.get('avatar')
                            // build a cached profile
                        ];
                    case 3:
                        avatar = _c.sent();
                        // build a cached profile
                        _a = this;
                        _b = {
                            avatarUri: avatar ? avatar.uri : undefined
                        };
                        return [4 /*yield*/, profile.get('name')];
                    case 4:
                        _b.name = _c.sent();
                        return [4 /*yield*/, profile.get('country')];
                    case 5:
                        _b.country = _c.sent();
                        return [4 /*yield*/, profile.get('description')];
                    case 6:
                        // build a cached profile
                        _a.profile = (_b.description = _c.sent(),
                            _b);
                        return [2 /*return*/, this.profile];
                }
            });
        });
    };
    /**
     * Connect the user if a session already exists locally. It won't prompt the user to login.
     *
     * @returns A promise resolving to 'true' if the user is now connected, 'false' otherwise.
     */
    WebUser.prototype.autoConnectExistingSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ((0, account_web_vault_1.hasSession)(this.config.contextConfig.name)) {
                    return [2 /*return*/, this.connect()];
                }
                return [2 /*return*/, this.isConnected()];
            });
        });
    };
    /**
     * Connect the user to the Verida Network.
     *
     * @emit connected When the user successfully logs in
     * @returns A Promise that will resolve to true / false depending on if the user is connected
     */
    WebUser.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, webUser;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isConnected()) {
                    return [2 /*return*/, true];
                }
                if (this.connecting) {
                    // Have an existing promise (that may or may not be resolved)
                    // Return it so if it's pending, the requestor will wait
                    return [2 /*return*/, this.connecting];
                }
                config = this.config;
                webUser = this;
                this.connecting = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var account, context, did, profile;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                account = new account_web_vault_1.VaultAccount(config.accountConfig);
                                return [4 /*yield*/, client_ts_1.Network.connect({
                                        client: config.clientConfig,
                                        account: account,
                                        context: config.contextConfig
                                    })];
                            case 1:
                                context = _a.sent();
                                if (!context) {
                                    if (config.debug) {
                                        console.log('User cancelled login attempt by closing the QR code modal or an unexpected error occurred');
                                    }
                                    webUser.connecting = undefined;
                                    resolve(false);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, account.did()];
                            case 2:
                                did = _a.sent();
                                this.did = did;
                                this.account = account;
                                this.context = context;
                                this.client = context.getClient();
                                if (config.debug) {
                                    console.log("Account connected with did: ".concat(did));
                                }
                                return [4 /*yield*/, this.getPublicProfile()];
                            case 3:
                                profile = _a.sent();
                                this.emit('connected', profile);
                                webUser.connecting = undefined;
                                resolve(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, this.connecting];
            });
        });
    };
    /**
     * Disconnect the user from the Verida Network.
     *
     * @emit disconnected When the user is successfully logged out.
     */
    WebUser.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var context_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        context_1 = this.getContext();
                        return [4 /*yield*/, context_1.disconnect()];
                    case 1:
                        _a.sent();
                        this.context = undefined;
                        this.account = undefined;
                        this.did = undefined;
                        this.profile = undefined;
                        this.profileConnection = undefined;
                        this.connecting = undefined;
                        if (this.config.debug) {
                            console.log("Account disconnected");
                        }
                        this.emit('disconnected');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error && error_1.message.match('Not connected')) {
                            return [2 /*return*/];
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a generic message to a user's inbox (accessible from the Verida Wallet).
     *
     * @param {string} did
     * @param {WebUserMessage} message the message definition
     */
    WebUser.prototype.sendMessage = function (did, message) {
        return __awaiter(this, void 0, void 0, function () {
            var context, messaging, data, messageType, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.getContext();
                        return [4 /*yield*/, context.getMessaging()];
                    case 1:
                        messaging = _a.sent();
                        data = {
                            data: [{
                                    subject: message.subject,
                                    message: message.text,
                                    link: message.link ? message.link : undefined
                                }]
                        };
                        messageType = "inbox/type/message";
                        config = {
                            did: did,
                            recipientContextName: VAULT_CONTEXT_NAME
                        };
                        // Send the message across the Network
                        return [2 /*return*/, messaging.send(did, messageType, data, message.subject, config)];
                }
            });
        });
    };
    /**
     * Open a datastore owned by this user.
     *
     * @param {string} schemaURL
     * @param {DatastoreOpenConfig} config
     * @returns A Promise that will resolve to the datastore instance.
     */
    WebUser.prototype.openDatastore = function (schemaURL, config) {
        var context = this.getContext();
        return context.openDatastore(schemaURL, config);
    };
    /**
     * Open a database owned by this user.
     *
     * @param {string} databaseName
     * @param {DatabaseOpenConfig} config
     * @returns A Promise that will resolve to the database instance.
     */
    WebUser.prototype.openDatabase = function (databaseName, config) {
        var context = this.getContext();
        return context.openDatabase(databaseName, config);
    };
    return WebUser;
}(events_1.EventEmitter));
exports.WebUser = WebUser;
//# sourceMappingURL=WebUser.js.map