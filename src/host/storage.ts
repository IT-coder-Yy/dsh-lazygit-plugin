import type { ProposalStorageUnit } from './proposal-service'

interface StorageKv {
  open(descriptor: Record<string, unknown>): Promise<ProposalStorageUnit>
}

/** Import the previous name once; keep the original unit as a backup. */
export async function openStorage(kv: StorageKv, name: 'chats' | 'proposals', table: string): Promise<ProposalStorageUnit> {
  const unit = await kv.open({ name: 'lazygit_' + name, version: 1, tables: [table, 'migrations'], hasGlobal: false })
  try {
    const snapshot = await unit.loadAll()
    if (snapshot.tables.migrations?.renamed === true) return unit
    const legacy = await kv.open({ name: 'easygit_' + name, version: 1, tables: [table], hasGlobal: false })
    try {
      const old = await legacy.loadAll()
      for (const [key, value] of Object.entries(old.tables[table] ?? {})) {
        if (!Object.hasOwn(snapshot.tables[table] ?? {}, key)) await unit.putRecord(table, key, value)
      }
    } finally { await legacy.close() }
    // Write last so interrupted imports can retry without reviving deleted records later.
    await unit.putRecord('migrations', 'renamed', true)
    return unit
  } catch (error) {
    await unit.close()
    throw error
  }
}
