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
## Difficult
  - [ ] Make a timer mechanism to generate new seasons without the users (for natural selection)
  - [ ] Make plants bend over in wind or flood
  - [ ] Become a github expert
## Easier
  - [ ] SEADPOD: the position of the seedpod is migrating slightly as it grows - improved by slowing down rate
  - [ ] SELECTION: Adjust colours and make new generation inherit colours 
  - [ ] Make internode distances stretch as the plant grows (needs to be coordinated with stalk growth) 
  - [ ] Add backgrounds
  - [ ] figure out the legal aspect
  - [ ] User testing - some done 

## DONE
  - [✓] LEAVES: Randomly choose right or left side for first leaf
  - [✓] Make plants' shapes less mechanical - done by making stems as bezier curves 
  - [✓] Make old plants whither away
  - [✓] Make a slider to speed up and slow down time
  - [✓] Consider making a global timer to regulate all growth rates??
  - [✓] SELECTION: Make the stems curvy
  - [✓] SELECTION: Make the final seed size (seediam) a selection variable
  - [✓] SELECTION: Make the number of seeds in the seedpods a selection variable
  - [✓] SEADPOD: draw a green line connecting the seeds and pointed end
  - [✓] Make the leaf angles greater towards the bottom
  - [✓] SELECTION: Make the threshold (for leaves belox, seedpods above) a selection variable
  - [✓] SELECTION: Make the number of seedpods a selection variable
  - [✓] LEAVES: Sometimes a leaf jumps out beforehand (I finally figured out why: in stem: if(this.pos.y < (height - this.plant.currHeight + 5))) - but how to keep stems below maxHeight????
  - [✓] LEAF: Make a new, improved leaf
  - [✓] fix: stems growing away from stalk
  - [✓] Add backgrounds
  - [✓] Drop the seeds to a point just above the ground
  - [✓] Adjust the seedpod sizes
  - [✓] Make the seedpod appear when the seedpod opens, as the flower grows
  - [✓] Make seedpod grow in between front and back petals
  - [✓] Fix: the leaves on plants in new season are not coming like the parent plant
  - [✓] The positions of the plants move off the canvas for large nPlants
  - [✓] Error: Two plants are selected at once for large nPlants
  - [✓] SELECTION: Adjust parameters for leaf width and length in new generation
  - [✓] SELECTION: Make the number of leaves a selection variable
  - [✓] SELECTION: Red circles' heights 
  - [✓] LEAVES: some leaves are turning into buds
  - [✓] LEAVES: Initial leaf sizes are not being set properly - all leaves on one plant should be similar
  - [✓] LEAVES: In the initial population, make the leaves on each plant quite different from those on other plants
  - [✓] LEAF: Improved the leaf shape a little
  - [✓] STEMS: Give all the leaves on a plant the same final stemlength
  - [✓] BUD: put a tiny bud at the top of the growing stalk
  - [✓] SEASON: When season is clicked before all seeds have fallen, the new plants grow from above ground
  - [✓] SEASON: The characteristics of the parent are not being passed properly to the offspring
  - [✓] SEASON: If no plants were selected before pressing new season, select all plants and drop all seeds
  - [✓] FLOWER: Make flower petals dry up and fall off as the seedpod grows
  - [✓] FLOWER: Make petal fly away faster and flutteringly
  - [✓] FLOWER: add stamen
