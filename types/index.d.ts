export default class WebTour {
    constructor(options?: {});
    options: {
        animate: boolean;
        opacity: number;
        offset: number;
        borderRadius: number;
        allowClose: boolean;
        highlight: boolean;
        highlightOffset: number;
        keyboard: boolean;
        width: string;
        zIndex: number;
        removeArrow: boolean;
        onNext: () => any;
        onPrevious: () => any;
    };
    steps: any[];
    stepIndex: number;
    isRunning: boolean;
    isPaused: boolean;
    window: Window & typeof globalThis;
    document: Document;
    onClick(e: any): void;
    onResize(): void;
    onKeyUp(event: any): void;
    bind(): void;
    setSteps(steps: any): void;
    getSteps(): any[];
    highlight(element: any, step?: any): void;
    start(startIndex?: number): void;
    stop(): void;
    showLoader(): void;
    moveNext(): void;
    movePrevious(): void;
    onNext(): void;
    onPrevious(): void;
    /**go to next step */
    next(): boolean;
    previous(): boolean;
    render(step: any): void;
    clear(): void;
    getWindowOffset(): {
        height: number;
        width: number;
    };
    getOffset(el: any): {
        top: number;
        left: number;
    };
    getTranslateXY(element: any): {
        translateX: number;
        translateY: number;
    };
    getTranslate3D(element: any): {
        X: number;
        Y: number;
        Z: number;
    } | {
        X: string;
        Y: string;
        Z: string;
    };
    getElementPosition(element: any): {
        top: number;
        left: number;
    };
    positionPopover(element: any, popover: any, arrow: any, step: any): void;
    createOverlay(element: any, step?: any): void;
}
