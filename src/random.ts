import { endpoints } from './constants'
import type { Word } from './types'

export async function random(n: number, args?: string) {
  if (args) {
    const url = endpoints.random_filter_url
      .replace('{n}', n.toString())
      .replace('{args}', args)
    const response = await fetch(url)
    const data = (await response.json()) as Word[]
    return data
  }
  const url = endpoints.random_url.replace('{n}', n.toString())
  const response = await fetch(url)
  const data = (await response.json()) as Word[]
  return data
}
