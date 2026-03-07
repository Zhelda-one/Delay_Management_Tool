describe("BufferReader", function() {
    let buffer;
    let dataView;
    let bufferReader;
    const bufferLength = 32;

    beforeEach(function() {
        buffer = new ArrayBuffer(bufferLength);
        dataView = new DataView(buffer);
    });

    function RunOptions(name, isLittleEndian){
        this.name = name;
        this.isLittleEndian = isLittleEndian;
        return this;
    }
    const runs = [
        new RunOptions("Little Endian", true),
        new RunOptions("Big Endian", false)
    ];

    runs.forEach(function (run) {
        describe(run.name, function () {
            const isLittleEndian = run.isLittleEndian;

            beforeEach(function() {
                bufferReader = new BufferReader(buffer, 0, bufferLength, isLittleEndian);
            });

            it("should decode uint8", function() {
                dataView.setUint8(0, 255);
                expect(bufferReader.getU8()).to.eql(255);
            });

            it("should decode int8", function() {
                dataView.setInt8(0, -128);
                expect(bufferReader.getI8()).to.eql(-128);
            });

            it("should decode uint16", function() {
                dataView.setUint16(0, 65535, isLittleEndian);
                expect(bufferReader.getU16()).to.eql(65535);
            });

            it("should decode int16", function() {
                dataView.setInt16(0, -32768, isLittleEndian);
                expect(bufferReader.getI16()).to.eql(-32768);
            });

            it("should decode uint32", function() {
                dataView.setUint32(0, 4294967295, isLittleEndian);
                expect(bufferReader.getU32()).to.eql(4294967295);
            });

            it("should decode int32", function() {
                dataView.setInt32(0, -2147483648, isLittleEndian);
                expect(bufferReader.getI32()).to.eql(-2147483648);
            });

            it("should decode float32", function() {
                dataView.setFloat32(0, 3.14, isLittleEndian);
                expect(bufferReader.getF32()).to.be.closeTo(3.14, 0.001);
            });

            it("should decode float64", function() {
                dataView.setFloat64(0, 3.141592653589793, isLittleEndian);
                expect(bufferReader.getF64()).to.be.closeTo(3.141592653589793, 0.001);
            });

            it("should decode BigInt64", function() {
                dataView.setBigInt64(0, BigInt(-9223372036854775808), isLittleEndian);
                expect(bufferReader.getBI64()).to.eql(BigInt(-9223372036854775808));
            });

            it("should decode BigUint64", function() {
                dataView.setBigUint64(0, BigInt("0x1AFFFFFFFFFFFF2B"), isLittleEndian);
                expect(bufferReader.getBU64()).to.eql(BigInt("0x1AFFFFFFFFFFFF2B"));
            });

            it("should decode MAC address", function() {
                const macBytes = [0x00, 0x1A, 0x2B, 0x3C, 0x4D, 0x5E];
                macBytes.forEach((byte, index) => dataView.setUint8(index, byte));
                expect(bufferReader.getMac()).to.eql('00:1a:2b:3c:4d:5e');
            });

            it("should decode Uint8Array", function() {
                const array = new Uint8Array([1, 2, 3, 4, 5]);
                new Uint8Array(buffer).set(array);
                expect(bufferReader.getU8Array(5)).to.eql(array);
            });

            it("should decode mixed data types", function() {
                dataView.setUint8(0, 255);
                dataView.setInt16(1, -32768, isLittleEndian);
                dataView.setFloat32(3, 3.14, isLittleEndian);
                expect(bufferReader.getU8()).to.eql(255);
                expect(bufferReader.getI16()).to.eql(-32768);
                expect(bufferReader.getF32()).to.be.closeTo(3.14, 0.001);
            });

            it("should decode consecutive data with additional views", function() {
                dataView.setUint8(0, 255);
                dataView.setInt16(1, -32768, isLittleEndian);
                dataView.setFloat32(3, 3.14, isLittleEndian);
                const view1 = bufferReader.createView(7);
                expect(view1.getU8()).to.eql(255);
                expect(view1.getI16()).to.eql(-32768);
                const view2 = view1.createView(4);
                expect(view2.getF32()).to.be.closeTo(3.14, 0.001);

                expect(bufferReader.getU8()).to.eql(255);
            });
        });
    });
});