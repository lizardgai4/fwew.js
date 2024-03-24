const API_BASE = 'https://tirea.learnnavi.org/api'

export const endpoints = {
  fwew_url: `${API_BASE}/fwew/{nav}`,
  fwew_1d_url: `${API_BASE}/fwew-1d/{nav}`,
  fwew_simple_url: `${API_BASE}/fwew-simple/{nav}`,
  fwew_reverse_url: `${API_BASE}/fwew/r/{lang}/{local}`,
  fwew_1d_reverse_url: `${API_BASE}/fwew-1d/r/{lang}/{local}`,
  search_url: `${API_BASE}/search/{lang}/{words}`,
  list_url: `${API_BASE}/list`,
  list_filter_url: `${API_BASE}/list/{args}`,
  random_url: `${API_BASE}/random/{n}`,
  random_filter_url: `${API_BASE}/random/{n}/{args}`,
  number_to_navi_url: `${API_BASE}/number/r/{num}`,
  navi_to_number_url: `${API_BASE}/number/{word}`,
  lenition_url: `${API_BASE}/lenition`,
  version_url: `${API_BASE}/version`,
  name_single_url: `${API_BASE}/name/single/{n}/{s}/{dialect}`,
  name_full_url: `${API_BASE}/name/full/{ending}/{n}/{s1}/{s2}/{s3}/{dialect}`,
  name_alu_url: `${API_BASE}/name/alu/{n}/{s}/{nm}/{am}/{dialect}`
}