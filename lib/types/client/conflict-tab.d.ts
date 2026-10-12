import type { LazyGitAction, LazyGitRequest, LazyGitResponse } from '../shared/contracts';
interface Props {
    sessionId: string;
    revision: number;
    rpc<A extends LazyGitAction>(request: LazyGitRequest<A>, signal?: AbortSignal): Promise<LazyGitResponse<A>>;
    onChanged(): void;
    onDirty(dirty: boolean): void;
    onCommand(label: string, command: string): (success: boolean) => void;
}
export declare function GitConflictsTab(props: Props): import("react").DetailedReactHTMLElement<{
    className: string;
    'aria-label': string;
}, HTMLElement>;
export {};
