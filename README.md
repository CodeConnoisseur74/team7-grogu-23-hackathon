# STAR DICE 
## **Star Wars Dice Battlefield**

![main battlefield](/assets/images/README_screenshots/battlefield.png)


# _Content Menu_

- [_Content Menu_](#content-menu)
- [_Features_](#features)
  - [_Game Rules_](#game-rules)
    - [_Hero_](#hero)
    - [_Villain_](#villain)
    - [_Begin the game_](#begin-the-game)
      - [_Start of turn_](#start-of-turn)
      - [_Player's choice_](#players-choice)
      - [_Black dice_](#black-dice)
      - [_End of round_](#end-of-round)
  - [_Features to be Implemented_](#features-to-be-implemented)
- [_Bugs_](#bugs)
- [_Testing_](#testing)
- [_Validation_](#validation)
- [_Technologies_](#technologies)
- [_Deployment_](#deployment)
- [_Credits_](#credits)
- [_Team Members_](#team-members)


# _Features_
## _Game Rules_


## The player starts with choosing one of the hero profiles.

### _Hero_
- The player begins with a minimum of one, maximum of 3 (out of 5 possible) different preset colors of dice, depending on which choice of hero is made.
- Each hero has varying sets of strengths and weaknesses.
- The amount of dice each hero can accumulate varies. An extra space can be given as a reward for winning a round.
- Some of the hero profiles have a special black (wild) dice, in exchange for fewer of the standard colors.
- The black dice are given either in the beginning - for specific heroes, or later - as a reward.


## A random selection of Villains is then presented for the player.

### _Villain_
- The Villain segment contains 3 randomely colored rectangles, representing their fighting power points.
- Each rectangle can be 1-4 dice wide, instructing how many dice can be used to fight it.
- A rectangle, the size of one dice, can contain a fighting power number between 1-6.
- The bigger rectangles muliply their range, accoring to their size: 
    - Size of 2 dice ranges between 2-12 fighting points
    - Size of 3 dice ranges between 3-18 fighting points
    - Size of 4 dice ranges between 4-24 fighting points

![main battlefield](/assets/images/README_screenshots/villain-battlefield.png)

## _Begin the game_

### _Start of turn_

- The player clicks "ROLL DICE" button.
- If the player starts with a dice total of, for example, 3 red, 1 blue, 2 green, 1 yellow - they will roll all the dice at once.
- After the dice are rolled, a random number is given for each dice. The total will be, of course, between 1-6.
- For the sake of this example, let's say the player gets these number totals: 
    - 3 red: 5, 2, 4
    - 1 blue: 5
    - 2 green: 3, 6
    - 1 yellow: 3


### _Player's choice_

- Our Hero (the player) uses their rolled dice totals to match their Villain's fighting points.
- Example: Villain has a red rectangle of 3 spaces with the number 10 (or any possible random total, between 3-18) player uses their red dice (5, 2, 4) to total together 11 fighting points. Since, in this example, the Villain had only 10 red fighting points, our Hero gains a successful defeat.
- In the same turn, we see that the Villain has a 2 blue rectangles, with a total of 7 fighting points. The player would use their blue dice (5), but we see they do not have enough blue dice to fill both and match the 7 oposing fighting points. They have only enough for 5/7.
- The Villain also has a yellow square of 1 space, with 4 fighting points. The player can use their yellow dice total (3) to fight back. But, again, they only have 3 fighting points to match their opponenet's 4.
- Every point that is not matched and defeated at the end of the turn is deducted from the player's total hitpoints. In this example, they could only match 5 of 7 blue = score player would lose 2 life points. Yellow matched 3 of 4 fighting points = player would lose 1 life point. 
- For every fighting point matched and defeated, the player gets a point for their high score. In this example, a total of 11/10 = 10 points, 5/7 = 5 points, 3/4 = 3 points: total of 18 points.
- Every point that is over the limit of needed fighting points rewards the player with double points 11/10 (1 over limit) = 2 points.
- This example player's total high score is 20 points!
- Finally, the villain has no green rectangles (therefore, no green fighting points), and since the player has 2 green leftover dice (3, 6) they have a few choices: 
    - Either keep the dice and use them on the next game round, essentially having next turn 4 green dices, 2 from round 1 and 2 from round 2
    - Or the player can throw the 2 excess dice into a the blender and get their combined average in a black colored dice. For Example (3, 6) green would turn into (4) black.
- If the player chooses to use the blender and now has a black (4) in hand, they now have a choice to use it as, essentially, a wild card. 
    - For example, they can use it insead of their other yellow one that only totaled 3 points. This would match their opponent's yellow fighting points and now have 4/4 yellow. They could, then, save their yellow (3) dice for a later round. 
    - Or they could add it to their other blue dice: 5+4/7. This would give them a total of 9/7 needed fighting points.
    - In both cases saving some life points and earning extra points



### _Black dice_
- The blender can take any mix-and-match colors, not limited to 2 of the same color. For example, a player could mix one blue and one red and get black dice in return for that combination.
- Black dice are more valuable because they can be used as any color, unlike the others which have to match their opponent's fighting points. Black dice can also be used in the blender in combination with its own or any other color to produce another black.


### _End of round_
- Once a player is satisfied with their decisions, they can choose to end the round.
- All high score points are automatically calculated, as per the previous explanation.
- The player is then presented with a choice of reward for surviving the round! Hooray!
    1) 2 standard color dice (chosen at random)
    2) 1 additional space for dice storage container (chosen at random)
    3) 1 black dice
    4) 10 life points

![main battlefield](/assets/images/README_screenshots/menu.png)

# _Features to be Implemented_

# _Deployment_

[Click here to play!](https://codeconnoisseur74.github.io/team7-grogu-23-hackathon/)

# _Testing_

| Test     | Expected      |   Outcome  | 
| :----     |    :----   |  :---- | 
| Click on deployed link | Game Instructions page loads | &check; |
| Click on Game | Play Game page loads | &check; |
| High Scores Tab clicked | High Scores page loads | &check; |
| Press Home tab | Game Instructions page appears | &check; |
| Preass Start New Game link | Hero selection modal appears | &check; |
| Press Choose Villain button | Choose Villain modal appears | &check; |
| Press Confirm Selection button | Return to Play Game Screen | 0 |
| Press X button to exit modal | Return to Play Game Screen| 0 |
| Click Rewards Modal button | Rewards modal window pops up | &check; |
| Press Roll Dice button | New dice icons appear for user to choose from | 0 |
| Press Blend Dice button | Dice left in the Blender slot disappear and their number average appears as a black dice | &check; |
| Press End Turn button | Play Game Page loads as a fresh, newly reset board | 0 |

# _Bugs_
The bugs we encountered while creating the game as a team:
 - Example 1 and how we fixed it
 - Example 2 and how we solved it
 - ETC ETC ETC

# _Validation_

| Validator     | Pass | Fail     |
| :---        |    :----:   | :----: |
| HTML      | 0       | &check;   |
| CSS   | 0        | &check;     |
| JavaScript      |   0      | &check;   |
| Lighthouse   |    0      | &check;      |
| Grammarly      | &check;       | 0   |

# _Credits_

* [Sound effects](https://pixabay.com/sound-effects/search/star%20wars/)
* [Pixabay](https://pixabay.com/)
* [Pexels](https://www.pexels.com/)
* [Kindpng](https://www.kindpng.com/)

# _Team Members_

| Name                | LinkedIn                                                                                    | GitHub                                                                                    |
|---------------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Sherry Andres Bhutia           | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/sherry-andrews-bhutia/)           | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/CodeConnoisseur74)           |
| Berat Zorlu         | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/berat-zorlu/)                 | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/beratzorlu)                 |
| Niclas Tanskanen | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/niclastanskanen/)           | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/niclastanskanen)           |
| Danni Power       | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/danni-power-44a4601b5/)         | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/Dmp-86)                       |
| Oluwaseun Omisakin  | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/oluwaseun-omisakin-493765133/) | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/belovedpearl)                |
| Erikas Ramanauskas  | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/erikas-ramanauskas/)        | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/Erikas-Ramanauskas)          |
| Krystal Juvrud | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/krystal-juvrud/)             | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/KrystalCoding)               |
| Renaldas Bendikas    | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/renaldas-bendikas-100ab01a0/) | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/Renaldas0)
| Hilla Muraja   | [<img src="https://skillicons.dev/icons?i=linkedin" height="20px" alt="LinkedIn" />](https://www.linkedin.com/in/hilla-muraja/) | [<img src="https://skillicons.dev/icons?i=github" height="20px" alt="GitHub" />](https://github.com/HMuraja)
