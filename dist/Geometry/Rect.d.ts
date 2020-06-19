import { Point } from "./Point";
import { GeometryBase } from "./GeometryBase";
export declare class Rect extends GeometryBase {
    p1: Point;
    p2: Point;
    constructor(p1?: any, p2?: any, precision?: any);
    set(p1?: any, p2?: any): this;
    isOverlapping(other: any): boolean;
    isInside(...points: any[]): boolean;
    moveAt(value: any): void;
    getOverlappingRect(other: any): Rect;
    getArea(): number;
    getDimension(): Point;
    copy(): Rect;
    isTouching(other: any): boolean;
    equals(other: any): boolean;
}
