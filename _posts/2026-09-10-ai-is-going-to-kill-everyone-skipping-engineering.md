---
layout: post
title: "AI Is Going to Kill Everyone? I Think We’re Skipping a Lot of Engineering"
date: 2026-09-10 23:50:00 -0500
permalink: /blog/ai-is-going-to-kill-everyone-skipping-engineering/
---

There have been a bunch of articles lately about researchers leaving Anthropic and OpenAI because they think AI development is becoming too dangerous. Some of the predictions are pretty extreme. Not just “AI could cause serious problems,” but actual human extinction.

I keep coming back to the same question:

**How does that happen, exactly?**

Because there seems to be a gigantic gap between the AI we have today and an independent intelligence capable of wiping out humanity, and I think people are hand-waving over a lot of very difficult engineering problems in between.

Current models are incredibly impressive. I use them all the time. They can write code, analyze systems, search through information, use tools, reason through problems, and do things that would have seemed ridiculous a few years ago.

They also drift constantly.

Give an AI agent a long enough task and eventually it starts losing track of what it is doing. Assumptions creep in. Intermediate mistakes propagate. It forgets constraints. Context gets summarized and changed. It starts solving a slightly different problem than the one you originally gave it.

Humans still have to keep pulling it back onto the rails.

That seems like a pretty important limitation for something that is supposedly going to independently execute some incredibly complicated plan to take over civilization.

## Language grounded in language

I think the problem goes deeper than context windows or better memory systems.

Large language models mostly learn about the world through things humans have already written about the world.

Their language is grounded in more language.

Eventually that language traces back to physical reality, of course. Somebody touched the hot stove. Somebody watched the object fall. Somebody figured out what friction was. Somebody experienced what “mine,” “yours,” “give,” “take,” and “danger” meant before those concepts got written down.

But the model gets the description.

Humans and animals get the experience.

That distinction feels important to me.

One comparison I keep coming back to is how little language a child needs compared with a large language model. The exact number varies a lot depending on how you measure it and what environment the child grows up in, but by around four a child has heard on the order of tens of millions of words. I usually shorthand it as something like **15 million words**. By that age, a child already understands language remarkably well and is becoming fluent.

