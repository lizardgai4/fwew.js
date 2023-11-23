import { endpoints } from './constants'
import type { Word } from './types'

/**
 * Get a list of all words or Get a list of words filtered by args
 * @param {string | undefined} args
 * @returns {Promise<Word[]>}
 */
export async function list(args?: string) {
  const url = args
    ? new URL(
        endpoints.list_filter_url.replace('{args}', args).replace('%', '%25')
      )
    : new URL(endpoints.list_url)
  const response = await fetch(url.toString())
  const data = (await response.json()) as Word[]
  return data
}
