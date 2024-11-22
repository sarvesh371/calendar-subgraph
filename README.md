# calendar-subgraph
> Subgraph for Decentralized Meeting Scheduling and Management smart contract on Blockchain

> Smart contract deployed here: [Calendar](https://sepolia.basescan.org/address/0xC2dE2fcD871eacb8147A1FB4a6036726b1e094f0)

👉 **STAR ⭐ this project for later use and to keep posted on the changes.**

## Table of Contents
- Calendar Subgraph
    - [Table of Contents](#table-of-contents)
    - [General Information](#general-information)
    - [Indexed Events](#indexed-events)
    - [Entities](#entities)
    - [Technologies and Techniques](#technologies-and-techniques)
        - [Project configuration](#project-configuration)
        - [Main application](#main-application)
  - [Setup](#setup)

## General Information
- The subgraph indexes meeting data from the `Calendar` smart contract and stores it in a queryable format.
- It simplifies retrieving meeting details, participant lists, and other data for integration into decentralized applications.
- By enabling quick access to structured meeting data, this subgraph streamlines the development of blockchain-based scheduling and event management tools.

## Indexed Events
- **MeetingCreated**: Captures details of newly created meetings.
- **MeetingRescheduled**: Updates the meeting's date and time upon rescheduling.
- **MeetingCancelled**: Flags the meeting as canceled.
- **ParticipantAdded**: Tracks additional participants added to a meeting.

## Entities
#### Meeting
This entity stores comprehensive details of each meeting:
```graphql
type Meeting @entity {
  id: Bytes!
  meetingId: BigInt! # uint256
  organizer: Bytes! # address
  date: BigInt! # UNIX timestamp
  startTime: BigInt! # Meeting start time in seconds from midnight
  endTime: BigInt! # Meeting end time in seconds from midnight
  agenda: String! # Meeting agenda
  meetLink: String! # Meeting link
  isCancelled: Boolean! # Meeting cancellation status
  participants: [Bytes!]! # Array of participant addresses
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}
```
```graphql
query {
  meetings {
    id
    meetingId
    organizer
    date
    startTime
    startTime
    endTime
    agenda
    meetLink
    participants
    blockNumber
    blockTimestamp
    transactionHash
    isCancelled
  }
}
```

## Technologies and Techniques

### Project configuration
<div style="margin-left: 3rem;" >

```
📦root
 ┣ 📂abis  => Calender.json - holds abi of the smart contract.
 ┣ 📂src  => calender.ts - translates data from your data sources to the entities defined in the schema.
 ┣ 📜schema.graphql  => defines what data you wish to retrieve from the subgraph.
 ┣ 📜subgraph.yaml  => defines what data sources your subgraph will index.
``` 
</div>

### Main application
- Subgraph deployed here: [Calender](https://api.studio.thegraph.com/query/76519/calendar-subgraph/version/latest)
- Contract deployed here: [Calendar](https://sepolia.basescan.org/address/0xC2dE2fcD871eacb8147A1FB4a6036726b1e094f0)
- [Graph](https://thegraph.com/studio) was used for subgraph deployment.
- Doc's Referred
    - https://thegraph.com/docs/en/quick-start/

## Setup
1. Clone this project by doing:
```
$ git clone https://github.com/sarvesh371/calendar-subgraph.git
```
2. Go to the folder you've just cloned the code and execute:
```
$ npm install
```
3. [Change/Write your subgraph](https://thegraph.com/docs/en/quick-start/#4-write-your-subgraph)
4. [Deploy the Subgraph](https://thegraph.com/docs/en/quick-start/#5-deploy-your-subgraph)
$ npx hardhat run scripts/deploy.js --network baseSepolia
