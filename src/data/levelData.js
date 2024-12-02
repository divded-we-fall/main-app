import { DonPollo, TalkTuah, Ronaldo, KSISong, memenome} from '../assets/videos/index'

// Level Data Configuration
export const LevelData = {
  1: {
    name: "Peak Podcast",
    color: "to-sky-300",
    videoUrl: TalkTuah,
    music: "src/assets/music/MDK - Press Start [FREE DOWNLOAD].mp3",
    initialBlockWidth: 192,
    speed: 2,
    videoLength: 7
  },
  2: {
    name: "Memenome",
    color: "to-pink-300",
    videoUrl: DonPollo,
    music: "src/assets/music/Dex Arson - Round 1.mp3",
    initialBlockWidth: 180,
    speed: 1.25,
    videoLength: 15
  },
  3: {
    name: "Song of the year",
    color: "to-yellow-300",
    videoUrl: KSISong,
    music: "src/assets/music/Glorious Morning.mp3",
    initialBlockWidth: 180,
    speed: 1,
    videoLength: 21
  },
  4: {
    name: "Unexpected GOAT",
    color: "to-green-300",
    videoUrl: Ronaldo,
    music: "src/assets/music/Robotic Nightmares.mp3",
    initialBlockWidth: 180,
    speed: 0.9,
    videoLength: 12
  },
  5: {
    name: "Finale",
    color: "to-red-300",
    videoUrl: memenome,
    music: "src/assets/music/Dimrain47 - At the Speed of Light.mp3",
    initialBlockWidth: 180,
    speed: 0.75,
    videoLength: 38
  },
  // Add more levels...
};
