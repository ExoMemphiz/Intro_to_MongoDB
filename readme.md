# Intro to MongoDB
 
- Made by Christopher Poul Rosendorf

### Information

This implementation makes use of Express and the MongoDB package from npm.  
All the functions are defined inside the mongoDB.ts file, and are placed in order of the Assignment:  

- distinctUsers
- linksUsers
- mostMentionedUser
- mostActiveUsers
- grumpyAndHappy

### Installation

- Clone Repository
- Ensure NodeJS is installed and working on system
- Install the dependencies by running: `npm i`
- Ensure TypeScript is globally installed through npm: `npm i -g typescript`
- Open 1 terminal in root directory of the project, then run `tsc -w` (Leave it open the whole time)
- Open another terminal and run the command: `npm start`
- Now open your browser and navigate to `localhost:3000/twitter`

### Query Results

The queries will return a result within a couple of seconds, apart from mostMentionedUser, which I explain further below.  

- **distinctUsers**: Returns an object, with the key "distinctUsers", and a value corrosponding to the distinct users. (659775)
- **linksUsers**: Returns an array of objects, _id is the name of the user, count is how many times they've linked other users
- **getMostMentioned**: Returns an array, with a key/value pair-like structure is made, between the most mentioned user and how many mentions that user has gotten
- **getMostActive**: Returns an array of objects, with the name and count of the most frequent posters
- **getGrumpyHappy**: Returns an array of objects, first half are the 0 polarity posters, and second half the 4 polarity posters

#### Addressing "mostMentionedUser"

The implementation I've made for the **mostMentionedUser** carries out a lot of the load on the client, because of the difficult expression, which currently is not really feasible without returning the matched character from a regex pattern.

One method one could think up is splitting all the words by spaces " ", and then incrementing a value if "@SomeUsername" is there with a regex pattern such as: /@\w+/  
The main problem with the above is that the results are missing some of the entries, such as when a questionmark "?", comma "," exclamation mark "!" or full stop "." is directly after the @SomeUsername, before it is being split.  
This results in a string that will potentially look like this: "@SomeUsername?", and will not increment the correct counter, as the counter will mostly be looking at "@SomeUsername", thus not correctly counting the amount of mentions that a user has gotten.

The only way I see it's possible to get an actual result using only queries would be if you could use a regex pattern: /@\w+/ and retrieve the @SomeUsername for every given @ symbol with a word directly after it, this would help tremendously, but currently MongoDB does not have this functionality in the aggregation framework.
