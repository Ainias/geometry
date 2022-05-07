import {Point} from "../../src/Geometry/Point";

xdescribe('point', () => {
    it('angle', () => {
        const v1 = new Point(-15.17536, 28.06176);
        const v2 = new Point(-15.50304, 28.38944);

        const angle = Point.angleOf(v1, v2);

        expect(angle).toBe(0);
    })

    it ("scalarProduct", () => {
        const v1 = new Point(-0.475682317576, 0.879615576306);
        const v2 = new Point(-0.479278811374, 0.877663803924);

        const scalarProduct = v1.scalarProduct(v2);
    })
})