import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { MeetingCancelled } from "../generated/schema"
import { MeetingCancelled as MeetingCancelledEvent } from "../generated/Calender/Calender"
import { handleMeetingCancelled } from "../src/calender"
import { createMeetingCancelledEvent } from "./calender-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let meetingId = BigInt.fromI32(234)
    let newMeetingCancelledEvent = createMeetingCancelledEvent(meetingId)
    handleMeetingCancelled(newMeetingCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MeetingCancelled created and stored", () => {
    assert.entityCount("MeetingCancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MeetingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "meetingId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
