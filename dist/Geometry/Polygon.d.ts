import { GeometryBase } from "./GeometryBase";
export declare class Polygon extends GeometryBase {
    _face: any;
    _holes: any;
    constructor(face?: any, holes?: any, precision?: any);
    getFace(): any;
    getHoles(): any;
    containsPoint(p: any, withTouching: any): any;
    checkCollision(other: any): any;
    setHoles(holes: any): void;
    addHole(hole: any): boolean;
    removeUnnecessaryPoints(): this;
    union(...others: any[]): any;
    setminus(...others: any[]): any;
    intersection(...others: any[]): any[];
    static circle(center: any, radius: any, numPoints: any): Polygon;
    static arrayUnion(...polygons: any[]): any[];
    static rect(p1: any, p2: any): Polygon;
    __getSourceCode(index: any, parentArray?: any): string;
}
