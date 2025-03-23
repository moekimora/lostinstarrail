# Lost in Star Rail
Lost In Star Rail is a fan-made game inspired by Lost In Teyvat by SirFelpudo and Geoguessr

# How to Play
Your mission is to figure out where you are in the Star Rail Universe, place your pin on to Star Rail Map to make a guess by drag your cursor to the map and click on where you think was the correct location, after that, click Guess to see how well you did.
The maximum score you can get for each round is **5000**, the farther you are to the correct place, the less score you get. 
If you guess in the wrong map location, you get **0** points.

# Update Log
## v1.0.0
- Initial release with one map: Herta Space Station, with 50+ unique locations

## v1.0.1
- Minor fixes and improvements
 - Music now muffled after guessing for each round
 - Updated scoring system

## v1.0.11
- Minor fixes and improvements
- Updated scoring system
 - The result map is no longer empty after guessing
 - Added the correct marker in the result map

## v1.0.2
- Update: Jarilo-VI
- Minor fixes and improvements
 - Map selection in settings is now functional
 - Pan and zoom buttons temporarily do not have a function

## v1.0.21
- Several fixes and ỉmprovements
  - Fixed the issue where the guess button is located incorrectly
  - Fixed the issue about the score display

- Update: Jarilo-VI
  - Updated 50+ unique Jarilo-VI locations

- Quality of life changes:
  - Maps now return to its original zoom after each round
  - Time to see image is now located at the top center of the screen above the timer, instead of the right of the timer
  - Default settings for Time and See Time is now **120** (2 minutes) instead of **60** (1 minute)
  - The text display after guessing is now centerized
  - Optimized for mobile device and small screen devices

## v1.0.22
- Update: Jarilo-VI
  - More locations (some extremely hard locations - sky guessing)

- Minor fixes and improvements
  - You can now zoom **x5** times instead of **x4** times for better accuracy
  - Fixed a bug where Pillars of Creations is not the correct location, even if your current location is Pillars of Creation
  - More optimizations

## v1.0.23
- Minor updates:
  - Music now changes depends on the map you choose
  - The correct marker now display the correct location when you hover to it

## v1.0.24
- Big update time:
  - Added Penacony
  - "Game Rules" is now renamed to "Mods"
  - Added more "Mods" for more interesting gameplay
  - Added "seed" for replayability

- Several fixes and improvements
  - Time and See Time limit decreases from **600** (10 minutes) to **300** (5 minutes)
  - Updated Settings UI for better viewing
  - Several bugs here and there

## v1.0.241
- Small bug fixes and improvements
  - There is a bug that the image is not displaying correctly to the according map despite chosen a map (ex: A Herta Space Station image in Jarilo-VI map). This is now fixed.
  - Deleted audio: Embers, Space Walk.
  - Now the audio will change base on Time the player sets. (by default: 120 seconds = Cosmic Sacrifice For Love, anything lower or equal to 300 seconds = Anthropic Domain) *This will be changed later*

## v1.0.25
- Update go brrr:
  - Added "Filters" for more diverse gameplay and challenge
  - Currently avaliable filters: Black And White, Invert (Blur and Scramble will be updated later, for now it is a placeholder)
  - Updated UI, minor stuff
- Several bug fixes and improvements
  - Image now has a z-index of **-1** to serve for the filter update
  - Update code... that's it

## v1.0.251
- Small bug fixes and improvements
  - Fixed a bug that when using filter Black And White and Invert, only one takes effect
  - Updated filter: Blur
  - Minor stuff

## v1.0.269 (nice)
- More updates:
  - Updated filter: Scramble
  - Minor updates

## v1.0.27
- Updated Penacony
  - Added Penacony to Star Rail Map
  - More locations YIPPIEEEEEEEEE (they are the hardest location to guess so far)
- Several bug fixes and improvements
  - You can now enter seed up to **32** characters (Please note that random generated seed will only generate up to **16** characters)
  - Seeds now can be randomly generated as a negative number
