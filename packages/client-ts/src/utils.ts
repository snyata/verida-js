import EncryptionUtils from '@verida/encryption-utils';
import url from 'url';
import { Context } from '.';
import { PermissionOptionsEnum } from './context/interfaces';
import { FetchURIParams } from './interfaces';

export function generateObjectUri(
	did: string,
	contextName: string,
	databaseName: string,
	itemId?: string,
	params?: { key?: string }
): string {
	const contextHash = EncryptionUtils.hash(`${did}/${contextName}`);
	let uri = `verida://${did}/${contextHash}`;

	if (databaseName) {
		uri += `/${databaseName}`;
	}

	if (itemId) {
		uri += `/${itemId}`;
	}

	if (params && params.key) {
		const encryptionKey = Buffer.from(params.key).toString('hex');
		uri += '?key=' + encryptionKey;
	}

	return uri;
}

export function getUrlByPath(uri: string): FetchURIParams {
	const regex = /^verida:\/\/(.*)\/(.*)\/(.*)\/(.*)\?(.*)$/i;
	const matches = uri.match(regex);

	if (!matches) {
		throw new Error('Invalid URI');
	}

	const did = matches[1] as string;
	const contextHash = matches[2];
	const dbName = matches[3];
	const id = matches[4];
	const query = url.parse(uri, true).query;

	return {
		did,
		contextHash,
		dbName,
		id,
		query,
	};
}

export async function fetchCredentialURI(
	uri: string,
	context: Context
): Promise<string> {
	const url = getUrlByPath(uri);

	const db = await context.openExternalDatabase(url.dbName, url.did, {
		permissions: {
			read: PermissionOptionsEnum.PUBLIC,
			write: PermissionOptionsEnum.OWNER,
		},
		//@ts-ignore
		contextHash: url.contextHash,
		readOnly: true,
	});

	const item = (await db.get(url.id, {})) as any;

	const key = Buffer.from(url.query.key as string, 'hex');

	const decrypted = EncryptionUtils.symDecrypt(item.content, key);

	return decrypted;
}
