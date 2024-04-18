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
  - Updated 600+ locations and still updating (i swear it is enormous)
- Minor bug fixes
  - There is a bug where you can get Jarilo-VI's location even if you picked Herta Space Station, this is now fixed
  - Update the scoring system

# Attribution
All images, music, anything related to Honkai Star Rail and Hoyoverse belongs to Hoyoverse. I am not affiliated with Honkai Star Rail or Hoyoverse.
