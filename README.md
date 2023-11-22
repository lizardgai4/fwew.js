# fwew.js

[Fwew](https://github.com/fwew/fwew-lib), the powerful Na'vi dictionary search library, as an npm package written in TypeScript.

## Features

- Search
- List
- Random
- Number

## Installation

Install fwew.js with yarn

```bash
  yarn add fwew.js
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

To run tests with coverage, run

```bash
  yarn coverage
```

## Usage/Examples

### Search a Na'vi word

```typescript
import { fwew } from 'fwew.js'

const searchNaviWord = "lì'u"
const results = fwew.translateFromNavi(searchNaviWord)
console.log(results)
```

### Search English &rarr; Na'vi

```typescript
import { fwew } from 'fwew.js'

const searchWord = 'word'
const langCode = 'en'
const results = fwew.translateToNavi(searchNaviWord, langCode)
console.log(results)
```

### List words with given properties

```typescript
import { list } from 'fwew.js'

const criteria = ['word', 'starts', 'tì', 'and', 'pos', 'is', 'n.']
const results = list(criteria)

console.log(results)
```

### Get random words

```typescript
import { random } from 'fwew.js'

const criteria = ['pos', 'is', 'vtr.']
const numRandomWords = 8
const results = random(numRandomWords, criteria)
console.log(results)
```

### Translate Na'vi numbers

```typescript
import { numbers } from 'fwew.js'

const result = numbers.naviToNumber('mevopey')
console.log(result)
```

### Convert numbers to Na'vi

```typescript
import { numbers } from 'fwew.js'

const result = numbers.numberToNavi(42)
console.log(result)
```