- Notes
  - May consider removing the Pan and Zoom switch, as they never got used, and I haven't figured out a way to make 360 images correctly
  - May add Competitive option in Settings (Remove the Guess button and you can only guess after you've placed your guess on the map and the timer runs out)
  - More locations coming soon

## v1.0.271
- Small bug fixes, thats it.

## v1.0.272
- Small bug fixes and minor improvements
  - Rework the countdown system, now only when the image was loaded will the countdown starts
  - Added some cute loading screen eheheh (kurukuru)

## v1.0.273
- Small bug fixes and minor improvements
  - Fixed a bug where the countdown does not start with the filter Scramble, only after guessing the first image, the countdown starts, twice lol
  - The image now fits into different resolutions for the aspect ratio 16:9

## v1.0.28
- Several bug fixes and improvements
  - Fixed an error that makes a slice of the image using filter Scramble, red. This is now fixed (ChatGPT u suck)
- Several changes
  - Slightly changed the scoring system, made it harder to score 5k
  - Seed at the bottom left corner now shows if the seed is randomly generated or provided manually
  - Seed now randomly generates from 1 to 16 characters max

## v1.0.29
- New gamemode: Survival
  - There's no round limit for the new Survival gamemode, instead you try to play for as many round as possible. Each round will have a score condition in order to progress to the next round, increase over time. Mods and Filters works the same (except for round mod because there's no round limit)
- Several changes
  - Seed now randomly generates from **5** to **16** characters max instead of **1** to **16**
  - Removed Pan and Zoom, replaced with Gamemodes: Standard and Survival

## v1.0.291
- Small bug fixes and minor improvements
  - There's a bug where if you choose Herta Space Station and play Survival mode, the website will crash. The same will happen when playing Herta Space Station in Standard Mode with the number of rounds > **58**. This is currently being fixed.
  - There is now a new (Req: ) appearing in Survival mode. You need to get a score equal or higher than the requirements in order to continue. Also the requirements will increase over time.
  - New display for Survival mode, instead of "Final Score", it is "You survived for x round(s)"
  - Seed can only be entered up to **16** characters now.

## v1.0.292
- Small bug fixes and minor improvements
  - Fixed a bug where you can disable both gamemodes, if press Play, it automatically play as Survival mode. This is now fixed.
  - UI overhall (i fixed a lot of my janky ChatGPT code lol)
  - Fixing bugs, fixing bugs...

## v1.0.293
- Small bug fixes and minor improvements
  - You can now select round from **1** to **99**.
  - There's a bug where if you select 1 round, the game continues until you played for 2 rounds. The bug that took the longest to fix somehow, now fixed.
  - Better UI for smaller resolutions, still shit on mobile tho lol.
  - Improved code for better performance.

## v1.0.294
- Small bug fixes and minor improvements
  - There's a bug where after you played for 1 round, even if you selected more than 1, the game stops at 1. This is now fixed.
  - Improved code for better performance.

## v1.0.3
- Update: Herta Space Station
  - Updated 250+ locations, just about enough :)
- Small changes
  - For now, the only map playable is Herta Space Station, every other map just links to Herta Space Station
  - Changed the scoring system
  - Changed the survival gamemode's ID generation from **150** to **250**

## v1.0.31
- Several bug fixes and improvements
  - There's a bug where if you choose Herta Space Station and play Survival mode, the website will crash. The same will happen when playing Herta Space Station in Standard Mode with the number of rounds > **58**. This is now fixed.
  - Buffed score condition for Survival mode.
  - You can now press **Spacebar** to guess faster and move to the next round faster.
  - There's a bug related to the Spacebar that add multiple result text on screen when pressing Spacebar *after* click **Guess**. This is now fixed.
  - There's also a bug related to the Next Round function and Spacebar that skips a round text when pressing Spacebar *after* click **Next Round**. This is now fixed.

## v1.0.4
- Update: Jarilo-VI
  - Updated 250+ locations
  - Still updating...
- Small add-ons
  - Added some python programs for renaming the images and write the code for those images.

