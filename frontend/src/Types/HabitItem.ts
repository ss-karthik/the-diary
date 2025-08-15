import type habitLog from "./HabitLog";

export default interface habitItem {
  id: number,
  title: string,
  tags: string[],
  frequency: string,
  streak: string,
  logs?: habitLog[],
}