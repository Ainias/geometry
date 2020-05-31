import { Point } from "./Point";
export declare class Line {
    p1: Point;
    p2: Point;
    _gradient: number;
    constructor(p1: any, p2: any);
    length(): number;
    getGradient(): number;
    set(p1: any, p2: any): void;
    equals(other: any, direction: any): boolean;
    containsPoint(p: any): boolean;
    getIntersectionPointsWith(other: any): any[];
    getVector(): Point;
}
