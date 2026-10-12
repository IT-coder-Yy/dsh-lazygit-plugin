import type { ProposalStorageUnit } from './proposal-service';
interface StorageKv {
    open(descriptor: Record<string, unknown>): Promise<ProposalStorageUnit>;
}
/** Import the previous name once; keep the original unit as a backup. */
export declare function openStorage(kv: StorageKv, name: 'chats' | 'proposals', table: string): Promise<ProposalStorageUnit>;
export {};
