export async function parseSRT(musicId: number = 0) {
  let subs: Subtitle[] = []
  if (!musicId) return subs

  try {
    let srtContent = await (await fetch(`/music/${musicId}.srt`)).text()
    var srtArray = srtContent.split("\n\n")

    srtArray.forEach((srtBlock: string) => {
      var lines = srtBlock.split("\n")

      if (lines.length >= 3) {
        var timeString = lines[1].split(" --> ")
        var s = {
          id: parseInt(lines[0]),
          start: convertTimeToSeconds(timeString[0]),
          end: convertTimeToSeconds(timeString[1]),
          text: lines.slice(2).join("\n"),
        }

        subs.push(s)
      }
    })
  } catch (error) {
    console.log(error)
  }

  return subs
}

export function convertTimeToSeconds(timsString: string) {
  var timeParts = timsString.split(":")
  var hours = parseInt(timeParts[0], 10)
  var minutes = parseInt(timeParts[1], 10)
  var seconds = parseFloat(timeParts[2].replace(",", "."))
  return hours * 3600 + minutes * 60 + seconds
}
