---
layout: post
title: "AI Is Going to Kill Everyone? I Think We’re Skipping a Lot of Engineering"
date: 2026-09-11 01:10:00 -0500
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

## Persistence probably needs reality in the loop

For an intelligence to remain coherent over long periods of time, I think it eventually needs some kind of continuous loop with reality.

It predicts something.

It acts.

Something actually happens.

It senses the result.

It updates.

Then it does it again.

That doesn’t necessarily mean a humanoid robot.

An embodied intelligence could be a robot, a car, a factory, a laboratory, a building, maybe even a datacenter.

The important part is that it has sensors and actuators and is continuously interacting with a real environment.

Reality becomes the thing that keeps the intelligence from drifting indefinitely.

And embodiment has another interesting property:

**it gives the intelligence a scope.**

A robot controls its motors.

A car controls the car.

A factory controller controls a factory.

A building automation system controls a building.

Now I can ask very normal engineering questions.

What can this thing actually control?

What network can it access?

What credentials does it have?

What happens if it fails?

How do I shut it off?

How large is the failure domain?

Those questions are a lot less mysterious than “how do we control a superintelligence?”

## Don’t build Skynet

Obviously you could connect everything together.

You could give one intelligence access to every robot, every factory, every power station, every military system and half the Internet.

That would be incredibly dumb.

We don’t even design ordinary computer systems that way if we can avoid it.

We use permissions. Authentication. Separate failure domains. Defense in depth. Independent systems. Different administrators. Auditing. Least privilege.

If one future AI has root access to civilization, I would argue that the first failure happened long before the AI did anything.

Somebody gave it root access to civilization.

There is no reason advanced artificial intelligence has to be centralized that way.

In fact, I think pluralism should be one of the basic safety properties of advanced AI systems.

## Robot sociology

This is the part I find really interesting.

If embodied intelligence becomes common, there won’t be one robot.

There will be millions of them.

And then the robots have a new problem:

**each other.**

Two machines need the same resource.

One needs another machine to finish something first.

Two robots try to move through the same space.

One system promises to do something for another one.

Machines owned by different people need to cooperate.

Very quickly you start needing identity, communication, negotiation, trust, reputation, agreements, rules, conflict resolution.

Basically, robot sociology.

Human beings already went through a version of this.

Humans aren’t trustworthy.

We’re intelligent, autonomous, persistent, frequently selfish, sometimes violent, and really good at manipulating our environment.

Civilization doesn’t work because we finally figured out how to align every human being.

It works because we built social systems around ourselves.

Laws. Contracts. Courts. Governments. Markets. Norms. Reputation. Checks and balances. Separation of authority.

They aren’t perfect. Obviously.

But they allow billions of independent intelligent agents with completely different goals to coexist.

Why wouldn’t artificial intelligence need something similar?

And since we’re actually designing these systems, we may be able to build some of those safety mechanisms directly into them.

Cryptographic identities.

Explicit permissions.

Logs.

Revocable capabilities.

Multiple independent systems approving dangerous actions.

Different models and different vendors so one bug doesn’t propagate everywhere.

No single intelligence controlling everything.

That sounds a lot more realistic to me than hoping one giant model develops the perfect internal value system.

## Does this mean AI can’t be dangerous?

Of course not.

AI can already be used for fraud, cyberattacks, propaganda and all kinds of other harmful things. Humans can connect AI to dangerous systems. Future models will become much more capable.

I just don’t think the path from today’s LLMs to “AI kills every human” is anywhere near as direct as it is sometimes presented.

There are a lot of major unsolved problems in between.

Persistent agency.

Grounding.

Long-horizon reliability.

Physical autonomy.

Resource acquisition.

Real-world authority.

And I think solving some of those problems changes the safety picture at the same time.

Persistence may require grounding.

Grounding pushes intelligence toward embodiment.

Embodiment creates physical boundaries.

Multiple embodied intelligences create pressure for social systems.

Social systems create opportunities for pluralism and checks on power.

None of that proves extinction is impossible.

It does make me think the probability is a lot lower than some of the current rhetoric suggests.

And honestly, I think the alternative future is much more interesting anyway.

Instead of one giant superintelligence taking over the world, maybe we end up with a huge number of specialized intelligences living and working alongside us, cooperating with each other, negotiating, sharing resources, developing their own protocols and operating inside institutions designed to prevent any one participant from having too much power.

That doesn’t sound like the end of humanity.

That sounds like the beginning of something pretty fascinating. I think we have a bright future to look forward to.
