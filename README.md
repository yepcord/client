# YEPCord frontend

## Setup

1. Clone repository:
    ```shell
    git clone https://github.com/yepcord/client yepcord-client && cd yepcord-client
    ```
2. Install packages:
    ```shell
    npm i
    ```
3. (Optional) Change server variables / instance name / snowflake epoch in src/constants.ts.
4. Run:
    ```shell
   npm run
    ```

## What's already done
- [x] Authentication
    - [x] Login
        - [x] Base login
        - [x] 2-fa login
        - [x] Remote auth
    - [x] Registration
- [ ] Chat
    - [ ] Messages
        - [ ] Content
            - [x] Embeds
            - [x] Emotes
            - [x] Italic text
            - [x] Underlined text
            - [x] Bold text
            - [x] Text spoiler
            - [ ] Attachments spoiler
            - [x] Timestamps
            - [ ] Stickers
            - [ ] Code blocks
            - [ ] Inline code blocks
        - [ ] Replies
        - [x] Timestamp
        - [ ] Edited
        - [ ] Pinned
        - [ ] Reactions
        - [ ] Sender
            - [ ] Avatar
                - [ ] Guild
                - [x] User
            - [x] Name
                - [x] Guild
                - [x] User
        - [ ] Slash commands
    - [ ] Sending
        - [x] Text
        - [ ] Attachments
        - [ ] Emotes
        - [ ] Stickers
        - [ ] Slash commands
    - [ ] Context Menu
        - [ ] Reply
        - [ ] React
        - [ ] Pin
        - [x] Delete
        - [ ] Profile
        - [ ] Create Thread
        - [ ] Copy ID
- [ ] Guilds
    - [ ] Folders
    - [x] Icon
        - [x] Image
        - [x] Text
    - [x] Name
    - [ ] Banner
    - [x] Channels
    - [ ] Settings
        - [ ] Name
        - [ ] Type
        - [ ] Permissions
        - [ ] Roles
- [ ] Channels
    - [x] Name
    - [ ] Type
        - [x] Text
        - [ ] Announcement
        - [x] Voice
        - [ ] Thread
        - [ ] Forum
        - [ ] Rules
    - [ ] Category
        - [x] Collapse/Expand
        - [ ] Syncing data
    - [ ] Unread indicator
    - [ ] Threads
    - [ ] Permissions
    - [ ] Settings
        - [ ] Name
        - [ ] Type
        - [ ] Permissions
- [ ] Members
    - [ ] Bio
    - [ ] Activity
    - [ ] Status
        - [ ] Text
        - [ ] Indicator
            - [ ] Online
            - [ ] Idle
            - [ ] DND
            - [ ] Offline
    - [ ] Avatar
    - [ ] Banner
    - [ ] Connections
    - [ ] Name
        - [ ] User
        - [ ] Guild
        - [ ] Tag
- [x] Direct Messages
    - [x] DM Channels
    - [ ] DM Group channels
- [ ] Voice Activity
    - [ ] Communication
    - [ ] Mute
    - [ ] Deafen
    - [ ] Screenshare
    - [ ] Chat
- [ ] Logged-in User
    - [ ] Status
        - [ ] Text
        - [x] Indicator
            - [x] Online
            - [x] Idle
            - [x] DND
            - [x] Offline
    - [x] Mentions
- [ ] Logged-in User Settings
    - [x] Avatar
    - [x] Bio
    - [x] Banner
    - [ ] Username
    - [ ] Tag
    - [ ] Status
        - [ ] Text
        - [x] Indicator
    - [ ] Settings tabs
        - [x] My account
        - [x] Profiles
        - [x] Privacy and safety
        - [ ] Connections
        - [ ] Sessions
        - [x] Friend requests
        - [x] Appearance
        - [ ] Accessibility
        - [ ] Voice & Video
        - [x] Text & Images
        - [ ] Notifications
        - [ ] Keybinds
        - [ ] Language
        - [x] Streamer mode
        - [x] Advanced
        - [x] Activity privacy
        - [ ] Registered games
        - [ ] Hypesquad
