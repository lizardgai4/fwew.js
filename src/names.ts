import { endpoints } from './constants'

export async function nameSingle(n: string, s: string, dialect: string) {
  const url = endpoints.name_single_url
    .replace('{n}', n)
    .replace('{s}', s)
    .replace('{dialect}', dialect)
  const response = await fetch(url)
  const data = (await response.json()) as string
  return data
}

export async function nameFull(
  ending: string,
  n: string,
  s1: string,
  s2: string,
  s3: string,
  dialect: string
) {
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

export async function nameAlu(
  n: string,
  s: string,
  nm: string,
  am: string,
  dialect: string
) {
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