Modern language models are trained on **trillions of tokens**. Meta says Llama 3 was pretrained on more than [15 trillion tokens](https://ai.meta.com/blog/meta-llama-3/).

That is an enormous difference in learning efficiency.

A child does not have to infer the entire meaning of “hot” from statistical relationships among sentences about hot things. They touch things. They feel temperature. They watch steam rise. They hear an adult say “hot” while something hot is actually in front of them. The same thing happens with weight, distance, ownership, fear, falling, giving, hiding, wanting, and thousands of other concepts.

Language is attached to an enormous stream of physical and social experience. In a sense, it is the human experience encoded into a communication system.

That makes me suspect an embodied intelligence could eventually learn and process language with dramatically less training data and compute than modern language models require. If the concepts are already grounded in perception, action, memory, and consequences, language does not have to reconstruct the world indirectly from correlations in text. The words can point at concepts the intelligence already has.

If I have a bad model of where a wall is, eventually I walk into the wall. Reality corrects me.

If I misunderstand how much force is required to pick something up, I drop it.

If I make a prediction about another person’s behavior and I’m wrong, I get feedback.

Physical reality keeps pulling our internal models back into alignment.

LLMs don’t really have that loop. They can consume sensor data, images, tool outputs, databases, and all kinds of other information, but there still isn’t a persistent intelligence continuously existing inside an environment and having its predictions corrected by that environment.

I suspect that matters a lot for long-term persistence.

## What would an actually dangerous AI need?

If we’re talking about an AI capable of independently becoming an existential threat, it seems like it would need quite a few things that current systems aren’t particularly good at.

It would need to maintain an objective over very long periods of time without drifting.

It would need a reliable model of what is actually happening in the world.

It would need to learn from the consequences of its own actions.

It would need to recover from unexpected events.

It would need resources, compute, energy, communications, and some way to physically affect things.

It would need to keep working while people were actively trying to stop it.

And it would have to do all of that with very little human supervision.

That’s a much bigger leap than making the next LLM smarter.

My suspicion is that once you start solving those problems, you end up moving toward **embodied intelligence**.

And that’s where the argument gets interesting.

<a id="persistence-probably-needs-reality-in-the-loop"></a>
## Why persistence probably needs reality in the loop

For an intelligence to stay coherent over long periods of time, I think it eventually needs a continuous loop with reality. It predicts something, acts on that prediction, sees what actually happened, and then corrects itself. You can fake pieces of that with databases, memory systems and agent frameworks, and we already do, but at some point there is a difference between remembering a description of the world and actually being in the world while it changes around you.

That does not necessarily mean a humanoid robot. An embodied intelligence could be a car, a factory, a laboratory, a building, maybe even a datacenter. The important part is that it has sensors and actuators and some real environment that keeps pushing back on its internal model. If it thinks a valve opened and the pressure sensor says it did not, that is a correction. If it thinks a robot arm is somewhere it is not, the encoder tells it. Reality keeps re-anchoring the state instead of letting an error get repeated for another thousand tokens.

This is also where embodiment changes the safety question in a way I don't hear discussed much. Once an intelligence acts through a real system, it has a scope. A robot has motors and whatever tools are attached to it. A car has steering, acceleration and braking. A factory controller has whatever equipment is actually wired into that control system. Even a datacenter agent still has credentials, network boundaries and machines it can or cannot reach.

So suddenly the questions are pretty ordinary engineering questions. What can this thing actually control? What network can it reach? Which credentials does it have? What happens if it gets something wrong? Can another system revoke its access? How large is the failure domain? These are questions we already know how to reason about, even if the answers get harder as the systems get more capable.

## Don’t build Skynet

Obviously we *could* throw all of that away and connect everything together. Give one intelligence access to every robot, every factory, every power station, every military system and half the Internet. I mean, sure, that sounds dangerous. It also sounds like an unbelievably bad system design.

We already spend a huge amount of effort trying not to design normal computer systems that way. We use authentication, permissions, separate administrative domains, least privilege, defense in depth, auditing, physical segmentation, all of that stuff. None of those ideas stop applying because the software got smarter.

If one future AI somehow has root access to civilization, the first catastrophic mistake happened before it decided to do anything. Somebody built a control plane with root access to civilization.

And I don't really see why advanced AI should naturally converge on one giant central intelligence anyway. We don't have one human brain controlling the planet. We have governments, companies, communities, machines, protocols, competing interests and lots of overlapping authorities. It is messy, sometimes terribly so, but the mess is also part of what keeps one failure from instantly becoming everyone's failure. I think advanced AI probably needs that same kind of pluralism.

## Robot sociology

This is probably the part of the whole argument that I find most interesting. If embodied intelligence becomes common, there won't be *a* robot. There will be millions of machines and systems owned by different people, doing different jobs, sharing spaces and depending on one another. At that point their biggest environmental complication may actually be each other.

Two machines want the same charging station. One robot needs another robot to move first. A warehouse system needs a delivery system to show up when it said it would. Machines owned by completely different organizations need to share a road, a loading dock, radio spectrum, electrical power, compute, whatever. Pretty quickly you need identity and communication, but then probably also reputation, negotiation, agreements and some way to handle conflicts when somebody doesn't do what they said they would.

Basically, robot sociology.

And humans already have a version of this problem. We are intelligent, autonomous, persistent, frequently selfish, occasionally violent, very good at manipulating our environment, and definitely not all aligned to the same objective function. Civilization works as well as it does because we built a huge pile of social systems around ourselves: contracts, laws, courts, norms, markets, governments, professional standards, reputation, checks and balances. They're all flawed, and some are a mess, but the basic idea is that nobody has to be perfectly trustworthy for the larger system to function.

I don't see why artificial agents would be fundamentally different there. In some ways we could even make the machinery more explicit. Machines can have cryptographic identities. Permissions can expire. Actions can be logged. Capabilities can be revoked. Dangerous actions could require agreement from several independent systems. Different vendors and different models could reduce the chance that one bug, one bad update, or one weird behavior propagates everywhere at once.

That seems like a much more realistic safety model to me than putting all of our effort into making one gigantic intelligence perfectly good forever. You assume individual parts can fail, including intelligent parts, and then you design the system so one failure doesn't own everything.

## Does this mean AI can’t be dangerous?

No, and I don't want to make that claim. AI can already be used for fraud, cyberattacks, propaganda and plenty of other harmful things. Humans can connect models to dangerous systems right now, and future models are obviously going to become more capable.

What I don't buy is the idea that the path from today's LLMs to “AI kills every human” is short or automatic. There are a lot of hard things that have to get solved along the way: persistent agency, grounding, long-horizon reliability, physical autonomy, access to resources, and then enough real-world authority to do something at civilization scale. Any one of those is a serious engineering problem.

And the thing I keep coming back to is that solving those problems may change the risk at the same time. If persistence needs better grounding, and better grounding pushes us toward embodied systems, then those systems start having actual boundaries. Once there are lots of bounded intelligent systems, they need ways to coexist, and that creates pressure for some kind of social structure and governance between them. None of that guarantees safety, obviously, but it means the future does not have to look like one giant intelligence suddenly escaping from a chat window and taking over the planet.

Could we still screw this up? Absolutely. We could centralize everything, give one system absurd permissions, connect critical infrastructure together in ways that create giant correlated failure domains, or deliberately build autonomous weapons without enough checks. Humans are very capable of making bad architectural decisions when convenience or money is involved.

I just think the extinction argument often skips over too much of this middle. It takes today's models, assumes the limitations disappear, assumes autonomy and persistence get solved, assumes intelligence turns into real-world power, and then jumps to the end state. Maybe that chain happens. I don't think it is impossible. I just don't think we have enough reason to treat it as the default outcome.

The future I find more plausible, and honestly more interesting, is a huge number of specialized intelligences living and working alongside us. Some will be robots, some will run facilities, some will help people, some will do science or manage infrastructure. They'll have to cooperate with humans and with each other, and we'll end up building rules and institutions around that whether we call it “robot sociology” or something less silly.

That sounds difficult, but it doesn't sound hopeless. I think we have a pretty bright future to look forward to.
