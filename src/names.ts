import { endpoints } from './constants'
import type { AdjectiveMode, Dialect, NameEnding, NounMode } from './types'

/**
 * Generate a single Na'vi first name
 * @param {string} n number of names to generate [1-50]
 * @param {string} s number of syllables per name [0-4]
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @returns {Promise<string>}
 */
export async function nameSingle(
  n: string,
  s: string,
  dialect: Dialect
): Promise<string> {
  const url = endpoints.name_single_url
    .replace('{n}', n)
    .replace('{s}', s)
    .replace('{dialect}', dialect)
  const response = await fetch(url)
  const data = (await response.json()) as string
  return data
}

/**
 * Generate a Na'vi full name
 * @param {NameEnding} ending random for random, 'ite for female, 'itan for male, 'itu for non-binary
 * @param {string} n number of names to generate [1-50]
 * @param {string} s1 number of syllables in first name [0-4]
 * @param {string} s2 number of syllables in family name [0-4]
 * @param {string} s3 number of syllables in parent's name [0-4]
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @returns {Promise<string>}
 */
export async function nameFull(
  ending: NameEnding,
  n: string,
  s1: string,
  s2: string,
  s3: string,
  dialect: string
): Promise<string> {
  const url = endpoints.name_full_url
    .replace('{ending}', ending)
    .replace('{n}', n)
    .replace('{s1}', s1)
    .replace('{s2}', s2)
    .replace('{s3}', s3)
    .replace('{dialect}', dialect)
  const response = await fetch(url)
  const data = (await response.json()) as string
  return data
}

/**
 * Generate a Na'vi name with alu
 * @param {string} n number of names to generate [1-50]
 * @param {string} s number of syllables in first name [0-4]
 * @param {NounMode} nm noun mode
 * @param {AdjectiveMode} am adjective mode
 * @param {Dialect} dialect dialect to use ('interdialect' | 'forest' | 'reef')
 * @returns {Promise<string>}
 */
export async function nameAlu(
  n: string,
  s: string,
  nm: NounMode,
  am: AdjectiveMode,
  dialect: Dialect
): Promise<string> {
  const url = endpoints.name_alu_url
    .replace('{n}', n)
    .replace('{s}', s)
    .replace('{nm}', nm)
    .replace('{am}', am)
    .replace('{dialect}', dialect)
  const response = await fetch(url)
  const data = (await response.json()) as string
  return data
}
