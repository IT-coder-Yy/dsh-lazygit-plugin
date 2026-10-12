import type { LazyGitAction, LazyGitRequest, LazyGitResponse } from '../shared/contracts'

export function rpc<A extends LazyGitAction>(body: LazyGitRequest<A>, signal?: AbortSignal): Promise<LazyGitResponse<A>> {
  // DSH's document base preserves reverse-proxy prefixes as well as root deployments.
  return fetch('lazygit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  }).then(response => response.json() as Promise<LazyGitResponse<A>>)
}
