import { DonPollo, TalkTuah, Ronaldo, KSISong, memenome} from '../assets/videos/index'

// Level Data Configuration
export const LevelData = {
  1: {
    name: "Peak Podcast",
    color: "blue",
    videoUrl: TalkTuah,
    music: "src/assets/music/MDK - Press Start [FREE DOWNLOAD].mp3",
    initialBlockWidth: 192,
    speed: 1,
    videoLength: 7
  },
  2: {
    name: "Memenome",
    color: "green",
    videoUrl: DonPollo,
    music: "src/assets/music/Dex Arson - Round 1.mp3",
    initialBlockWidth: 180,
    speed: 1.2,
    videoLength: 15
  },
  3: {
    name: "Song of the year",
    color: "green",
    videoUrl: KSISong,
    music: "src/assets/music/Glorious Morning.mp3",
    initialBlockWidth: 180,
    speed: 1.2,
    videoLength: 21
  },
  4: {
    name: "Unexpected GOAT",
    color: "green",
    videoUrl: Ronaldo,
    music: "src/assets/music/Robotic Nightmares.mp3",
    initialBlockWidth: 180,
    speed: 1.2,
    videoLength: 12
  },
  5: {
    name: "Finale",
    color: "green",
    videoUrl: memenome,
    music: "src/assets/music/Dimrain47 - At the Speed of Light.mp3",
    initialBlockWidth: 180,
    speed: 1.2,
    videoLength: 38
  },
  // Add more levels...
};
