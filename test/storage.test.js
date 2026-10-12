'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { helpers } = require('../lib')

function fixture(stores) {
  const opened = [], closed = [], active = new Set()
  const kv = { open: async ({ name, tables }) => {
    assert.equal(active.has(name), false)
    active.add(name)
    opened.push(name)
    const records = stores[name] ??= {}
    for (const table of tables) records[table] ??= {}
    return {
      loadAll: async () => ({ tables: structuredClone(records), global: null }),
      putRecord: async (table, key, value) => {
        if (f.failWrite?.(name, table, key)) throw new Error('write failed')
        records[table][key] = structuredClone(value)
      },
      deleteRecord: async (table, key) => { delete records[table][key] },
      close: async () => { active.delete(name); closed.push(name) },
    }
  } }
  const f = { kv, stores, opened, closed, active }
  return f
}

for (const [name, table] of [['chats', 'links'], ['proposals', 'proposals']]) {
  test(name + ' 迁移保留旧数据、优先新记录，删除后重启不重新导入', async () => {
    const old = { same: { value: 'old' }, imported: { value: 'keep' } }
    const f = fixture({ ['easygit_' + name]: { [table]: structuredClone(old) }, ['lazygit_' + name]: { [table]: { same: { value: 'new' } } } })
    const unit = await helpers.openStorage(f.kv, name, table)
    assert.deepEqual((await unit.loadAll()).tables[table], { same: { value: 'new' }, imported: { value: 'keep' } })
    assert.deepEqual(f.stores['easygit_' + name][table], old)
    assert.deepEqual(f.closed, ['easygit_' + name])
    await unit.deleteRecord(table, 'imported')
    await unit.close()
    const restarted = await helpers.openStorage(f.kv, name, table)
    assert.deepEqual((await restarted.loadAll()).tables[table], { same: { value: 'new' } })
    assert.deepEqual(f.opened, ['lazygit_' + name, 'easygit_' + name, 'lazygit_' + name])
    await restarted.close()
  })
}

for (const failure of ['record', 'marker']) test('迁移写入失败可重试：' + failure, async () => {
  const records = { first: { sessionId: 'child-1', baseline: 1 }, second: { sessionId: 'child-2', baseline: 2 } }
  const f = fixture({ easygit_chats: { links: structuredClone(records) } })
  f.failWrite = (_, table, key) => failure === 'marker' ? table === 'migrations' : key === 'second'
  await assert.rejects(helpers.openStorage(f.kv, 'chats', 'links'), /write failed/)
  assert.equal(f.active.size, 0)
  assert.equal(f.stores.lazygit_chats.migrations.renamed, undefined)
  assert.deepEqual(f.stores.easygit_chats.links, records)
  f.failWrite = undefined
  const unit = await helpers.openStorage(f.kv, 'chats', 'links')
  assert.deepEqual((await unit.loadAll()).tables.links, records)
  assert.equal(f.stores.lazygit_chats.migrations.renamed, true)
  await unit.close()
})

test('全新安装初始化新存储，不写入旧存储', async () => {
  const f = fixture({})
  const unit = await helpers.openStorage(f.kv, 'chats', 'links')
  await unit.putRecord('links', 'main', { sessionId: 'child', baseline: 0 })
  assert.deepEqual(f.stores.easygit_chats.links, {})
  assert.deepEqual(f.stores.lazygit_chats.links.main, { sessionId: 'child', baseline: 0 })
  await unit.close()
})
