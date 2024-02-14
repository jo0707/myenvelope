import type { Data, Message } from "~/types/data"
import { useStorage } from "@vueuse/core"
import type { EnvelopeResponse } from "~/types/response/envelopeResponse"

export const useDataStore = defineStore("data", () => {
  const data = useStorage("data", defaultData)
  const displayData = useStorage("data_to_display", defaultData)
  const createLink = useStorage("create_link", "")

  const error = ref<{ message: string; code: number } | null>(null)
  const loading = ref(true)
  const saveResult = ref<{ success: boolean; message: string } | null>(null)

  const splashClicked = ref(false)
  const index = ref(0)

  const songTitle = computed(() => {
    return songTitles.get(data.value?.music.id ?? 0) ?? ""
  })

  const message = computed<Message>(() => {
    let m = data.value?.messages.at(index.value) ?? ""
    let me = typeof m == "string" ? getMessage(m) : m
    return me
  })

  watchEffect(() => {
    // rewrite createLink with format [a-zA-Z0-9_-]
    createLink.value = createLink.value.replace(/[^a-zA-Z0-9_-]/g, "").replace(" ", "_")
  })

  async function fetchDataFromServer(slug: string = "/data.json") {
    try {
      const response = await fetch(slug ? `/api/envelope?slug=${slug}` : "/data.json", {
        method: "GET",
      })

      if (!response.ok) {
        error.value = {
          code: response.status,
          message: response.statusText,
        }
      }

      const parsed = JSON.parse(await response.text())
      const responseData = slug ? JSON.parse(parsed.data) : parsed

      console.log(responseData)

      data.value = { ...defaultData, ...responseData }
    } catch (e) {
      console.error("Error fetching data:", e)
      error.value = {
        code: 500,
        message: e.message,
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchDataFromLocal() {
    data.value = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!) : defaultData
  }

  async function saveToServer() {
    try {
      const response = await $fetch<EnvelopeResponse>("/api/envelope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          slug: createLink.value,
          data: data.value,
        },
      })

      saveResult.value = {
        success: true,
        message: response.slug,
      }
    } catch (e) {
      console.error("Error saving data:", e)
      saveResult.value = {
        success: false,
        message: e.message,
      }
    }
  }

  return {
    fetchDataFromServer,
    fetchDataFromLocal,
    data,
    error,
    index,
    message,
    splashClicked,
    songTitle,
    createLink,
    saveToServer,
    saveResult,
  }
})

export function getMessage(text: string): Message {
  return {
    text: text,
    position: 2,
    image: "",
    type: "",
    color: "",
  }
}

export const defaultData: Data = {
  name: "Gazebooo",
  music: {
    volume: 80,
    id: 9,
    src: "",
    autoplay: true,
    loop: true,
  },
  background: {
    topColor: "#010d14",
    bottomColor: "#01141f",
    type: "dot",
    starAngle: 20,
    starQuantity: 100,
    starOpacity: [0.1, 0.8],
    starSize: [0, 2],
  },
  typing: {
    delay: 1,
    textColor: "#FEFEFE",
  },
  messages: [
    {
      text: "Itu saja teman-temanku...",
    },
    {
      text: "Anggap aja teks romantis...",
      position: 1,
      image: "https://pasteboard.co/JErVMyLrWDAF.jpg",
    },
    {
      text: "...",
      position: 2,
      image: "https://pasteboard.co/0WQo8vaMs8M7.jpg",
    },
    {
      text: "Apri pendukung 01",
      position: 3,
      image: "https://pasteboard.co/ilFEH7BtmC0i.jpg",
    },
    {
      text: "Semoga kita semua diberikan kekuatan untuk mengahadapi tantangan kita sampai akhir...",
    },

    {
      text: "Waktu akan selalu berganti, tapi kenangan kita tidak.",
      type: "quote",
      color: "#FEFEFE",
    },
  ],
}
