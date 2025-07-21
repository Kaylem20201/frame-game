# Frame Game

A game comparing move data from various fighting game characters form Guilty Gear Strive. Data is pulled live from the Dustloop wiki API.
Built in Next.js and Typescript.

Hosted publically on AWS [here](http://ec2-3-138-143-222.us-east-2.compute.amazonaws.com:3000/).

API available [here](http://ec2-3-138-143-222.us-east-2.compute.amazonaws.com:3000/api).

## Deploying

`npm i` to install dependencies.

`npm run dev` to run a local test deployment.

`npm run build` for an optimized build, and `npm run start` to deploy.

Prettier is used for formatting.

## TO-DO

- [x] Host API
- [x] Add unit tests for consuming Dustloop API
- [ ] Implement HTTPS
- [ ] Provide full matchup info+links on game-end
- [ ] Provide full API options in UI
- [ ] Implement other games+themes (GBVSR, SF6)
  - [ ] Add API tests for all games
