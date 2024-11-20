import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  MeetingCancelled,
  MeetingCreated,
  MeetingRescheduled,
  ParticipantAdded
} from "../generated/Calender/Calender"

export function createMeetingCancelledEvent(
  meetingId: BigInt
): MeetingCancelled {
  let meetingCancelledEvent = changetype<MeetingCancelled>(newMockEvent())

  meetingCancelledEvent.parameters = new Array()

  meetingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "meetingId",
      ethereum.Value.fromUnsignedBigInt(meetingId)
    )
  )

  return meetingCancelledEvent
}

export function createMeetingCreatedEvent(
  meetingId: BigInt,
  organizer: Address
): MeetingCreated {
  let meetingCreatedEvent = changetype<MeetingCreated>(newMockEvent())

  meetingCreatedEvent.parameters = new Array()

  meetingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "meetingId",
      ethereum.Value.fromUnsignedBigInt(meetingId)
    )
  )
  meetingCreatedEvent.parameters.push(
    new ethereum.EventParam("organizer", ethereum.Value.fromAddress(organizer))
  )

  return meetingCreatedEvent
}

export function createMeetingRescheduledEvent(
  meetingId: BigInt,
  newDate: BigInt,
  newStartTime: BigInt,
  newEndTime: BigInt
): MeetingRescheduled {
  let meetingRescheduledEvent = changetype<MeetingRescheduled>(newMockEvent())

  meetingRescheduledEvent.parameters = new Array()

  meetingRescheduledEvent.parameters.push(
    new ethereum.EventParam(
      "meetingId",
      ethereum.Value.fromUnsignedBigInt(meetingId)
    )
  )
  meetingRescheduledEvent.parameters.push(
    new ethereum.EventParam(
      "newDate",
      ethereum.Value.fromUnsignedBigInt(newDate)
    )
  )
  meetingRescheduledEvent.parameters.push(
    new ethereum.EventParam(
      "newStartTime",
      ethereum.Value.fromUnsignedBigInt(newStartTime)
    )
  )
  meetingRescheduledEvent.parameters.push(
    new ethereum.EventParam(
      "newEndTime",
      ethereum.Value.fromUnsignedBigInt(newEndTime)
    )
  )

  return meetingRescheduledEvent
}

export function createParticipantAddedEvent(
  meetingId: BigInt,
  participant: Address
): ParticipantAdded {
  let participantAddedEvent = changetype<ParticipantAdded>(newMockEvent())

  participantAddedEvent.parameters = new Array()

  participantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "meetingId",
      ethereum.Value.fromUnsignedBigInt(meetingId)
    )
  )
  participantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "participant",
      ethereum.Value.fromAddress(participant)
    )
  )

  return participantAddedEvent
}
