import { MessageHandler } from './lib/types'
import { LineWebhookEventObject } from './lib/types/lineWebhookEventObjects'
import { Line } from './lib/utils/line'
import { LineEventHandler } from './lib/lineEventHandler'

type AwsLambdaHandler = (event: {}, context: {}, callback: (...args: any[]) => void) => void

const CHANNEL_ACCESS_TOKEN: string = process.env.CHANNEL_ACCESS_TOKEN as string

export function generateAwsLambdaHandler(messageHandler: MessageHandler): AwsLambdaHandler {
  return (event: {}, _context: {}, callback: (...args: any[]) => void) => {
    // return response first
    callback(null, 200)

    const eventObject = event as LineWebhookEventObject
    console.log('Received event object:', eventObject)

    const line = new Line(CHANNEL_ACCESS_TOKEN)
    const lineEventHandler = new LineEventHandler(line, messageHandler)

    eventObject.events.forEach((ev) => lineEventHandler.handleEvent(ev))
  }
}
