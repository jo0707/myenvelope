import type { Data, Message } from "~/types/data"
import { useStorage } from "@vueuse/core"
import type { EnvelopeResponse } from "~/types/response/envelopeResponse"

export const useDataStore = defineStore("data", () => {
  const data = ref<Data | null>(null)
  const editableData = useStorage("data", defaultData)
  const displayData = useStorage("displayData", defaultData)
  const createLink = useStorage("create_link", "")

  const error = ref<{ message: string; code: number } | null>(null)
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

  watch(createLink, () => {
    createLink.value = createLink.value.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, "")
  })

  async function fetchDataFromServer(slug: string | null = null) {
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

      displayData.value = { ...defaultData, ...responseData }
      data.value = displayData.value
    } catch (e) {
      console.error("Error fetching data:", e)
      error.value = {
        code: 500,
        message: e.message,
      }
    }
  }

  async function fetchDataFromLocal() {
    editableData.value = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")!) : defaultData
    data.value = editableData.value
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
    type: "text",
    color: "",
  }
}

export const defaultData: Data = {
  name: "Example",
  music: { volume: 100, id: 4, src: "", autoplay: true, loop: true },
  background: {
    topColor: "#512f4f",
    bottomColor: "#021f31",
    type: "dot",
    starAngle: 17,
    starQuantity: 187,
    starOpacity: [0.1, 0.8],
    starSize: [0, 2],
  },
  typing: { delay: 46, textColor: "#FEFEFE" },
  messages: [
    {
      text: "Hi there! Welcome to MyEnvelope. You can create a cool message here. To create, just click the link below",
      position: 2,
      image: "",
      type: "",
      color: "#ffffff",
    },
    {
      text: "You can add images, change position, change color, and show message as quote.",
      position: 2,
      image: "https://pasteboard.co/0B1dfyAkHTsM.jpg",
      type: "",
      color: "",
    },
    {
      text: "There is more to do here! Let me know if you have ideas! thanks :)",
      position: 2,
      image: "",
      type: "quote",
      color: "",
    },
  ],
}