## v1.0.41
- Several bug fixes and improvements
  - There's a bug where Administrative District is always incorrect, even if the guess is correct. This is now fixed.
  - Better scoring system, slightly easier to 5k.
  - There's a bug that Jarilo-VI in Survival mode cause the game to crash. This is now fixed.

## v1.0.5
- Update: Jarilo-VI
- Several new things
  - Added Options and Credits buttons at the top right corner
  - Audio volume is now editable via Options button, this value can be reuse in a session. (Keep the same volume value after reloading the page, but only in a session)
- Notes
  - May add some functions to change the audio to the players liking
  - More options
  - DEV mode maybe

## v1.0.51
- Several bug fixes and improvements
  - Credits button and Options button still present after pressing the Play button. This is now updated.
  - Added option to change the music in Options
  - There's a bug where Silvermane Guards Restricted Zone is always incorrect, even if the guess is correct. This is now fixed. (blud made a typo, woopsies)

## v1.0.6
- Update: The Xianzhou Luofu
  - Updated 200+ locations and still updating (i swear it is enormous)
- Minor bug fixes
  - There is a bug where you can get Jarilo-VI's location even if you picked Herta Space Station, this is now fixed
  - Update the scoring system

## v1.0.61
- Update: The Xianzhou Luofu
  - Updated 600+ locations and still updating
