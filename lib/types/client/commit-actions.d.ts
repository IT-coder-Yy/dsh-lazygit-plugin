import type { LazyGitAction, LazyGitRequest, LazyGitResponse } from '../shared/contracts';
interface Props {
    sessionId: string;
    revision: number;
    hash?: string;
    parents?: string[];
    disabled?: boolean;
    rpc<A extends LazyGitAction>(request: LazyGitRequest<A>, signal?: AbortSignal): Promise<LazyGitResponse<A>>;
    onChanged(): void;
    onConflicts(): void;
    onBusy?(busy: boolean): void;
    onCommand(label: string, command: string): (success: boolean) => void;
}
export declare function GitCommitActions(props: Props): import("react").DetailedReactHTMLElement<{
    className: string;
    'aria-label': string;
}, HTMLElement>;
export {};
