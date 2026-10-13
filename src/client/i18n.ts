import { english } from './messages'
const React = require('react') as typeof import('react')

export type Language = 'zh-CN' | 'en'
const STORAGE_KEY = 'dsh-lazygit-language'
const listeners = new Set<() => void>()
let language: Language = 'zh-CN'
try { if (window.localStorage.getItem(STORAGE_KEY) === 'en') language = 'en' } catch { /* Storage may be unavailable. */ }

export function getLanguage(): Language { return language }
export function setLanguage(next: Language): void {
  if (next !== 'zh-CN' && next !== 'en') return
  if (language === next) return
  language = next
  try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* Keep the selection for this page. */ }
  for (const listener of listeners) listener()
}
function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
export function useLanguage(): Language {
  return React.useSyncExternalStore(subscribe, getLanguage, getLanguage)
}

/** Translate only plugin-owned copy; interpolation values remain untouched. */
export function t(message: string, ...values: Array<string | number>): string {
  const template = language === 'en' && Object.hasOwn(english, message) ? english[message]! : message
  return template.replace(/\{(\d+)\}/g, (token, index: string) => values[Number(index)] === undefined ? token : String(values[Number(index)]))
}

// Host messages and stored feedback remain in their original language until rendered.
const patterns = Object.keys(english).filter(key => /\{\d+\}/.test(key)).map(key => {
  const slots: number[] = []
  const expression = key.split(/(\{\d+\})/).map(part => {
    if (/^\{\d+\}$/.test(part)) { slots.push(Number(part.slice(1, -1))); return '(.*?)' }
    return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }).join('')
  return { key, slots, expression: new RegExp('^' + expression + '$') }
})
export function messageText(message: string): string {
  if (language !== 'en' || !message) return message
  if (Object.hasOwn(english, message)) return t(message)
  const newline = message.indexOf('\n')
  const first = newline < 0 ? message : message.slice(0, newline)
  const rest = newline < 0 ? '' : message.slice(newline)
  if (Object.hasOwn(english, first)) return t(first) + rest
  for (const { key, slots, expression } of patterns) {
    const match = expression.exec(first)
    if (!match) continue
    const values: string[] = []
    slots.forEach((slot, index) => { values[slot] = match[index + 1]! })
    return t(key, ...values) + rest
  }
  return message
}
