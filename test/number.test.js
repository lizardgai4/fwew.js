//  This file is part of fwew.js.
//  fwew.js is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//  fwew.js is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with fwew.js.  If not, see http://gnu.org/licenses/
/* spell-checker: disable */
const expect = require('chai').expect
const {
  numbers: { naviToNumber, numberToNavi }
} = require('../lib')

describe('numbers module', () => {
  describe('#naviToNumber()', () => {
    it('should convert number string to number', () => {
      expect(naviToNumber('volaw')).to.equal(0o11)
    })

    it('should convert kew to 0', () => {
      expect(naviToNumber('kew')).to.equal(0)
    })

    it('should convert numbers in range [1, 7]', () => {
      expect(naviToNumber('aw')).to.equal(1)
      expect(naviToNumber('mune')).to.equal(2)
      expect(naviToNumber('pukap')).to.equal(6)
      expect(naviToNumber('kinä')).to.equal(7)
    })

    it('should return 0 for bogus inputs', () => {
      expect(naviToNumber('tsleng')).to.equal(0)
    })
  })

  describe('#numberToNavi()', () => {
    it("should convert number into Na'vi number string", () => {
      expect(numberToNavi(0o100)).to.equal('zam')
    })
    it('should return empty string if number is outside the range [0, 32767]', () => {
      expect(numberToNavi(-1337)).to.equal('')
      expect(numberToNavi(32800)).to.equal('')
    })
    it('should return numbers in range [0, 7]', () => {
      expect(numberToNavi(0)).to.equal('kew')
      expect(numberToNavi(5)).to.equal('mrr')
      expect(numberToNavi(7)).to.equal('kinä')
    })
    it('should support words ending in vol or volaw', () => {
      expect(numberToNavi(0o10)).to.equal('vol')
      expect(numberToNavi(0o20)).to.equal('mevol')
      expect(numberToNavi(0o31)).to.equal('pxevolaw')
    })
    it('should convert 0o101 to zamaw', () => {
      expect(numberToNavi(0o101)).to.equal('zamaw')
    })
    it('should convert 0o77777', () => {
      expect(numberToNavi(0o77777)).to.equal('kizazamkivozamkizamkivohin')
    })
  })
})
