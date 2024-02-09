import type { Data } from "~/types/data"

export const useDataStore = defineStore("data", () => {
  const data = ref<Data | null>(null)
  const error = ref<{ message: string; code: number } | null>(null)

  async function fetchData(dataUrl: string = "data.json") {
    const response = await fetch(dataUrl)

    if (!response.ok) {
      error.value = {
        code: response.status,
        message: response.statusText,
      }
    }

    data.value = JSON.parse(await response.text())
  }

  return { fetchData, data }
})
