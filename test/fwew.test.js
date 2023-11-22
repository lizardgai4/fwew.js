/* spell-checker: disable */
const expect = require('chai').expect
const {
  fwew,
  fwew1D,
  fwew1DReverse,
  fwewReverse,
  fwewSimple,
  search
} = require('../lib')

describe('fwew module', () => {
  describe('#fwew()', () => {
    let results

    beforeEach(() => {
      results = [[]]
    })

    it('should return 1 result for fmetok', async () => {
      // fwew fmetok
      results = await fwew('fmetok')
      expect(results.length).to.equal(1)
      expect(results[0][0].Navi).to.equal('fmetok')
    })

    it('should return empty list when searching empty string', async () => {
      // fwew ''
      results = await fwew('')
      expect(results.length).to.equal(1)
      expect(results[0].length).to.equal(0)
    })

    it('should handle affixes', async () => {
      // fwew ftivia
      const results = await fwew('ftivia')
      expect(results.length).to.equal(1)
      expect(results[0][0].Affixes.Infix.length).to.equal(1)
      expect(results[0][0].Affixes.Infix[0]).to.equal('iv')
    })

    it('should handle kivanom', async () => {
      // fwew kivanom
      const results = await fwew('kivanom')
      expect(results.length).to.equal(1)
      expect(results[0][0].Affixes.Infix.length).to.equal(1)
      expect(results[0][0].Affixes.Infix[0]).to.equal('iv')
    })
  })

  describe('#fwew1D()', () => {
    let results

    beforeEach(() => {
      results = []
    })

    it('should return 1 result for fmetok', async () => {
      // fwew1D fmetok
      results = await fwew1D('fmetok')
      expect(results.length).to.equal(1)
      expect(results[0].Navi).to.equal('fmetok')
    })

    it('should return empty list when searching empty string', async () => {
      // fwew1D ''
      results = await fwew1D('')
      expect(results.length).to.equal(0)
    })

    it('should handle affixes', async () => {
      // fwew1D ftivia
      const results = await fwew1D('ftivia')
      expect(results.length).to.equal(1)
      expect(results[0].Affixes.Infix.length).to.equal(1)
      expect(results[0].Affixes.Infix[0]).to.equal('iv')
    })

    it('should handle kivanom', async () => {
      // fwew1D kivanom
      const results = await fwew1D('kivanom')
      expect(results.length).to.equal(1)
      expect(results[0].Affixes.Infix.length).to.equal(1)
      expect(results[0].Affixes.Infix[0]).to.equal('iv')
    })
  })

  describe('#fwew1DReverse()', () => {
    let results
    beforeEach(() => {
      results = []
    })

    const parameterizedText = (param) => {
      // fwew -l=languageCode -r localized
      it(`should look up ${param.localized} in ${param.languageCode} and return ${param.numResults} results`, async () => {
        results = await fwew1DReverse(param.languageCode, param.localized)
        expect(results).to.exist
        expect(results.length).to.equal(param.numResults)
        for (const result of results) {
          expect(result).to.exist
          expect(
            result[param.languageCode.toUpperCase()].includes(param.localized)
          ).to.be.true
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
      { languageCode: 'sv', localized: 'hammarhuvud', numResults: 1 },
      { languageCode: 'tr', localized: 'yemek', numResults: 12 }
    ]

    params.forEach(parameterizedText)
  })

  describe('#fwewReverse()', () => {
    let results
    beforeEach(() => {
      results = [[]]
    })

    const parameterizedText = (param) => {
      // fwew -l=languageCode -r localized
      it(`should look up ${param.localized} in ${param.languageCode} and return ${param.numResults} results`, async () => {
        results = await fwewReverse(param.languageCode, param.localized)
        expect(results).to.exist
        expect(results.length).to.equal(1)
        expect(results[0].length).to.equal(param.numResults)
        for (const result of results) {
          expect(result).to.exist
          expect(
            result[0][param.languageCode.toUpperCase()].includes(
              param.localized
            )
          ).to.be.true
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
      { languageCode: 'sv', localized: 'hammarhuvud', numResults: 1 },
      { languageCode: 'tr', localized: 'ingilizce', numResults: 2 }
    ]

    params.forEach(parameterizedText)
  })

  describe('#fwewSimple()', () => {
    let results

    beforeEach(() => {
      results = [[]]
    })

    it('should return 1 result for fmetok', async () => {
      // fwewSimple fmetok
      results = await fwewSimple('fmetok')
      expect(results.length).to.equal(1)
      expect(results[0][0].Navi).to.equal('fmetok')
    })

    it('should return empty list when searching empty string', async () => {
      // fwewSimple ''
      results = await fwewSimple('')
      expect(results.length).to.equal(1)
      expect(results[0].length).to.equal(0)
    })

    it('should handle affixes', async () => {
      // fwewSimple ftivia
      const results = await fwewSimple('ftivia')
      expect(results.length).to.equal(1)
      expect(results[0][0]).to.equal(undefined)
    })

    it('should handle kivanom', async () => {
      // fwewSimple kivanom
      const results = await fwewSimple('kivanom')
      expect(results.length).to.equal(1)
      expect(results.length).to.equal(1)
      expect(results[0][0]).to.equal(undefined)
    })
  })

  describe('#search()', () => {
    let results

    beforeEach(() => {
      results = [[]]
    })

    it('should return 1 result for fmetok', async () => {
      // fwew fmetok
      results = await search('en', 'fmetok')
      expect(results.length).to.equal(1)
      expect(results[0][0].Navi).to.equal('fmetok')
    })

    it('should return empty list when searching empty string', async () => {
      // fwew ''
      results = await search('en', '')
      expect(results.length).to.equal(1)
      expect(results[0].length).to.equal(0)
    })

    it('should handle affixes', async () => {
      // fwew ftivia
      const results = await search('en', 'ftivia')
      expect(results.length).to.equal(1)
      expect(results[0][0].Affixes.Infix.length).to.equal(1)
      expect(results[0][0].Affixes.Infix[0]).to.equal('iv')
    })

    it('should handle kivanom', async () => {
      // fwew kivanom
      const results = await search('en', 'kivanom')
      expect(results.length).to.equal(1)
      expect(results[0][0].Affixes.Infix.length).to.equal(1)
      expect(results[0][0].Affixes.Infix[0]).to.equal('iv')
    })

    const parameterizedText = (param) => {
      // fwew -l=languageCode -r localized
      it(`should look up ${param.localized} in ${param.languageCode} and return ${param.numResults} results`, async () => {
        results = await search(param.languageCode, param.localized)
        expect(results).to.exist
        expect(results.length).to.equal(1)
        expect(results[0].length).to.equal(param.numResults)
        for (const result of results) {
          expect(result).to.exist
          expect(
            result[0][param.languageCode.toUpperCase()].includes(
              param.localized
            )
          ).to.be.true
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
      { languageCode: 'sv', localized: 'hammarhuvud', numResults: 1 },
      { languageCode: 'tr', localized: 'ingilizce', numResults: 2 }
    ]

    params.forEach(parameterizedText)
  })
})
