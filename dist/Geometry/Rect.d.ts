import { Point } from "./Point";
import { GeometryBase } from "./GeometryBase";
export declare class Rect extends GeometryBase {
    p1: Point;
    p2: Point;
    constructor(p1?: any, p2?: any, precision?: any);
    containsPoint(point: any): boolean;
    set(p1?: any, p2?: any): this;
    multiply(pointOrFactor: any): this;
    add(point: any): this;
    isOverlapping(other: any): boolean;
    isInside(...points: any[]): boolean;
    moveAt(value: any): this;
    getOverlappingRect(other: any): Rect;
    getArea(): number;
    getDimension(): Point;
    copy(): Rect;
    isTouching(other: any): boolean;
    equals(other: any): boolean;
    getCenter(): Point;
    getPoints(): Point[];
    getXDiff(): number;
    getYDiff(): number;
}
