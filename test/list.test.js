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
const expect = require('chai').expect;
const { list, getWords } = require('../lib')
const dictionary = getWords()

describe('list module', () => {
  describe('#list()', () => {
    // list pos starts v
    it('should list all words whose part of speech starts with given string', () => {
      const results = list(['pos', 'starts', 'v'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.startsWith('v')).to.be.true)
    })
    // list pos ends m.
    it('should list all words whose part of speech ends with given string', () => {
      const results = list(['pos', 'ends', 'm.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.endsWith('m.')).to.be.true)
    })
    // list pos has vin.
    it('should list all word whose part of speech contains given string', () => {
      const results = list(['pos', 'has', 'vin.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.includes('vin.')).to.be.true)
    })
    // list pos is v.
    it('should list all word whose part of speech is exactly the given string', () => {
      const results = list(['pos', 'is', 'v.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech === 'v.').to.be.true)
    })
    // list pos like v%.
    it('should list all word whose part of speech is like the given string', () => {
      const results = list(['pos', 'like', 'v%.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.match(/v.*\./g).length > 0).to.be.true)
    })
    // list pos not-starts v
    it('should list all words whose part of speech does not start with given string', () => {
      const results = list(['pos', 'not-starts', 'v'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.startsWith('v')).to.be.false)
    })
    // list pos not-ends m.
    it('should list all words whose part of speech does not end with given string', () => {
      const results = list(['pos', 'not-ends', 'm.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.endsWith('m.')).to.be.false)
    })
    // list pos not-has vin.
    it('should list all words whose part of speech does not contain given string', () => {
      const results = list(['pos', 'not-has', 'vin.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech.includes('vin.')).to.be.false)
    })
    // list pos not-is v.
    it('should list all words whose part of speech is exactly not the given string', () => {
      const results = list(['pos', 'not-is', 'v.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.PartOfSpeech === 'v.').to.be.false)
    })
    // list pos not-like v%.
    it('should list all words whose part of speech is not like the given string', () => {
      const results = list(['pos', 'not-like', 'v%.'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => {
        expect(w.data.Navi.startsWith('v') && w.data.Navi.endsWith('.')).to.be.false
      })
    })
    // list word starts ft
    it('should list all words that start with given string', () => {
      const results = list(['word', 'starts', 'ft'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.startsWith('ft')).to.be.true)
    })
    // list word ends ang
    it('should list all words that end with given string', () => {
      const results = list(['word', 'ends', 'ang'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.endsWith('ang')).to.be.true)
    })
    // list word has ts
    it('should list all words that include given string', () => {
      const results = list(['word', 'has', 'ts'])
      expect(results.length).to.be.greaterThan(0)
      expect(results.length).to.equal(312)
      results.forEach(w => expect(w.data.Navi.toLowerCase().includes('ts')).to.be.true)
    })
    // list word like f%w
    it('should list all words that are like given string', () => {
      const results = list(['word', 'like', 'f%w'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.match(/f.*w/g).length > 0).to.be.true)
    })
    // list word not-starts ft
    it('should list all words that do not start with given string', () => {
      const results = list(['word', 'not-starts', 'ft'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.startsWith('ft')).to.be.false)
    })
    // list word not-ends ang
    it('should list all words that do not end with given string', () => {
      const results = list(['word', 'not-ends', 'ang'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.endsWith('ang')).to.be.false)
    })
    // list word not-has ts
    it('should list all words that do not include with given string', () => {
      const results = list(['word', 'not-has', 'ts'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Navi.includes('ts')).to.be.false)
    })
    // list word not-like f%w
    it('should list all words that are not like given string', () => {
      const results = list(['word', 'not-like', 'f%w'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => {
        expect(w.data.Navi.startsWith('f') && w.data.Navi.endsWith('w')).to.be.false
      })
    })
    // list words first 20
    it('should list first 20 words released', () => {
      const results = list(['words', 'first', '20'])
      expect(results.length).to.equal(20)
      results.forEach((w, i) => expect(w.data.ID === dictionary[i].data.ID).to.be.true)
    })
    // list words last 30
    it('should list last 30 words released', () => {
      const results = list(['words', 'last', '30'])
      expect(results.length).to.equal(30)
      results.forEach((w, i) => expect(w.data.ID === dictionary.slice(-30)[i].data.ID).to.be.true)
    })
    // list syllables > 1
    it('should list all words with more than 1 syllable', () => {
      const results = list(['syllables', '>', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() > 1).to.be.true)
    })
    // list syllables = 2
    it('should list all words with 2 syllables', () => {
      const results = list(['syllables', '=', '2'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() === 2).to.be.true)
    })
    // list syllables <= 3
    it('should list all words with at most 3 syllables', () => {
      const results = list(['syllables', '<=', '3'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() <= 3).to.be.true)
    })
    // list syllables < 1
    it('should return empty list for syllables < 1', () => {
      expect(list(['syllables', '<', '1']).length).to.equal(0)
    })
    // list syllables < 2
    it('should return empty list for syllables < 2', () => {
      const results = list(['syllables', '<', '2'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() < 2).to.be.true)
    })
    // list syllables >= 1
    it('should return empty list for syllables >= 1', () => {
      const results = list(['syllables', '>=', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() >= 1).to.be.true)
    })
    // list syllables >= 10
    it('should return empty list for syllables >= 10', () => {
      expect(list(['syllables', '>=', '10']).length).to.equal(0)
    })
    // list syllables != 1
    it('should return empty list for syllables != 1', () => {
      const results = list(['syllables', '!=', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.syllableCount() !== 1).to.be.true)
    })
    // list syllables = NaN
    it('should return all words when spec is NaN on syllables', () => {
      expect(list(['syllables', '=', 'NaN']).length).to.equal(dictionary.length)
    })
    // list stress < 2
    it('should return empty list for stress < 2', () => {
      const results = list(['stress', '<', '2'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Stressed < 2).to.be.true)
    })
    // list stress <= 2
    it('should return empty list for stress <= 2', () => {
      const results = list(['stress', '<=', '2'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Stressed <= 2).to.be.true)
    })
    // list stress = 1
    it('should list all words with stressed syllable position 1', () => {
      const results = list(['stress', '=', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(+w.data.Stressed === 1).to.be.true)
    })
    // list stress = -1
    it('should list all words with stressed syllable position -1', () => {
      const results = list(['stress', '=', '-1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(+w.data.Stressed === w.syllableCount()).to.be.true)
    })
    // list stress >= 1
    it('should list all words with stressed syllable position >= 1', () => {
      const results = list(['stress', '>=', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(+w.data.Stressed >= 1).to.be.true)
    })
    // list stress >= 10
    it('return empty list for stressed syllable position >= 10', () => {
      expect(list(['stress', '>=', '10']).length).to.equal(0)
    })
    // list stress > 2
    it('should return empty list for stress > 2', () => {
      const results = list(['stress', '>', '2'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Stressed > 2).to.be.true)
    })
    // list stress != 1
    it('should return empty list for stress !== 1', () => {
      const results = list(['stress', '!=', '1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Stressed !== 1).to.be.true)
    })
    // list stress != -1
    it('should return empty list for stress !== -1', () => {
      const results = list(['stress', '!=', '-1'])
      expect(results.length).to.be.greaterThan(0)
      results.forEach(w => expect(w.data.Stressed !== w.syllableCount()).to.be.true)
    })

    // list word starts fme and word ends tok
    it('should support multiple sets of args (AND)', () => {
      const results = list(['word', 'starts', 'fme', 'and', 'word', 'ends', 'tok'])
      expect(results.length).to.equal(1)
      results.forEach(w => expect(w.data.Navi).to.equal('fmetok'))
    })
    // words errors
    it('should return all words when first / last spec input is NaN', () => {
      const results = list(['words', 'first', 'NaN'])
      expect(results.length).to.equal(dictionary.length)
    })
    // stress
    it('should return all words when stress input is NaN', () => {
      const results = list(['stress', '=', 'NaN'])
      expect(results.length).to.equal(dictionary.length)
    })
  })
})
