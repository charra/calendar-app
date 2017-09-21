export function getStorage(item) {
  return JSON.parse(localStorage.getItem(item))
}

export function updateStorage(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data))

  
}
