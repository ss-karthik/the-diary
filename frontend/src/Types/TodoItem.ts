
export default interface todoItem {
  id: number,
  title: string,
  tags: string[],
  completed: boolean,
  priority: number,
  due: string,
  notes: string,
}