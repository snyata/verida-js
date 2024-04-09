/// <reference types="node" />
import { Client, Context } from '@verida/client-ts';
import { VaultAccount } from '@verida/account-web-vault';
import { EventEmitter } from 'events';
import type { ClientConfig, ContextConfig, DatabaseOpenConfig, DatastoreOpenConfig, AccountVaultConfig } from '@verida/types';
export interface WebUserProfile {
    name?: string;
    avatarUri?: string;
    country?: string;
    description?: string;
}
export interface WebUserConfig {
    clientConfig: ClientConfig;
    accountConfig: AccountVaultConfig;
    contextConfig: ContextConfig;
    debug?: boolean;
}
export interface WebUserMessage {
    subject: string;
    text: string;
    link?: WebUserMessageLink;
}
export interface WebUserMessageLink {
    url: string;
    text: string;
}
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
export declare class WebUser extends EventEmitter {
    private config;
    private client;
    private context?;
    private account?;
    private did?;
    private profile?;
    private profileConnection?;
    private connecting?;
    constructor(config: WebUserConfig);
    /**
     * Check if the user is connected.
     *
     * Connected means the 'context', the 'account' and the 'did' are defined.
     *
     * @returns 'true' if connected, 'false' otherwise.
     */
    isConnected(): boolean;
    /**
     * Check a user is connected, throw an error if not.
     *
     * @throws An error if the user isn't connected.
     */
    private requireConnection;
    /**
     * Get the instance of the Verida Client.
     *
     * @returns The Verida Client instance.
     */
    getClient(): Client;
    /**
     * Get the Verida Context for this Application.
     *
     * @throws An error if the user isn't connected.
     * @returns The Verida Context instance.
     */
    getContext(): Context;
    /**
     * Get the Verida Account for this user.
     *
     * @throws An error if the user isn't connected.
     * @returns The Verida Account instance.
     */
    getAccount(): VaultAccount;
    /**
     * Get the DID of the connected user.
     *
     * @throws An error if the user isn't connected.
     * @returns The user's DID.
     */
    getDid(): string;
    /**
     * Fetch the public profile from the user's Vault.
     *
     * @param ignoreCache Ignore the cached version of the profile and force refresh a new copy of the profile.
     * @returns A Promise that will resolve to the user's public profile.
     */
    getPublicProfile(ignoreCache?: boolean): Promise<WebUserProfile>;
    /**
     * Connect the user if a session already exists locally. It won't prompt the user to login.
     *
     * @returns A promise resolving to 'true' if the user is now connected, 'false' otherwise.
     */
    autoConnectExistingSession(): Promise<boolean>;
    /**
     * Connect the user to the Verida Network.
     *
     * @emit connected When the user successfully logs in
     * @returns A Promise that will resolve to true / false depending on if the user is connected
     */
    connect(): Promise<boolean>;
    /**
     * Disconnect the user from the Verida Network.
     *
     * @emit disconnected When the user is successfully logged out.
     */
    disconnect(): Promise<void>;
    /**
     * Send a generic message to a user's inbox (accessible from the Verida Wallet).
     *
     * @param {string} did
     * @param {WebUserMessage} message the message definition
     */
    sendMessage(did: string, message: WebUserMessage): Promise<object | null>;
    /**
     * Open a datastore owned by this user.
     *
     * @param {string} schemaURL
     * @param {DatastoreOpenConfig} config
     * @returns A Promise that will resolve to the datastore instance.
     */
    openDatastore(schemaURL: string, config?: DatastoreOpenConfig): Promise<import("@verida/client-ts/dist/context/datastore").default>;
    /**
     * Open a database owned by this user.
     *
     * @param {string} databaseName
     * @param {DatabaseOpenConfig} config
     * @returns A Promise that will resolve to the database instance.
     */
    openDatabase(databaseName: string, config?: DatabaseOpenConfig): Promise<import("@verida/types").IDatabase>;
}
