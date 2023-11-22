import { endpoints } from './constants'

export async function lenition() {
  const url = endpoints.lenition_url
  const response = await fetch(url)
  const data = (await response.json()) as string[]
  return data
}

export async function version() {
  const url = endpoints.version_url
  const response = await fetch(url)
  const data = (await response.json()) as string
  return data
}
