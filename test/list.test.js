/* spell-checker: disable */
const expect = require('chai').expect
const { list } = require('../lib')
const dictionary = require('./dictionary.json')

describe('list module', function () {
  this.timeout(60000)
  describe('#list()', function () {
    // list pos starts v
    it('should list all words whose part of speech starts with given string', function (done) {
      list('pos starts v').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.startsWith('v')).to.be.true
        )
        done()
      })
    })
    // list pos ends m.
    it('should list all words whose part of speech ends with given string', function (done) {
      list('pos ends m.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.PartOfSpeech.endsWith('m.')).to.be.true)
        done()
      })
    })
    // list pos has vin.
    it('should list all word whose part of speech contains given string', function (done) {
      list('pos has vin.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.includes('vin.')).to.be.true
        )
        done()
      })
    })
    // list pos is v.
    it('should list all word whose part of speech is exactly the given string', function (done) {
      list('pos is intj.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.PartOfSpeech === 'intj.').to.be.true)
        done()
      })
    })
    // list pos like v%.
    it('should list all word whose part of speech is like the given string', function (done) {
      list('pos like v%.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.match(/v.*\./g).length > 0).to.be.true
        )
        done()
      })
    })
    // list pos not-starts v
    it('should list all words whose part of speech does not start with given string', function (done) {
      list('pos not-starts v').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.startsWith('v')).to.be.false
        )
        done()
      })
    })
    // list pos not-ends m.
    it('should list all words whose part of speech does not end with given string', function (done) {
      list('pos not-ends m.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.endsWith('m.')).to.be.false
        )
        done()
      })
    })
    // list pos not-has vin.
    it('should list all words whose part of speech does not contain given string', function (done) {
      list('pos not-has vin.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.PartOfSpeech.includes('vin.')).to.be.false
        )
        done()
      })
    })
    // list pos not-is v.
    it('should list all words whose part of speech is exactly not the given string', function (done) {
      list('pos not-is v.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.PartOfSpeech === 'v.').to.be.false)
        done()
      })
    })
    // list pos not-like v%.
    it('should list all words whose part of speech is not like the given string', function (done) {
      list('pos not-like v%.').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => {
          expect(w.Navi.startsWith('v') && w.Navi.endsWith('.')).to.be.false
        })
        done()
      })
    })
    // list word starts ft
    it('should list all words that start with given string', function (done) {
      list('word starts ft').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Navi.startsWith('ft')).to.be.true)
        done()
      })
    })
    // list word ends ang
    it('should list all words that end with given string', function (done) {
      list('word ends ang').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Navi.endsWith('ang')).to.be.true)
        done()
      })
    })
    // list word has ts
    it('should list all words that include given string', function (done) {
      list('word has ts').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.Navi.toLowerCase().includes('ts')).to.be.true
        )
        done()
      })
    })
    // list word like f%w
    it('should list all words that are like given string', function (done) {
      list('word like f%w').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach(
          (w) => expect(w.Navi.match(/f.*w/g).length > 0).to.be.true
        )
        done()
      })
    })
    // list word not-starts ft
    it('should list all words that do not start with given string', function (done) {
      list('word not-starts ft').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Navi.startsWith('ft')).to.be.false)
        done()
      })
    })
    // list word not-ends ang
    it('should list all words that do not end with given string', function (done) {
      list('word not-ends ang').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Navi.endsWith('ang')).to.be.false)
        done()
      })
    })
    // list word not-has e
    // it('should list all words that do not include with given string', function (done) {
    //   list('word not-has e').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.Navi.includes('e')).to.be.false)
    //     done()
    //   })
    // })
    // list word not-like f%w
    it('should list all words that are not like given string', function (done) {
      list('word not-like f%w').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => {
          expect(w.Navi.startsWith('f') && w.Navi.endsWith('w')).to.be.false
        })
        done()
      })
    })
    // list words first 20
    // it('should list first 20 words released', function (done) {
    //   list('words first 20').then((results) => {
    //     expect(results.length).to.equal(20)
    //     results.forEach(
    //       (w, i) => expect(w.ID === dictionary[i].data.ID).to.be.true
    //     )
    //     done()
    //   })
    // })
    // // list words last 30
    // it('should list last 30 words released', function (done) {
    //   list('words last 30').then((results) => {
    //     expect(results.length).to.equal(30)
    //     results.forEach(
    //       (w, i) => expect(w.ID === dictionary.slice(-30)[i].data.ID).to.be.true
    //     )
    //     done()
    //   })
    // })
    // // list syllables > 1
    // it('should list all words with more than 1 syllable', function (done) {
    //   list('syllables > 1').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() > 1).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables = 2
    // it('should list all words with 2 syllables', function (done) {
    //   list('syllables = 2').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() === 2).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables <= 3
    // it('should list all words with at most 3 syllables', function (done) {
    //   list('syllables <= 3').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() <= 3).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables < 1
    // it('should return empty list for syllables < 1', function (done) {
    //   list('syllables < 1').then((results) => {
    //     expect(results.length).to.equal(0)
    //     done()
    //   })
    // })
    // // list syllables < 2
    // it('should return empty list for syllables < 2', function (done) {
    //   list('syllables < 2').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() < 2).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables >= 1
    // it('should return empty list for syllables >= 1', function (done) {
    //   list('syllables >= 1').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() >= 1).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables >= 10
    // it('should return empty list for syllables >= 10', function (done) {
    //   list('syllables >= 10').then((results) => {
    //     expect(results.length).to.equal(0)
    //     done()
    //   })
    // })
    // // list syllables != 1
    // it('should return empty list for syllables != 1', function (done) {
    //   list('syllables != 1').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach((w) => expect(w.syllableCount() !== 1).to.be.true)
    //     done()
    //   })
    // })
    // // list syllables = NaN
    // it('should return all words when spec is NaN on syllables', function (done) {
    //   list('syllables = NaN').then((results) => {
    //     expect(results.length).to.equal(dictionary.length)
    //     done()
    //   })
    // })
    // list stress < 2
    it('should return empty list for stress < 2', function (done) {
      list('stress < 2').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Stressed < 2).to.be.true)
        done()
      })
    })
    // list stress <= 2
    it('should return empty list for stress <= 2', function (done) {
      list('stress <= 2').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Stressed <= 2).to.be.true)
        done()
      })
    })
    // list stress = 1
    it('should list all words with stressed syllable position 1', function (done) {
      list('stress = 1').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(+w.Stressed === 1).to.be.true)
        done()
      })
    })
    // list stress = -1
    // it('should list all words with stressed syllable position -1', function (done) {
    //   list('stress = -1').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach(
    //       (w) => expect(+w.Stressed === w.syllableCount()).to.be.true
    //     )
    //     done()
    //   })
    // })
    // list stress >= 1
    it('should list all words with stressed syllable position >= 1', function (done) {
      list('stress >= 1').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(+w.Stressed >= 1).to.be.true)
        done()
      })
    })
    // list stress >= 10
    // it('return empty list for stressed syllable position >= 10', function (done) {
    //   list('stress >= 10').then((results) => {
    //     expect(results.length).to.equal(0)
    //     done()
    //   })
    // })
    // list stress > 2
    it('should return empty list for stress > 2', function (done) {
      list('stress > 2').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Stressed > 2).to.be.true)
        done()
      })
    })
    // list stress != 1
    it('should return empty list for stress !== 1', function (done) {
      list('stress != 1').then((results) => {
        expect(results.length).to.be.greaterThan(0)
        results.forEach((w) => expect(w.Stressed !== 1).to.be.true)
        done()
      })
    })
    // list stress != -1
    // it('should return empty list for stress !== -1', function (done) {
    //   list('stress != -1').then((results) => {
    //     expect(results.length).to.be.greaterThan(0)
    //     results.forEach(
    //       (w) => expect(w.Stressed !== w.syllableCount()).to.be.true
    //     )
    //     done()
    //   })
    // })
    // list word starts fme and word ends tok
    it('should support multiple sets of args (AND)', function (done) {
      list('word starts fme and word ends tok').then((results) => {
        expect(results.length).to.equal(1)
        results.forEach((w) => expect(w.Navi).to.equal('fmetok'))
        done()
      })
    })
    // words errors
    //   it('should return all words when first / last spec input is NaN', function (done) {
    //     list('words first NaN').then((results) => {
    //       expect(results.length).to.equal(dictionary.length)
    //       done()
    //     })
    //   })
    //   // stress
    //   it('should return all words when stress input is NaN', function (done) {
    //     list('stress = NaN').then((results) => {
    //       expect(results.length).to.equal(dictionary.length)
    //       done()
    //     })
    //   })
  })
})
