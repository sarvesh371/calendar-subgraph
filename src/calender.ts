import {
  MeetingCancelled as MeetingCancelledEvent,
  MeetingCreated as MeetingCreatedEvent,
  MeetingRescheduled as MeetingRescheduledEvent,
  ParticipantAdded as ParticipantAddedEvent
} from "../generated/Calender/Calender"
import {
  MeetingCancelled,
  MeetingCreated,
  MeetingRescheduled,
  ParticipantAdded
} from "../generated/schema"

export function handleMeetingCancelled(event: MeetingCancelledEvent): void {
  let entity = new MeetingCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.meetingId = event.params.meetingId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMeetingCreated(event: MeetingCreatedEvent): void {
  let entity = new MeetingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.meetingId = event.params.meetingId
  entity.organizer = event.params.organizer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMeetingRescheduled(event: MeetingRescheduledEvent): void {
  let entity = new MeetingRescheduled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.meetingId = event.params.meetingId
  entity.newDate = event.params.newDate
  entity.newStartTime = event.params.newStartTime
  entity.newEndTime = event.params.newEndTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleParticipantAdded(event: ParticipantAddedEvent): void {
  let entity = new ParticipantAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.meetingId = event.params.meetingId
  entity.participant = event.params.participant

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
