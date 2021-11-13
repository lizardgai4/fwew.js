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

const expect = require('chai').expect;
const {
  util: {
    containsArr,
    deleteElement,
    deleteEmpty,
    isLetter,
    reverse,
    stripChars,
    intersection,
    glob,
    combineArrays
  }
} = require('../lib')

describe('util module', () => {
  describe('#containsArr()', () => {
    it('should return true when the array contains anything specified', () => {
      const result = containsArr(['a', 'b'], ['b', 'c'])
      expect(result).to.be.true
    })

    it('should return false when the array does not contain anything specified', () => {
      const result = containsArr(['a', 'b'], ['c', 'd'])
      expect(result).to.be.false
    })

    it('should return false if 1st array is empty', () => {
      const result = containsArr([], ['a', 'b'])
      expect(result).to.be.false
    })

    it('should return false when 2nd array is empty', () => {
      const result = containsArr(['a', 'b'], [])
      expect(result).to.be.false
    })
  })

  describe('#deleteElement()', () => {
    it('should delete all given string in array', () => {
      const arr = ['b', 'a', 'b', 'c', 'b']
      const result = deleteElement(arr, 'b')
      result.forEach(r => expect(r === 'b').to.be.false)
    })
  })

  describe('#deleteEmpty()', () => {
    it('should return empty array when array is null', () => {
      const result = JSON.stringify(deleteEmpty(null))
      expect(result).to.equal('[]')
    })
    it('should return empty array when array is undefined', () => {
      const result = JSON.stringify(deleteEmpty(undefined))
      expect(result).to.equal('[]')
    })
    it('should remove all empty items from array', () => {
      const result = deleteEmpty(['a', 'b', '', undefined, null, '', 'd'])
      result.forEach(r => {
        expect(r).not.to.equal('')
        expect(r).not.to.equal(null)
        expect(r).not.to.equal(undefined)
      })
    })
  })

  describe('#isLetter()', () => {
    it('should return true when string is a letter', () => {
      expect(isLetter('a')).to.be.true
    })

    it('should return false when string is not a letter', () => {
      expect(isLetter('!')).to.be.false
    })

    it('should return false when string is null', () => {
      expect(isLetter(null)).to.be.false
    })

    it('should return false when string is undefined', () => {
      expect(isLetter(undefined)).to.be.false
    })
  })

  describe('#reverse()', () => {
    it('should reverse the string', () => {
      expect(reverse('1234')).to.equal('4321')
    })

    it('should return null if string is null', () => {
      expect(reverse(null)).to.equal(null)
    })

    it('should return undefined if string is undefined', () => {
      expect(reverse(undefined)).to.equal(undefined)
    })
  })

  describe('#stripChars()', () => {
    it('should remove given characters', () => {
      expect(stripChars('123abc123def123', '123')).to.equal('abcdef')
    })

    it('should return empty string when str is empty string', () => {
      expect(stripChars('', 'abc')).to.equal('')
    })

    it('should return str when chr is empty string', () => {
      expect(stripChars('abc123', '')).to.equal('abc123')
    })

    it('should return null when str is null', () => {
      expect(stripChars(null, 'abc')).to.be.null
    })

    it('should return undefined when str is undefined', () => {
      expect(stripChars(undefined, 'abc')).to.be.undefined
    })

    it('should return str when chr is null', () => {
      expect(stripChars('abc', null)).to.equal('abc')
    })

    it('should return str when chr is undefined', () => {
      expect(stripChars('abc', undefined)).to.equal('abc')
    })

    it('should return str when nothing in chr is in str', () => {
      expect(stripChars('abc', 'def')).to.equal('abc')
    })
  })

  describe('#intersection()', () => {
    it('should get the intersection between two intersecting strings', () => {
      expect(intersection('abc', 'bcd')).to.equal('bc')
    })

    it('should return empty string when the two strings do not intersect', () => {
      expect(intersection('abc', 'def')).to.equal('')
    })

    it('should return undefined when either string is null or undefined', () => {
      expect(intersection(null, 'abc')).to.be.undefined
      expect(intersection(undefined, 'abc')).to.be.undefined
      expect(intersection('def', null)).to.be.undefined
      expect(intersection('def', undefined)).to.be.undefined
    })
  })

  describe('#glob()', () => {
    it('should return true when pattern and subj are the same string with no glob', () => {
      expect(glob('foo', 'foo')).to.be.true
    })

    it('should return true when pattern and subj are both empty string', () => {
      expect(glob('', '')).to.be.true
    })

    it('should return true when pattern and subj are both null', () => {
      expect(glob(null, null)).to.be.true
    })

    it('should return true when pattern and subj are both undefined', () => {
      expect(glob(undefined, undefined)).to.be.true
    })

    it('should return true on match anything when pattern is GLOB', () => {
      expect(glob('%', 'anything')).to.be.true
    })

    it('should return true on match when GLOB is at beginning', () => {
      expect(glob('%bc', 'abc')).to.be.true
    })

    it('should return true on match when GLOB in is the middle', () => {
      expect(glob('a%c', 'abc')).to.be.true
    })

    it('should return true on match when GLOB is at the end', () => {
      expect(glob('ab%', 'abc')).to.be.true
    })

    it('should return true on match when there are multiple GLOBs', () => {
      expect(glob('%x%y%', '1x2y3')).to.be.true
    })

    it('should return false when either string is null or undefined', () => {
      expect(glob('foo', null)).to.be.false
      expect(glob('foo', undefined)).to.be.false
      expect(glob(null, 'foo')).to.be.false
      expect(glob(undefined, 'foo')).to.be.false
    })

    it('should return false when there was no way to match the pattern to subj with GLOB', () => {
      expect(glob('%a%b%c', 'xyz')).to.be.false
    })

    it('should return false when there was no way to match the pattern to subj without GLOB', () => {
      expect(glob('abcd', 'wxyz')).to.be.false
    })
  })

  describe('#combineArrays()', () => {
    it('should combine two defined non-null non-empty arrays', () => {
      const result = combineArrays(['a', 'b'], ['c', 'd'])
      expect(result).to.deep.equal(['a', 'b', 'c', 'd'])
    })

    it('should return empty array when both arrays are empty array', () => {
      expect(combineArrays([], [])).to.deep.equal([])
    })

    it('should return 1st array when 2nd array is empty or null or undefined', () => {
      expect(combineArrays([1, 2], [])).to.deep.equal([1, 2])
      expect(combineArrays([1, 2], null)).to.deep.equal([1, 2])
      expect(combineArrays([1, 2], undefined)).to.deep.equal([1, 2])
    })

    it('should return 2nd array when 1st array is empty', () => {
      expect(combineArrays([], [3, 4])).to.deep.equal([3, 4])
      expect(combineArrays(null, [3, 4])).to.deep.equal([3, 4])
      expect(combineArrays(undefined, [3, 4])).to.deep.equal([3, 4])
    })

    it('should return undefined when both arrays are null', () => {
      expect(combineArrays(null, null)).to.be.undefined
    })

    it('should return undefined when both arrays are undefined', () => {
      expect(combineArrays(undefined, undefined)).to.be.undefined
    })

    it('should return undefined when 1st array is null and 2nd array is undefined', () => {
      expect(combineArrays(null, undefined)).to.be.undefined
    })
    
    it('should return undefined when 1nd array is undefined and 2nd array is null', () => {
      expect(combineArrays(undefined, null)).to.be.undefined
    })
  })
})