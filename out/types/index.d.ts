/// <reference types="html-to-text" />
import { Options as JuiceOptions } from 'juice';
interface SvelteSSRComponent {
    render(data: {}): {
        html: string;
        css: {
            code: string;
        };
        head: string;
    };
}
export declare function renderMail(Component: SvelteSSRComponent, { data, ...options }?: {
    data?: {};
} & JuiceOptions & HtmlToTextOptions): Promise<{
    html: string;
    text: string;
}>;
export {};
