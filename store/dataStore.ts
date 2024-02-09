import type { Data, Message } from "~/types/data"

export const useDataStore = defineStore("data", () => {
  const data = ref<Data>(defaultData)
  const error = ref<{ message: string; code: number } | null>(null)

  const splashClicked = ref(false)
  const index = ref(0)

  const message = computed<Message>(() => {
    let m = data.value?.messages.at(index.value) ?? ""
    let me = typeof m == "string" ? getMessage(m) : m

    if (me.image && me.image.includes("pasteboard.co")) {
      let slug = me.image.split("/").pop()
      me.image = `https://gcdnb.pbrd.co/images/${slug}?o=1`
    }

    return me
  })

  async function fetchData(dataUrl: string = "/data.json") {
    const response = await fetch(dataUrl)

    if (!response.ok) {
      error.value = {
        code: response.status,
        message: response.statusText,
      }
    }

    data.value = { ...defaultData, ...JSON.parse(await response.text()) }
  }

  return { fetchData, data, index, message, splashClicked }
})

export function getMessage(text: string): Message {
  return {
    text: text,
    position: 2,
    image: "",
  }
}

export const defaultData: Data = {
  music: 1,
  name: "My Secret",
  youtubeUrl: "",
  background: {
    topColor: "",
    bottomColor: "",
    type: "dot",
    starAngle: 0,
    starQuantity: 100,
    starOpacity: [0.1, 0.8],
    starSize: [0, 2],
  },
  typing: {
    delay: 10,
    textColor: "",
  },
  messages: [
    "Hi!",
    "You can play the song below if you want :)",
    {
      text: "This is left message",
      position: 1,
      image: "",
    },
    {
      text: "This is center message",
      position: 2,
      image: "",
    },
    {
      text: "This is right message",
      position: 3,
      image: "",
    },
  ],
}
