import type { LazyGitAction, LazyGitRequest, LazyGitResponse } from '../shared/contracts';
export declare function rpc<A extends LazyGitAction>(body: LazyGitRequest<A>, signal?: AbortSignal): Promise<LazyGitResponse<A>>;
