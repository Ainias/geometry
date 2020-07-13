import { GeometryBase } from "./GeometryBase";
export declare class Point extends GeometryBase {
    x: number;
    y: number;
    constructor(x?: any, y?: any, precision?: any);
    getX(): number;
    getY(): number;
    copy(): Point;
    multiply(factorOrPoint: any): this;
    crossProduct(other: any): number;
    scalarProduct(other: any): number;
    normalize(): this;
    divide(dividerOrPoint: any): this;
    sumOfParts(): number;
    productOfParts(): number;
    round(onDecimal?: any): this;
    ceil(): this;
    floor(): this;
    add(xOrPoint: any, y?: any): this;
    addX(x: any): this;
    addY(y: any): this;
    subtract(xOrPoint: any, y?: any): this;
    subtractX(x: any): this;
    subtractY(y: any): this;
    set(xOrPoint: any, y: any): this;
    setX(x: any): this;
    setY(y: any): this;
    abs(): this;
    isNaN(): boolean;
    smallerValuesThan(other: any): boolean;
    smallerEqualValuesThan(other: any): boolean;
    greaterValuesThan(other: any): boolean;
    greaterEqualValuesThan(other: any): boolean;
    smallerXThan(xOrOther: any): boolean;
    smallerYThan(yOrOther: any): boolean;
    greaterXThan(xOrOther: any): boolean;
    greaterYThan(yOrOther: any): boolean;
    smallerEqualXThan(xOrOther: any): boolean;
    smallerEqualYThan(yOrOther: any): boolean;
    greaterEqualXThan(xOrOther: any): boolean;
    greaterEqualYThan(yOrOther: any): boolean;
    equals(other: any, delta?: any): boolean;
    bound(rect: any): this;
    swapDimensions(): this;
    length(): number;
    toArray(): number[];
    rotate(angle: any, rotationPoint?: any): this;
    transform(m11: any, m12: any, m13: any, m21: any, m22: any, m23: any): this;
    static singleFromArray(pointArray: any): Point;
    static fromArray(array: any): any;
    static toArray(points: any): any;
    static max(...points: any[]): Point;
    static min(...points: any[]): Point;
    static indexOf(pointArray: any, point: any, fromIndex?: any): number;
    static angleOf(p1: any, p2: any): number;
}
