## PLANT EVOLUTION SIMULATION
The simulation shows a population of plants (roughly based on plants in the mustard family).
The lifecycle is shown, from germination to growth of leaves, buds, flowers, and seedpods.
The seedpods eventually drop their seeds, the old plants whither away, and a new population grows.
Users can select which plants the seeds for the new generation will be from.
This will model the process of evolution of the population by artificial selection (selective breeding).
If users do not make selections, the population will anyway evolve through natural selection.
Various events will be simulated in which certain plants will be destroyed, 
leaving other plants to produce seeds for the next generation.
## TODO
  - [✓] fix: stems growing away from stalk
  - [✓] Add backgrounds
  - [✓] Drop the seeds to a point just above the ground
  - [✓] Adjust the seedpod sizes
  - [✓] Make the seedpod appear when the seedpod opens, as the flower grows
  - [✓] Make seedpod grow in between front and back petals
  - [✓] Fix: the leaves on plants in new season are not coming like the parent plant
  - [✓] The positions of the plants move off the canvas for large nPlants
  - [ ] Two plants are selected at once for large nPlants
  - 
  - [ ] streamline the organisation 
  - [ ] can we make a clock function that keeps increasing time and is used to set the flow?
  - [ ] Eventually make a slider to speed up and slow down time

  - [✓] SELECTION: Adjust parameters for leaf width and length in new generation
  - [ ] SELECTION: Adjust colours and make new generation inherit colours 
  - [✓] SELECTION: Make the number of leaves a selection variable
  - [ ] SELECTION: Make the number of seedpods a selection variable
  - [ ] SELECTION: Make the number of seeds in the seedpods a selection variable
  - [ ] SELECTION: Make the final seed size (seediam) a selection variable
  - [✓] SELECTION: Red circles' heights 

  - [✓] LEAVES: some leaves are turning into buds
  - [✓] LEAVES: Initial leaf sizes are not being set properly - all leaves on one plant should be similar
  - [✓] LEAVES: In the initial population, make the leaves on each plant quite different from those on other plants
  - [✓] LEAF: Improved the leaf shape a little
  - [ ] LEAF: Make a new, improved leaf
  
  - [✓] STEMS: Give all the leaves on a plant the same final stemlength 
  - [✓] BUD: put a tiny bud at the top of the growing stalk

  - [ ] SEADPOD: the position of the seedpod is migrating slightly as it grows
  - [ ] SEADPOD: draw a green line connecting the seed positions to make a better seedpod
  - [ ] SEADPOD: Seeds and seedpods stop growing if selected before final size

  - [✓] SEASON: When season is clicked before all seeds have fallen, the new plants grow from above ground
  - [✓] SEASON: The characteristics of the parent are not being passed properly to the offspring
  - [ ] SEASON: do not let seeds fall before the plant is fully grown
  - [ ] SEASON: If no plants were selected before pressing new season, select all plants and drop all seeds
  - [ ] SEASON: Do not let new season be clicked until all seeds have fallen to the ground
  - [ ] Make a timer mechanism to generate new seasons without the users (for natural selection)
  
  - [ ] Adjust distances between stems and make multiple buds at the top of the growing stalk
  - [✓] FLOWER: Make flower petals dry up and fall off as the seedpod grows
  - [✓] FLOWER: Make petal fly away faster and flutteringly
  - [✓] FLOWER: add stamen
  - [ ] Make old plants whither away
  - [ ] Make plants bend over

  - [ ] User testing
  - [ ] figure out the legal aspect
  - [ ] test version on itch  
  - [ ] Make multiple bolts of lightning
