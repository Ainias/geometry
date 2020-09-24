import { Point } from "./Point";
import { GeometryBase } from "./GeometryBase";
export declare class Line extends GeometryBase {
    p1: Point;
    p2: Point;
    _gradient: number;
    constructor(p1: any, p2: any, precision?: any);
    length(): number;
    getGradient(): number;
    multiply(pointOrFactor: any): this;
    copy(): Line;
    set(p1: any, p2: any): void;
    equals(other: any, direction?: any, delta?: any): boolean;
    containsPoint(p: any): boolean;
    getIntersectionPointsWith(other: any): any[];
    getVector(): Point;
    combine(other: any): any[];
    getCenter(): Point;
    rotate(angle: any, point?: any): this;
    getOrthogonalVector(): Point;
    static fromJson(jsonLine: any): Line;
    static combineArrays(lines: any, linesOther: any): any;
    static indexOf(lineArray: any, line: any, fromIndex?: any, direction?: any): number;
}
