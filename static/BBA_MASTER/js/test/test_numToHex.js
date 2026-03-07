
describe("numToHex4 and numToHex4Upper should return a string of length at least 4 containing specified hex number", function() {

    it("should work for single character hex numbers", function () {
        chai.expect(numToHex4(0xA)).to.eql("0x000a");
        chai.expect(numToHex4Upper(0xA)).to.eql("0x000A");
    })
    it("should work for double character hex numbers", function () {
        chai.expect(numToHex4(0xF1)).to.eql("0x00f1");
        chai.expect(numToHex4Upper(0xF1)).to.eql("0x00F1");
    })
    it("should work for triple character hex numbers", function () {
        chai.expect(numToHex4(0xFF1)).to.eql("0x0ff1");
        chai.expect(numToHex4Upper(0xFF1)).to.eql("0x0FF1");
    })
    it("should work for quadruple character hex numbers", function () {
        chai.expect(numToHex4(0xFFF1)).to.eql("0xfff1");
        chai.expect(numToHex4Upper(0xFFF1)).to.eql("0xFFF1");
    })
    it("should be the same length as input number when larger than 4 digits", function () {
        chai.expect(numToHex4(0xABCDEF)).to.eql("0xabcdef");
        chai.expect(numToHex4Upper(0xABCDEF)).to.eql("0xABCDEF");
    })
})
