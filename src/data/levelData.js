import {
  DexArsonRound1,
  Dimrain47AtTheSpeedOfLight,
  GloriousMorning,
  MDKPressStart,
  RoboticNightmares,
} from '../assets/music/index';
import { DonPollo, TalkTuah, Ronaldo, KSISong, memenome } from '../assets/videos/index';

export const LevelData = {
  1: {
    name: "Peak Podcast",
    color: "to-sky-300",
    videoUrl: TalkTuah,
    music: MDKPressStart,
    initialBlockWidth: 192,
    speed: 2,
    videoLength: 7,
  },
  2: {
    name: "Memenome",
    color: "to-pink-300",
    videoUrl: DonPollo,
    music: DexArsonRound1,
    initialBlockWidth: 180,
    speed: 1.25,
    videoLength: 15,
  },
  3: {
    name: "Song of the year",
    color: "to-yellow-300",
    videoUrl: KSISong,
    music: GloriousMorning,
    initialBlockWidth: 180,
    speed: 1,
    videoLength: 21,
  },
  4: {
    name: "Unexpected GOAT",
    color: "to-green-300",
    videoUrl: Ronaldo,
    music: RoboticNightmares,
    initialBlockWidth: 180,
    speed: 0.9,
    videoLength: 12,
  },
  5: {
    name: "Finale",
    color: "to-red-300",
    videoUrl: memenome,
    music: Dimrain47AtTheSpeedOfLight,
    initialBlockWidth: 180,
    speed: 0.75,
    videoLength: 38,
  },
};
