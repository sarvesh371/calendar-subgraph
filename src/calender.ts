  import { Bytes, log } from "@graphprotocol/graph-ts";
  import {
    MeetingCancelled as MeetingCancelledEvent,
    MeetingCreated as MeetingCreatedEvent,
    MeetingRescheduled as MeetingRescheduledEvent,
    ParticipantAdded as ParticipantAddedEvent
  } from "../generated/Calender/Calender"
  import {
    Meeting,
  } from "../generated/schema"

  export function handleMeetingCancelled(event: MeetingCancelledEvent): void {
    // Format meetingId to ensure it's a valid hex string
    let hexMeetingId = event.params.meetingId.toHexString();
    if (hexMeetingId.length % 2 !== 0) {
      hexMeetingId = "0x0" + hexMeetingId.substring(2); // Add leading zero if odd length
    }
    
    // Use meetingId to construct the id
    let entityId = Bytes.fromHexString(hexMeetingId);
    let entity = Meeting.load(entityId);

    if (entity) {
      // Update the isCancelled flag
      entity.isCancelled = true;

      entity.blockNumber = event.block.number
      entity.blockTimestamp = event.block.timestamp
      entity.transactionHash = event.transaction.hash

      // Save the updated entity
      entity.save();
    } else {
      // Log a warning if the Meeting entity doesn't exist
      log.warning("Meeting entity with ID {} not found for cancellation", [
        event.params.meetingId.toHexString(),
      ]);
    }
  }

  export function handleMeetingCreated(event: MeetingCreatedEvent): void {
    // Format meetingId to ensure it's a valid hex string
    let hexMeetingId = event.params.meetingId.toHexString();
    if (hexMeetingId.length % 2 !== 0) {
      hexMeetingId = "0x0" + hexMeetingId.substring(2); // Add leading zero if odd length
    }
    
    // Use meetingId to construct the id
    let entityId = Bytes.fromHexString(hexMeetingId);

    let entity = new Meeting(entityId);

    entity.meetingId = event.params.meetingId
    entity.organizer = event.params.organizer
    entity.date = event.params.date;
    entity.startTime = event.params.startTime;
    entity.endTime = event.params.endTime;
    entity.agenda = event.params.agenda;
    entity.meetLink = event.params.meetLink;
    entity.isCancelled = false; // Default value when created
    entity.participants = []; // Empty array when created

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
  }

  export function handleMeetingRescheduled(event: MeetingRescheduledEvent): void {
    // Format meetingId to ensure it's a valid hex string
    let hexMeetingId = event.params.meetingId.toHexString();
    if (hexMeetingId.length % 2 !== 0) {
      hexMeetingId = "0x0" + hexMeetingId.substring(2); // Add leading zero if odd length
    }
    
    // Use meetingId to construct the id
    let entityId = Bytes.fromHexString(hexMeetingId);
    let entity = Meeting.load(entityId);

    if (entity) {
      // Update the isCancelled flag
      entity.date = event.params.newDate;
      entity.startTime = event.params.newStartTime;
      entity.endTime = event.params.newEndTime;

      entity.blockNumber = event.block.number
      entity.blockTimestamp = event.block.timestamp
      entity.transactionHash = event.transaction.hash

      // Save the updated entity
      entity.save();
    } else {
      // Log a warning if the Meeting entity doesn't exist
      log.warning("Meeting entity with ID {} not found for rescheduling", [
        event.params.meetingId.toHexString(),
      ]);
    }
  }

  export function handleParticipantAdded(event: ParticipantAddedEvent): void {
    // Format meetingId to ensure it's a valid hex string
    let hexMeetingId = event.params.meetingId.toHexString();
    if (hexMeetingId.length % 2 !== 0) {
      hexMeetingId = "0x0" + hexMeetingId.substring(2); // Add leading zero if odd length
    }
    
    let entityId = Bytes.fromHexString(hexMeetingId);
    let entity = Meeting.load(entityId);

    if (entity) {
      // Add the participant to the entity's participants list
      let participants = entity.participants;
      participants.push(event.params.participant);
      entity.participants = participants;

      // Optionally update other fields
      entity.blockNumber = event.block.number;
      entity.blockTimestamp = event.block.timestamp;
      entity.transactionHash = event.transaction.hash;

      // Save the updated entity
      entity.save();
    } else {
      // Log a warning if the Meeting entity doesn't exist
      log.warning("Meeting entity with ID {} not found for participant addition", [
        hexMeetingId,
      ]);
    }
  }
