---
layout: post
title: "About the RL Trader Project"
date: 2022-08-21 10:37:00 -0500
categories: RLTrader OpenAI Gym
---
## Let's build the best RL Gym we can for algotrading!

Today is my birthday! (aug 22)

### Introducing RLTrader

This is project I started working on 4ish months ago, when I took a coursera course called [Reinforcement Learning for Trading Strategies](https://www.coursera.org/learn/trading-strategies-reinforcement-learning)

A few months ago a couple of coworkers at my old company were getting together regularly to create a trading tool for fun and profit. I suggested another direction of doing fully automated trading; instead of controlling the trades we would control other dials, like risktaking behavior on an AI, setting goal/tasks like market-entry and market-exit, and automated portfolio management.

I've been interested in getting more into this field, and I had an idea. Something new. Let's build a best-of-class OpenAI Gym environment people can use for testing and training sophisticating trading strategies, based on a hybrid of real-world and simulated data. 
If someone used this gym and trained their RL trading agent on it, and moving markets is an emergent behavior of the algorithm, that will be a huge accomplishment of this project.

### The plan

[OpenAI Gym](https://www.gymlibrary.ml/) and its massively multi-agent sibling [Petting Zoo](https://www.pettingzoo.ml/) are frameworks for training reinforcement learning agents, like playing atari, go, starcraft, etc. 


My goal is to create a pettingzoo environment that will simulate a an environment that agents can trade on, and build a trading agent within that. On a more ambitious scale, I will build an AI trading agent on this platform, and run hundreds or thousands of copies, building an open source community around this ecosystem.

Price evolution will occur as the agents learn to trade better against as well as feeding in NASDAQ ITCH data or crypto exchange data, and running the agents on top of those

There will be agents with varying levels of market share. Larger  share agents will have a greater ability to move the market, while smaller share agents will have to follow and forecast.

This is a bit ambitious I'll admit. It's a bit like trying to build a sandcastle that will be 1000ft long, and 100ft high, with this huge 20ft wide moat, except the only problem is you're 5 and you only have a tiny plastic shovel.

### Components


- [x] [Exchange Server](https://github.com/spencerbug/RLTrader/issues/2)
- [ ] [Analytics Server](https://github.com/spencerbug/RLTrader/issues/3)
- [ ] [Create pettingzoo gym environment](https://github.com/spencerbug/RLTrader/issues/4)
- [ ] [Create RLTrader Agent](https://github.com/spencerbug/RLTrader/issues/5)
- [ ] [Feed in data from external sources](https://github.com/spencerbug/RLTrader/issues/6)
- [ ] [Create a limit order/aggregator](https://github.com/spencerbug/RLTrader/issues/7)

