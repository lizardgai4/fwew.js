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
  fwew: { translateFromNavi, translateToNavi }
} = require('../lib')

describe('fwew module', () => {
  describe('#translateFromNavi()', () => {
    let results

    beforeEach(() => {
      results = []
    })

    it('should return 1 result for fmetok', () => {
      // fwew fmetok
      results = translateFromNavi('fmetok')
      expect(results.length).to.equal(1)
      expect(results[0].data.Navi).to.equal('fmetok')
    })

    it('should return empty list when searching empty string', () => {
      // fwew ''
      expect(translateFromNavi('').length).to.equal(0)
    })

    it('should handle affixes', () => {
      // fwew ftivia
      const results = translateFromNavi('ftivia')
      expect(results.length).to.equal(1)
      expect(results[0].data.Affixes.Infix.length).to.equal(1)
      expect(results[0].data.Affixes.Infix[0]).to.equal('iv')
    })

    it('should handle kivanom', () => {
      // fwew kivanom
      const results = translateFromNavi('kivanom')
      expect(results.length).to.equal(1)
      expect(results[0].data.Affixes.Infix.length).to.equal(1)
      expect(results[0].data.Affixes.Infix[0]).to.equal('iv')
    })
  })

  describe('#translateToNavi()', () => {
    let results
    beforeEach(() => {
      results = []
    })

    const parameterizedText = (param) => {
      // fwew -l=languageCode -r localized
      it(`should look up ${param.localized} in ${param.languageCode} and return ${param.numResults} results`, () => {
        results = translateToNavi(param.localized, param.languageCode)
        expect(results).to.exist
        expect(results.length).to.equal(param.numResults)
        for (const result of results) {
          expect(result).to.exist
          expect(result.data).to.exist
          expect(result.data[param.languageCode.toUpperCase()].includes(param.localized)).to.be.true
        }
      })
    }

    const params = [
      { languageCode: 'en', localized: 'test', numResults: 3 },
      { languageCode: 'de', localized: 'eins', numResults: 2 },
      { languageCode: 'et', localized: 'üks', numResults: 5 },
      { languageCode: 'fr', localized: '1', numResults: 1 },
      { languageCode: 'hu', localized: '1', numResults: 1 },
      { languageCode: 'nl', localized: 'één', numResults: 3 },
      { languageCode: 'pl', localized: 'jeden', numResults: 2 },
      { languageCode: 'ru', localized: 'один', numResults: 2 },
      { languageCode: 'sv', localized: 'hammarhuvud', numResults: 1},
    ]

    params.forEach(parameterizedText)
  })
})