- Minor updates
  - Better UI
  - Options now save locally on device
  - Maps now display the correct map if you guessed wrong
  - Changed markers (Now there is "Your guess" in the map and "Correct location" no longer include the correct location's name)

## v1.0.62
- Update: The Xianzhou Luofu
  - Completed with 700+ locations holy shit
- Minor changes
  - Improved loading time by ~65%
  - Another UI change woohoo

## v1.0.63
- Responsive update
  - Update compatibility for mobile and smaller screens
  - Improve load time
- Small fixes
  - In mobile, certain maps can't be selected due to the Guess button covering them. This is now fixed
  - Update the scoring system

## v1.0.631
- Small fixes
  - Fixed UI issues related to mobile
  - Minor improvements

## v1.0.632
- Small updates
  - Updated UI
  - Better endscreen

## v1.0.633
- Minor bug fixes
  - Fixed a bug where you can't change gamemode in some situations
  - Changed "Time up!" to fit with the new endscreen

## v1.0.634
- Minor bug fixes
  - Fixed a bug where you can't interact with some places on the map
  - Fixed several bugs related to countdown and time up functions
  - Fixed several bugs related to Star Rail Map dropdown
  - Updated timer UI

## v1.0.7
- A lot of updates and improvements
  - You can now input Time, See Time and Round with text, with Time and See Time limited to **60000** seconds, and Round limited to **250** rounds.
  - Time and See Time slider limit increases from **300** (5 minutes) to **600** (10 minutes)
  - Seed text limit increases from **16** to **64** (Note: You cannot write any number higher than **9 times (10^15)**)
  - Seed now display text input and seed from text input correspondingly
  - Now Time and See Time can be set to Infinity (**0**)
  - You can use **Spacebar** to click "Next Round" now
  - Update the scoring system and distance
  - Update Blur filter
  - Now screen will glow red when the time is less or equal to 10 seconds
- Small bug fixes
  - An error in Console log related to Countdown finally resolved (i was a total idiot lol)
  - Fixed some bugs for Time, See Time, and Round able to type in text input WAYYY more than the limit
  - Fixed several issues related to the image
  - Fixed a bug that you cannot click on Options or Credits

## v1.0.8
- Several changes and improvements
  - See Time default value is now 0 (Infinity)
  - Now when you select a map from Star Rail Map, all submenus and menus will not show (Thank you deyuaru for your suggestion)
  - Change Time and See Time countdown color
  - Now incorrect guesses will not show your marker placed in the map (Thank you deyuaru for your suggestion)
  - Now you can see the distance between your guess and the correct guess with a dashed line
  - Added Python codes for generating image names quickly (in case if you want to mod this)
  - Update the scoring system

- Several bug fixes
  - Fixed a bug where Supply Zone - F1 is incorrect even if it is correct
  - Fixed a bug that the line between your guess and correct guess is not correct (line connected to the previous correct guess)
  - Fixed a bug related to the scoring system

## v1.0.9
- Update: Visual Update
  - Now select a filter will display them next to score
  - In Survival Mode, now display a Difficulty represent the requirements increase over time
    - Difficulty I: Increase Req by 500
    - Difficulty II: Increase Req by 1000
    - Difficulty III: Increase Req by 1750
    - Difficulty IV: Increase Req by 2250
    - Difficulty V: Increase Req by 3000
    - Difficulty VI: Increase Req by 3750
    - Difficulty VII: Increase Req by 4500
    - Difficulty VIII: Increase Req by 5000
    - Difficulty IX: Increase Req by 6250 (Death Difficulty)
- Several bug fixes and improvements
  - Fixed an issue where the image looks weird/ not loaded properly (Thank you Zorus for finding this bug)
  - Fixed several issues related to map
  - Fixed a bug with spacebar function and scoring

## v1.0.91
- Update: Filters
  - Blur is now replaced with Pixelate
  - Update descriptions for Time, See Time, Rounds and Filters

- Several bug fixes and improvements
  - Fixed a bug where the timer does not work with Pixelate or Pixelate in combination with Scramble, this is now fixed
  - Several bugs with Pixelate

## v1.0.92
- Several bugs fixes
  - Fixed several severe bugs with Pixelate, Scramble, Time and See Time
  - Fixed a bug related to Time and See Time

## v1.0.93
- Several updates
  - Pixelate Filter nerfed from size 10 to size 5
  - Now if Time < 30 seconds, screen flashes red longer
- Minor bug fixes

## v1.0.10
- New DLC!!! Superstition Gamemode
  - Choose between 3 random Superstition, each contain 1 random Buff and 1 random Debuff. Depends on what you choose can make or break the run! (Some effects don't stack and only active once)
  - You must choose a superstition every 5 rounds.

- A lot of bug fixes and improvements
  - Easier looking code yippieeeeeee.
  - A lot of bug fixed related to Superstition mode.

## v1.0.101
- Minor fixes and changes
  - Fixed some mobile and lower resolution UI issues.
  - Fixed a bug with Buff "For every 10m from the correct location, gain 100 points, up to 100m."
  - Rebalanced and adjust several Buffs and Debuffs in Superstition mode.
  - EXTREMELY BUFFED Survival mode (for Superstition only).
  - Rebalanced Survival mode.
  - You can now play up to 1000 rounds! (For try hards if you can haha)

## v1.0.102
- Minor changes
  - Added more information (i)
  - Rebalanced Survival mode.
- Infinite generation, now you can play infinitely, the only thing stop you is your mental haha.

## v1.1.0
- Official release haha
- Minor changes
  - Rebalanced Survival mode.
  - Disabled Penacony temporary (I have not touched Penacony)

## v1.1.1
- Update Superstition mode
  - New buffs and debuffs.
  - Removed several old and repetitive effects.
- Minor changes
  - Rebalanced the scoring system.

## v1.1.12
- Big optimizations and performance enhancements
- Balance Superstition buffs and debuffs.

## v1.1.13
- Some optimizations and performance enhancements
- Several changes
  - Map now zooms in based on distance between your guess and the correct location.
  - Timers now use floats! (You can actually do 0.01 second guesses now xd).
  - See Time now has an additional 3 second wait before the image shows up (I'm planning to be able to customize this variable also).
  - Removed Penacony.

## v1.1.14
- Some code optimizations
- Several changes
  - UI Updates for better visuals
  - New setting: Hold (Time delayed before the round starts)

## v1.1.15
- Several bug fixes
  - Fixed incorrect guesses bug on Jarilo-VI - Corridor of Fading Echoes.
  - Update the scoring system.
  - The map after each guess will now zoom in the middle of your guess and the correct location marker.
  - More randomized seed generations

# Attribution
All images, music, anything related to Honkai Star Rail and Hoyoverse belongs to Hoyoverse. I am not affiliated with Honkai Star Rail or Hoyoverse.
