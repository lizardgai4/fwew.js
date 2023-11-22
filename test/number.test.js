/* spell-checker: disable */
const expect = require('chai').expect
const { naviToNumber, numberToNavi } = require('../lib')

describe('numbers module', function () {
  describe('#naviToNumber()', function () {
    it('should convert number string to number', function (done) {
      naviToNumber('volaw').then((result) => {
        expect(result.octal).to.equal(0o11)
        done()
      })
    })

    it('should convert kew to 0', function (done) {
      naviToNumber('kew').then((result) => {
        expect(result.octal).to.equal(0)
        done()
      })
    })

    it('should convert numbers in range [1, 7]', function (done) {
      const params = [
        { navi: 'aw', octal: 0o1 },
        { navi: 'mune', octal: 0o2 },
        { navi: 'pukap', octal: 0o6 },
        { navi: 'kinä', octal: 0o7 }
      ]
      ;(async () => {
        for (const param of params) {
          const result = await naviToNumber(param.navi)
          expect(result.octal).to.equal(param.octal)
        }
      })().then(done)
    })

    it('should return 0 for bogus inputs', function (done) {
      naviToNumber('tsleng').then((result) => {
        expect(result.octal).to.equal(0)
        done()
      })
    })
  })

  describe('#numberToNavi()', function () {
    it("should convert number into Na'vi number string", function () {
      expect(numberToNavi(0o100)).to.equal('zam')
    })
    it('should return empty string if number is outside the range [0, 32767]', function () {
      expect(numberToNavi(-1337)).to.equal('')
      expect(numberToNavi(32800)).to.equal('')
    })
    it('should return numbers in range [0, 7]', function () {
      expect(numberToNavi(0)).to.equal('kew')
      expect(numberToNavi(5)).to.equal('mrr')
      expect(numberToNavi(7)).to.equal('kinä')
    })
    it('should support words ending in vol or volaw', function () {
      expect(numberToNavi(0o10)).to.equal('vol')
      expect(numberToNavi(0o20)).to.equal('mevol')
      expect(numberToNavi(0o31)).to.equal('pxevolaw')
    })
    it('should convert 0o101 to zamaw', function () {
      expect(numberToNavi(0o101)).to.equal('zamaw')
    })
    it('should convert 0o77777', function () {
      expect(numberToNavi(0o77777)).to.equal('kizazamkivozamkizamkivohin')
    })
  })
})
