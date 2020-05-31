import { Point } from "./Point";
export declare class Rect {
    p1: Point;
    p2: Point;
    constructor(p1?: any, p2?: any);
    set(p1?: any, p2?: any): this;
    isOverlapping(other: any): boolean;
    isInside(...points: any[]): boolean;
    moveAt(value: any): void;
    getOverlappingRect(other: any): Rect;
    getArea(): number;
    getDimension(): Point;
    copy(): Rect;
    isTouching(other: any): boolean;
    equals(other: any, delta: any): boolean;
    splitIntoSingleRects(): any[];
    forEachPoint(callback: any): void;
    every(callback: any): boolean;
    some(callback: any): boolean;
    static isInsideOneRect(rects: any, ...point: any[]): any;
    static getCircumferencePath(rects: any, directions: any): any[];
}
