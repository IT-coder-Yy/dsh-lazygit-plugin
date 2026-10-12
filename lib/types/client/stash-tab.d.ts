import type { LazyGitAction, LazyGitRequest, LazyGitResponse } from '../shared/contracts';
interface Props {
    sessionId: string;
    revision: number;
    rpc<A extends LazyGitAction>(request: LazyGitRequest<A>, signal?: AbortSignal): Promise<LazyGitResponse<A>>;
    onChanged(): void;
    onConflicts(): void;
    onCommand(label: string, command: string): (success: boolean) => void;
    renderReview(diff: string): React.ReactNode;
    renderRawDiff(diff: string): React.ReactNode;
}
export declare function GitStashesTab(props: Props): import("react").DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
export {};
