export type ReplyAction = (text: string) => Promise<void>
export type MessageHandler = (message: string, reply: ReplyAction) => Promise<void>
