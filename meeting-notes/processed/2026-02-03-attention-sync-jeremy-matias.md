# Attention Sync - Jeremy & Matias

**Date:** 2026-02-03
**Participants:** Chris Humphries, Jeremy, Matias (Attention)

---

## Transcript

What's up, Chris? Hey, what's going on? How are you? How are you doing? Doing good. How's Otto? He's doing all right. We were able to get the first... There was a called Tamiflu dose was like Trying to like kidnap a child or somebody. I don't know. I felt like I just called Child Protective Services on myself

The second one, we were able to figure out how to get it to him, so that's good. He's honestly totally fine for the most part, but we're trying to keep him separate. Last year, around this time, my oldest son kept like falling asleep randomly. Like we would have no understanding. Like we'd be like at a party. Yeah. So it turns out he had mono.

It is a voice memo. It has been edited to include proper punctuation. It has been edited to include proper punctuation. I'll find some time for us to chat and figure out what we want to do there, and then do we want to change the other session a little bit to see if we can show different things too.

I'm really excited for both you and Brad. It's pretty sweet. Yeah, it's pretty cool. Yeah, I'm really proud of both. Thank you. I messed with Lily, and I said, Lily, you're going to present at Ball Company, and she was like, freaking out. She was like, no.

But I might have her present, I might, we'll see how things shape, but I might want to have Andy show some of the stuff that he's doing too, to be cool. And I'm also fine to like sit out on the second one, whatever's best. Yeah, I'm gonna figure out, maybe there are different things depending on what gets developed by then.

I almost feel like it could be cool with the all company one to show how this thing comes to life. Kind of being like, you know, we have this brainstorming session, I take it, I put it into this thing, and then you can kind of... I don't know, I'm thinking...

That's a cool thing to kind of show. What I could do is go back to one of the projects where I've done that and kind of see if I can kind of revive that a little bit. And almost like build out that process for us to show. Because I mean, I've done that with a few things where I can kind of get like, you know, the history, we've had conversations and stuff. Yeah, I mean, maybe we can kind of show like iterations and stuff that we did. I don't know. I'm going to think through what could be most helpful or cool.

I'm trying to, like, it's just so freaking cool. It is. I wouldn't even think about T is building for us a little tool is like a way for us to kind of quickly iterate, like. I can build out MVPs and send it to you. You can give feedback on it in a way that's kind of like a way to almost like, before we push it into production, like a way to kind of create clickable wireframe type things.

I must feel like it could be kind of cool to show the buying group arc. It's like we started with this concept and I can even find old slides I had or whatever and then the first version and it was kind of you know wasn't vibe coded but it was like versions of stuff that were able to start to have AI and then

Then it was like the new version and then you could show the bind group like scoring as like the last piece. It's like then it's really easy for us to add things on top of it. It could be like a cool arc to show how that works. Yeah, just five minutes is both a lot of time and not a lot of time at the same time. Is it five minutes for me and five for Brad or five total? Okay, so is this the one that Shiv's leaving? Correct.

Yeah, I know. Big time. I know, very, very cool. Yeah, I gotta get some clothes. Maybe you should just dress like Shiv. That's definitely the right. There we go. I also got my hair cut at this like mohawk thing. I'm gonna try to get it cleaned up a little bit before I show up there, but it's gonna be fun. Um, yeah, my goal with this call of attention is just to kind of like talk. Yeah, where are they?

I'll see if they come in. how we can leverage what they're doing in our own. Yeah I want to yeah I want to do that. I think I would like for you to show off what you've some of the things you've built though and kind of give them kind of an understanding of some of the things that we've done.

Both the next step updater and the buying group stuff, and I don't know how far you're on the buying group strengths things, but yeah, a little bit there. I can show a little bit of that. But I'm happy to kind of start, take us off and then ask them, it's like kind of the vision is being able to then call out to the agents that they have right through Salesforce itself and not through Slack. Yeah, that's my goal too. There it is.

Hello. What's going on? How you doing? This is going to be your favorite meeting of the day. I can predict it now. What'd you say? It's going to be your favorite meeting of the day. That I can just tell right now. You can just tell, sorry, how do you work? I was trying to say, I was like, it's gonna be your favorite meeting of the day. But now you're ruining my meeting because I had to repeat it three times. I'm just kidding. No, got it. Heard it the third time.

Really sorry about that. I had a family health crisis that popped up literally within the last minute. Literally, this is not. Yeah, please don't do that. No, no, no. It's okay. Everyone who needs to take care of the people are taking care of the people. Are you sure? Like, this is not... Yes. It won't be the best meeting of your day, but it's also not the most important meeting of whatever. It's totally, totally fine.

It's under control. You promise? I'm going to ask one more time. I think you promised. Okay. I think you promised. Okay. It's a family member who has a lot of the same kind of health things, so we kind of know what to expect and are being taken care of. I just had to check for a second.

We're good. We're good. Sweet. Okay. Awesome. Well, goals for the day I think are kind of threefold. I would love to just give you a preview of some of the stuff that we've been able to deploy and just give you some stuff to think through. I would love to discuss how we can start to weave

attention in more deeply to those things and the vision that we have. And then three, just a couple other things I wanted to push on related to some of the new things that are coming out from attention. Just want to give you some considerations on things to be thinking through.

Does that sound like a plan? Sounds awesome. Let's do it. Chris, does it make sense for you to walk through? Have you guys tried to deploy anything through Cloud Code? Salesforce before in terms of building around Not specifically in terms of like managed dashboards and stuff. So I'm ready to have my mind. Yeah Yeah So maybe Chris like start with a little bit of a backup on how all the stuff is and then we can go

Let me kind of set the stage here real quick. So basically, like, you know, we, I'm not, you know, like a traditional engineer. I don't, I've been trying to kind of figure out how to, like, I use VS code as kind of a daily driver for the IDE. Because it has a great integration with Salesforce, we can like actually work in a sandbox and push things from there. So we started to kind of think through like, okay, we've done a lot of data foundations, buying groups, getting attention, conversations in the Salesforce.

How do we sort of capitalize on that, but also maybe use Salesforce's kind of design systems to kind of like build different kind of UI experiences in Salesforce, you know, for that. And so I started playing with Cloud Code inside VS Code. I'll pull down our org as a sandbox, basically, and then can you effectively, you being Cloud Code, take the context, look at the objects, look at the fields, and then start to weave together a visual experience for that up there.

So I'll show my screen real quick, kind of what that looks like here. But basically, you know, this is a project we've been working on, but like, if I kind of look at the project, like... This is your typical kind of Salesforce structure, you know, when you're kind of deploying. Today our solidus go here. This is like, this is our sandbox, you know, and pull down whatever I want to pull down to work with so that I can say, Hey, before we start working.

Here's where I get up to speed with the objects, the fields, that kind of thing, and go from there. And then when I start to point from there, then it starts to spit out. Things like this, a full-on Lightning Web Component, so it's writing all the different pieces of that, things like that, and iterating over time.

Where that takes us is, and like, this is one of the first ones we did, the next steps hygiene type tool to basically like, if I refresh it, it'll load again. That's so sick. But basically, uh, Basically, like, you know, like say, hey, this has got next next steps on it, or here's the last time you updated it.

So we can actually pull in context from emails. That is the attention call too, that we've pushed all of our attention. Have you seen that before, though? No, this is the first time I see this. So yeah, maybe Chris quickly walk through how you've instrumented this. Yeah, so this is all through Trey. They say that we're getting webhooks from attention when the calls occur.

We're then kind of processing that payload effectively to like build out a basic kind of call structure. And then also a few custom objects around like, or participants who is on the call. What insights did you guys pull out of it? You know, so again, it's what y'all are already kind of doing.

You know, from there, bringing those in and also storing the transcript and kind of chunking it out where we can like revisit it as well here, too. So, basically, we just kind of get that call context and then he starts to kind of link. I back up to the account. We started to kind of build out, you know, conversations here over time. But then going back to the homepage there and switching back over to my user.

That all kind of culminates and here we can say, hey, this call last step was stale right now. Here's context, you know, that's happened in the last couple of weeks on this call, and then actually calling out and using trade to say like, Take this context and then give us a suggested next step for this call. And then the user can decide, okay, I want to go write my own thing here. I can go change it. We also pop in what was already there before.

Or I can use a suggestion, you know, as well. And then go and I just verbatim push that. Super cool. I just can't believe how I still get, can't get over how native it looks in terms of, I mean, cause it is native, I guess, right. Cause it's. It looks like Salesforce. And that's the big thing is kind of like, you know, Salesforce has their own. They're like Salesforce lightning design system.

We can basically lean into like, you know, hey, use these elements when you're designing these things to kind of like effectively make it look like it's a part of a Salesforce. Yeah, components and stuff. It's cool. That was like kind of the first, this is our first, well, we actually could kind of build some cool stuff here.

We've got some more ideas there as well. So then like taking kind of a pivot, you know, we went into like, how do we, you know, we worked on buying groups, that kind of thing. And our old version was basically like. Salesforce related list, this kind of a clunky using flows to kind of like orchestrate the experience. But then we're able to actually apply these same kind of principles and then build out our own buying group kind of like UI piece.

Basically, it's able to kind of like, you know, pull in the members of the buying group, you mean to look on the back end, you know, you just see effectively like this is a custom object, right? Like with people in it, it's not really that exciting at the end of the day, but we can use those features to kind of like then transpose that back out to like a more usable UI. That makes sense.

Pull things in like, you know, what marketing experiences like have they been a part of, you know, what are the emails, the calls, that kind of thing. So someone can easily get a good idea of like, What's going on here with this person there on that front. So kind of can get a better visual experience for the buying group from there. So this is also, I guess you use the word vibe coded, like you kind of vibe coded this out too as well. And we're now starting to understand, you can even look at things like coverage,

How do we kind of build out these from there? What a natural next step to be more AI-driven enrichment on the buying group. Like, this is person warm. This is someone I should reach out to. Here's how I should reach out to them. All the stuff we tried to do when we did the...

I think maybe that's a certain degree we could go down on that and also just finding ways to like some of the things that we're doing you know in slack today to kind of maybe even bring that like To this viewer, it's like a more of a homepage. You know, Jeremy's not finished yet, so he might... I'll blow your mind a little bit with this too, Jeremy. Oh, there we go. Let's see what happens.

We'll see, we'll see. This might be totally out of base, but even something like this. Let me pull it out that shows. Give me one sec. Let's see.

I'll find it and show it here in a second, but basically a way to like, you know, show, um, give me, we're getting there, but even a way to kind of like centralize.

Let me get to where I'm supposed to be.

But like, you know.

This is also built by Cloud Code. Basically to kind of like say I'm on my account, you know, like today it looks a lot like this a lot of feels like going on. But then more of a way to kind of like pull in some of these components and then like have a way like you know yeah like meeting prep.

Or like ROI analysis or exact ways to kind of maybe call out to attention to actually build these artifacts out and then return them back. Attention can basically be the execution layer powering a lot of these actions. In very smart ways too. I love this. The way we usually, again, we're an insights layer, we're an execution layer, and depending on whether you want to use this, we're also a UI. Sounds like you guys want the UI to live in Salesforce, but the other piece is, we can absolutely feed to you guys.

Exactly. Awesome. I think it's, you know, this is really cool, Chris. This is so close to what I'm thinking. Yeah, this is kind of what I think we can talk through at CKR next week. Like, wow, this is very cool. Do you guys want help on like, I mean, not help, I mean, you guys are obviously crushing it, but like, is there any interest in like us helping with like the Salesforce managed package part or is that the part that you guys want to own and we're more like the API of the context layer and the orchestration?

I think at this stage, probably the context layer, I think that we're still trying to figure out how to kind of get all this orchestrated in the right way, but a way to kind of like these kick off effectively like. Or an MCP call or something like that that says, like, here, take this context. And then, you know, this might, it's not instantaneous. It would take some time, but finding ways to kind of like.

In my mind, it's like I draft a meeting prep. If I come back to this page, and you have a new meeting prep kind of thing ready to review, we can find ways to get notifications about coming involved also. Basically, this way is to initialize these different opportunities. That's pretty cool because what that also means is, there's a constraint on our end.

To structure our API endpoints in such a way that they're digestible this way, right? Like you basically should be able to send an action or a request with a bunch of context to attention. And we should be able to like... I'll execute the action, but also give you a summary of the metadata around that action and everything in a way that's consumable by Salesforce, right? Because in my mind, too, it's like, these need to probably eventually be some kind of custom object in Salesforce to store these artifacts, store this stuff now.

And then that also, once we start doing that, that creates, that gives us more context like, hey, if I want another meeting prep, let me look at the last one I did, and kind of can start to kind of like, you know, be kind of this building blocks piece there too.

So if we can just expose an API for each of these actions, where it's like essentially create new meeting prep, check history of past meeting preps. I mean, really, exactly. We have all these different agents and things that we're using that are more like templatized. And you can have an open text agent or whatever, and you can ask it anything.

But when we have these ones where it's more declarative, like having that API, I think, would be huge in terms of, hey, we want this type of output. And we're starting to see, you know, Zach will summarize these things here. So it's like. Structuring this in a way that we can pop this back into somewhere from there, you know, I mean, I don't know, but I'm just finding ways to kind of like, bring this experience. I think, you know, I think if they were like, we launched the next steps thing, you know, this piece of it here.

Like we're now seeing AP guy calls on this happen all the time because people are doing you're using it every morning to kind of get themselves kind of like used to our sales leader would like say, hey, you know, you've got two deals they know next steps rotated on now we're like we're not seeing that call happen anymore.

I would love to keep design partnering with you guys on this, right? There's twofold. That's why I want to do this with you is because I think I think this is where hopefully people are going to be going directionally, and I think there's an opportunity for attention to capitalize on it. Because even like, you know, we can see this summary here, like say we have an always-on kind of summary that we're generating that like...

That's similar to what they ask in the Bridge Helper. We can surface that right at the top and be like, here's this summary of what's happening here. And then I have actions I can go take action on and things like that from here too. This is an awesome forcing function for us, because right now, we kind of have built everything mostly under the conception that people will be in attention or they'll be in Slack, right?

Thinking about Salesforce as being the shell or the UI, and then we need to expose clean APIs for that to work, makes us think about how to structure this in a smart way. So I think there's an awesome effort. Yeah, I think, I mean, just finding some ways to like, and again, I think it's on us to like say, hey, here's like, here's what we want from attention. Here's the structure. We can like agree on a firm structure of that. We get the same feedback.

Here's what we need from an API perspective, but also here's the problem we're trying to solve. Like, here's what we're actually trying to show people. Things that come to mind for me, too, is like when you were showing that thing, Chris, is like there could also be some type of a component that.

bridge helper or whatever attention that is almost like a little chat bot that you pop open and you can like chat with it as well, which Matias probably already has examples of that. But it's nice to have that be in record as well. It's a balance of like, let's give some predefined actions. And then it's like, hey, just ask me anything you want about this. You know, similar to how...

I think about Ask a Bridge. It's very similar to that. And that's like where MCP could come into play for that experience where it's like we could use MCP at that level to like power that chat experience and then they call out to attention. Yeah, really cool. Yeah, really cool. If you get it. Yeah, I mean, okay, so a lot to think about. Yeah, if we, if we get the, the more we can get the full scope of like API endpoints and things we want to do. Yeah, the better it helps the better it helps us think about like the

Should it be MCP? Should it be just a bunch of API endpoints? Because the kind of idea that we have is like you either go to the... We're trying to, and Chris and I had talked about this, we're trying to, in building blocks, earn the right to tackle larger things.

We started with the next steps, now we're moving to buying groups. But we had to get a lot of these like handle activities, handle on all the call attention data, emails, etc. And then now account like the actual record pages, redesigning those. And then

Our kind of like end goal is to redesign the entire home experience for Salesforce and then tackle forecasting as well. Super cool. One thing to keep in mind, I mean, we're building a forecasting module, may or may not be relevant to you guys. Some of the AI predictive stuff could be interesting maybe. When it comes to, sorry, I have a bit of a bronchitis. Oh, no.

But when it comes to how we're structuring it, like we have the agent builder where you can build, you know, agents that run on a cadence and do things. We're thinking of splitting it out where if, if it's something more ad hoc that you're triggering.

Instead of it being like the agent, we're thinking of taking Claude Code's skill model, where basically you can define different skills, like a skill to send an email, or an account brief, or whatever. And the thinking would be like... The things that those discrete actions could maybe be framed as skills. And that way, like you'd be able to, that way you'd be able to trigger that by clicking on it in Salesforce. And you could also call that skill if you would like.

If you tag the abridged helper attention in Slack. You can do those both through Slack and through Salesforce through the scale framework. I think that's spot on. That also helps you codify what you're trying to achieve. That's how we're thinking about it. There's a room for agents which do a whole bunch of stuff on a predefined schedule in response to triggers. But the ad hoc stuff is starting to feel a little qualitatively different the more we work through it.

I agree, and that's the thing too. We don't know if we're always focusing on trying to like use scheduled things that that kind of gets where that gets stale pretty fast because you don't really know that's going to run or when they're going to see it.

You know, when they want to, we kind of leverage like skills. I agree. That's a smart approach. And so maybe the way it would be like the API is like slash super agent or whatever the heck we're calling it on attention side, right. Skill skill. And then it's the name of the skill with like the relevant method.

And I like the skill. So a skill in this case would be like meeting prep doc or something. Exactly. That's a great way to do it. And then in Attention you can like... You can define the skills by like chatting with the super agent, like it can make its own skills. And there will be like a, just like in Claude, there will be like literally a natural language description of what that skill should do.

And that way you can put the format, like this is the account brief format or whatever it is. Yep. Yep. I dig that. Yeah. So that's kind of where we're at. I wanted for you all to see it because I think that there's more opportunity to work together than to work not parallel.

I also think that this is not something that will further differentiate you from the market for this type of stuff too. 100%. I'm surprised that Gong is saying how great they're doing, to be honest. Good for you all at this point, but interesting. What do you mean? I'm curious what part of Gong's sales motion people are finding success. Is it the forecasting stuff people are doing?

The call recording transcription is so commoditized that, like, what are people buying from them? Some people like the Dialer product, I guess. And the fact that it's all one unified platform. We're winning more deals against Gong than we're losing at this point. But if we lose them, it's because of them wanting a unified solution. Nobody ever got fired for buying Gong.

Right, just like the brand bullshit. And then forecasting, which we'd have a module coming out that should kind of wipe the floor with them. Okay, great. Wrapping up on a few things that I think will be very helpful. I would love to get a better understanding of what the Notion style medium recorder experience looks like.

The single bot thing, I just want to understand there's a couple things that we'll need clarity on, which is permissions and settings. So for instance, I'm on a call, Chris is on a call, a few others. My settings right now are that none of my calls appear.

Into the main repository, let's say Chris's was that everyone's appear if we're both joining the call with both of our bots We should inherit the most open whose bot was scheduled to attend, you know what I mean? Because otherwise it'll be overly restrictive. And then we'll have to figure out what our ejector...

Like, who can eject all bots, or pull out the bot in its entirety. So as an example, not going to happen, Chris, but say we're having a conversation and I want to have a performance management conversation with Chris, and theoretically both of our bots join.

I need to have as a ability to revoke the bot and his bot be removed as well. So for the most part, yeah, okay, good point. Interesting, I have to think about that. For the most part, like this should be like a net improvement over our current situation, right? In the sense that right now you have... Totally. I'm just thinking of stuff for you to think through in the future because the...

I don't mean that in a defensive way, I'm trying to think through the implications of what you're saying, right? Like, I think for the most part it's a net improvement, but still have to solve some of what you're describing, which is... Basically, if you have three people before who were slated to join the call, right now it just picks one at random. We offer team priorities, so one version of like...

Sort of circumventing the problem you talk about with the restricted permissions is like prioritizing the more open ones, right? Like Jeremy's bot basically never joined unless he's the only one on the call. That's one way. And then we also have an optional post-call setting where the call gets assigned to the person who spoke the most on the call. That may or may not be interesting. I don't know. In terms of the ability to remove it from the call, right now it's like...

It's whoever the bot belongs to is the one who can remove it, right? So it would have to be, if the AAU bot joins, it's the AAU who has to remove the bot. Yeah, we'll need some more admin settings to be able to do that. Just because someone could not join and then they say we don't want the bot on. If the person's not on the call, which could happen, then there's no way to remove it. So one version of this is just like.

Adding some universal org access where it could be admin or it could just be literally anybody at the company. If you're on a call with a bot, even if it's not your bot, you have the veto right. I think so. I think it's like, if your bot was able to join before we went to this one bot, you should have the privileges to remove the bot type thing. I mean, potentially it could be even broader though, just if you're on the call, right? Because explicitly choosing to kick out the bot is a pretty intentional decision, right?

Someone wouldn't kick out someone else's bot unless there was a reason for it, right? So maybe we can say, here are the live calls. This is Sarah's bot, right? It's not yours. And then the Notion style notetaker, can you show me, I know you only got a few minutes, what that actually looks like?

Unfortunately, I don't actually have it running locally, but basically it's a desktop app. The current version of it is really bare bones. So the homepage just looks like our homepage in Attention. It's like, it's a page, it's a list of upcoming calls, you can choose to add it to a call.

Basically, what happens is if you have desktop recording turned on, your bot stops joining, and instead it picks up any meetings that are happening through Zoom or through your desktop, and records them automatically if you have the settings on. And then it would still go into attention, the recording, and still do the processing as much as it could? Everything else is like...

As if it's through attention, it's just a different source. Okay, and then how are you guys doing diarization and multi-speaker, similar to Notion right now? Yeah, so we're using the SDK or the API of like a This thing called Recall, which handles basically almost all these bot recorders, for diarization, it might be slightly worse than the bot version because

We don't have access to the timeline that we get through the API. Instead, we have to go off what the people are saying and which window is activated in Zoom and stuff. But it's still pretty good. Oh, so you're able to pick up different speakers depending on the tile of the Zoom. Interesting. I believe that's how it's going on under the hood, yeah. Cool.

Yeah, I would love to be able to pilot some of that. Things that I want that are top of mind is how to set more control to the user to allow Note taker to join or just do it all through the desktop app and then we need to set explicit externals if you're still like recording through that you have to let the party know because nothing pops up like notion right it

And how we do that. And then thirdly, ensure we're not cannibalizing, because the bot is probably still superior in terms of knowing who's speaking, what they're doing, versus not. Making sure there's a clear, like, use the bot, what is probably better for most things. Use it, the other one doesn't feel right. So would you want that almost as like a...

It's kind of annoying to have to pick between the two on a per call basis, right? Yeah. It could be like a little button that pops up that gives you the option or something. Yeah, I mean the desktop app is interesting. I like this concept of a desktop app because that's how Notion is popping up right now.

It's like you join and it gives you an option and maybe it's like add bot or add note like you need to figure out how you want what the nomenclature is that you want to use for it. Just like a literally like a thing that pops up on top and it's like use desktop recording you use bot as an option or something.

Something like that. We can work on that. I think that makes the most sense. So my takeaways for this conversation are, Chris, you and I work on like the API stuff. The permissions removing the bot that you mentioned, and look into what we just talked about, like control over desktop or bot join. Cool.

I'll send you some more kind of like concrete stuff as well. So you have more to go off for that. Is there anything else you guys have that's top of mind? Like we can build lots of cool stuff. A lot of this stuff is pretty cool. I think that there's... We'll need to see... Sorry, I feel like I look like Anton Chigurh right now. No country for old men. This is what happens. I've been sick for like two weeks. My son has the flu right now. It's not fun.

So, no, I think some of this stuff will be really cool in figuring out the skill stuff, like getting that ready to go so we can move over. I feel like that should be fairly, at least conceptually, it feels fairly easy. I don't know what the actual will be.

Yeah, I'm excited to redesign this account page because there's a lot of fun stuff we can do. Yeah, I think that's the challenge for us. We can definitely do all the orchestration and routing, but as far as like getting that large corpus of knowledge, I think y'all are doing much better job of that than we could ever do as far as like having that deep, we don't have to build that from the ground up, even though we own it.

And it'll be such a reactive thing to have to go build that. So finding ways just to build, like, easily. I think skills is definitely the right approach, but a way to kind of, you know, I can even help you, we can even work on those together and build those skills.

But like. Which while the actual account view might not be relevant to you guys, because again, you're building this in Salesforce, the AI that takes every new incoming signal and updates the current status of the account sounds very relevant, right? Yes. Like the recency thing and like putting that all through an LLM with like the recency and account.

And we can show you, Chris is building that out, a version of that for the buying group to look at like the three different things. And there's a breadth, depth, and. Recency. The other stuff that comes to mind too is like having a the way that I always visualize when we talk about this like now the one bot gives you that visual of this being this audio pipeline.

that you can then start to do really interesting transformations with. And like, some of the things that come to mind is like, how do you start to peel off these insights and route them in interesting places to things like the buying group or whatever?

It's like, hey, this person said this, like... Weird thing is quote or something you started should be doing this like thing about stuff which could be cool um We're trying you guys have that Like you guys have an internal ontology right a way of thinking about the world, right? Buying group is a very important piece of that ontology, you know products is probably another piece, you know account plans, whatever.

Yeah Ideally, every touchpoint, we should be able to extract and route little nuggets of information to each of those entities related to that touchpoint. Totally. That's kind of the hope and dreams.

I just lost it.

We're talking about... Sorry. No, no, we're talking about the audio pipeline routing into places...

Oh, fuck. I don't know what it was. But yeah, I think there's a lot of opportunity to... to build some of that intelligence out.

Super cool work, guys. This is really exciting. Thanks. It's been a huge unlock just to see how far we can push it and kind of like have that like cliff of like, this may not work, but it might. And so far, it's like proved to be pretty awesome. We're still trying to figure out kind of how this all works at scale. Right now it's a lot of like, you know, need. I think it's like just to make sure y'all the piece. Oh, I remember what we're talking about. The only other concept that we were talking about is we're building out this framework, which is similar to the ontology that you just mentioned, which is like key moments, like which has like.

You have the attention of whoever understands our playbook. It can register it, which you already do right now because you have the call types. It basically places our execution along a timeline. But then also in places these other like rotted events or key moments, hey a competitor got mentioned here, or hey we mentioned that this champion's leaving, and do a really interesting view on like what's actually happening on the things that you care about.

That's what we're trying to do. It's almost like a timeline, which we kind of described before, right? You mentioned this before with the agents, right? Agents that are pre-call, post-call. Doing everything on a temporal axis with certain important things standing out.

Yeah and the kind of where I'm thinking is like this is nice because it's basically and a lot of other companies like try to play their like game side or now plant hat or others but the challenge is that it's like

Not necessarily reflective of the entire thing, and you need to have something that adjusts all of that into something that basically cements the... I don't know. There's a lot of overlap between a bridge working with the patient, but an account being the patient, and tracking the labs, and everything else about the account, the patient, in a way that makes sense to be able to ingest.

That's what I was thinking about. Alright, we're over time and. Yeah, it's great. Thank you. I'm going to set up a team with you. Thank you so much for taking the time. Hope you hope your family member feels better. Yeah. Do you have a few minutes just to chat through a few other things? Now I want to talk about the account page.

Yeah, that account page is really sick. Do you want any feedback on it really quick? Yeah, tell me what you think so far. This is literally not much here. I just kind of like take a look. I love a lot of it. The what do you want to do thing is fucking awesome.

Love that entire thing. I love this like summary at the top and how he wanted to like that like bar right the summary that and the one above it I think is really slick too or it's like what are the core details that we want to add. And just as a way, I just love this view. Customer health, all of that, I think is great. I love the buying group. I love the key moments. I love the new next steps. I love the open opportunities.

I almost want thinking through if we make it easier it's like open opportunities and there's like a direct link maybe at the top somewhere to the renewal or something that we like make it easier to see what's going on. I don't know. And I think too like I was thinking this morning like there's still gonna have to be a way to kind of like think about things like

Related list and like some of these key Salesforce kind of components, you know, yeah How do we want that? We still represent those and fields like, you know, you can't like totally is there still that piece? There's totally fields on the and maybe that's just like another tap.

There's a tab element It's like or I mean you have so much of it fed in where you don't really need it But it's easier for us to like It's a big paradigm shift from what they're used to as well. Because you would have more real estate too, so you can toggle back. Other objects that will probably be important to have on here would be similar, like the implantation object. Account plans, another good one to weave in. Maybe that's a link to the top or something.

Maybe in that ARR white bar where it's like 425, maybe there's a couple hot links to the right hand side of that below. Like all the way to shift right where it's like open renewal or... Go to the account plan. Or maybe even the account summary is like the account plan is right below it or something.

Go to the existing, I love that account summary thing too. Yeah, absolutely, we can definitely like that's something you definitely could do with attention. Yeah, that's really, this looks really cool. Very, very cool. The challenge around the tension, I mean, this is my read, I have not touched them in a while, but like, you know, just the, like, latency, making sure, some things will be quick, some things will be slow, how we kind of... Yeah, and I asked, I don't know if you've asked a lot of reps, but they were like, well, if it's not instant, it doesn't really matter.

Meaning that, like... Yeah. If it's instant, great. If it's not, like, one or two minutes later, it doesn't really matter, so long as we're alerting them to the things. And it's a good daily job, too, that we just, like, run a summary once a day, you know, like, at night or something like that.

Totally, yeah, yeah. Run it, or based on certain triggers that happen, a new call or something else that happens could be very helpful. The other thing on what do you want to do with the account thing, this is other things where we can start to weave in the stuff that Zach and Ramon and things are doing, which is like get new solution design or that this whole like

The request process, I think, could be really sweet as well. Totally. I love the key moments thing. This is what I'm thinking we would show at CKO is this kind of stuff. What's your... To me, getting ideas out there just to get some hype going. We got this concept, can we actually show it in sandbox? Like, yeah, this is a live version that we're working on, or like an actual real ca- I don't know how far we can take it, or how quick- like, far we can go.

All we can do is try. See how far we can get. To me it would be really cool to be like, you know, even the show is like, hey we've got and maybe this is the example of this could be the thing that we would want to show at the main stage. It would be like this kind of concept.

It's like, hey we started tackling the kind of stories, we tackled these components and now we're tackling this. Here is now the vision. You show this slide and then you show now here it is in production. We did this in two weeks or whatever. Do you think you could actually get something like this into a sandbox production?

Sandbox I can give my best shot for sure I don't mean I've I've asked a lot of questions like is this as possible and you know cloud code seems to think so so I think it's worth it. Let's take a swing because I think this is very compelling. That's kind of the story of this tier 2. We can figure out the right way to reframe all this. Just showing some of these principles and that kind of thing. I definitely think you start with that really quickly.

Yeah, but then it kind of shows like, you know, we got his buying groups, things in production, we can figure out if we want to show we can show the actual, you know, yeah, the actual one probably. We have the next steps piece, you know, and then also kind of shows those things. And then like talking about the vision of kind of how we're trying to achieve that, you know, from there and showing that and then also like showing.

You just gotta give everyone a little love on those things. And then I think that's the last slide right now. I think if we do that... Yes, I think that's awesome. And then the only thing we could do is we could figure out an easy way for, remember we talked about like for the PSDs to deliver an easy way to update all of the, to me that's like a very easy component that we could deliver and you could also present on the next session.

It's like here's some other. Here's some small wins that we'll have as well. Motivational type thing. Then the next day is more, I'm gonna call it tactical on things I can do. That's part of the marketing and RevOps vision Apple thing. Are you also involved in the main stage or is that just me and Brad? It'll be you and Brad.

I'm not gonna be on there. Okay, got it. So that's more just like how we've gotten to this point with like how we're AI-pilling at that point. Correct. Okay, and then the one on Wednesday is here is like more practically and technically what we're doing. Yeah, here's stuff that's actually coming that you could...

And then I've got my other foundation's like long session that's more than that. We're actually more like almost like AI 101 for the commercial. And so it's not as much of this as more like. Genitive versus agentic. Some of this yeah, and also like how to get better at prompting. What do you exactly do today to kind of get better at this stuff? So more just like leveling the playing field for them to kind of say, this stuff looks really is pretty accessible.

Yeah. How do you get started? And it kind of all like I think I like the idea of like you all having a common thread through it, which is like, you know, it's not. It's not all a disparate information. It's all kind of connected. I wonder if there is a way for a co-build, like you build one as a team, where it's like, hey, let's pick something we want to start to play with.

I don't know. It's too hard. We've got to fill some time. I think it would be interesting to do that. Trying to do a live concept could be really fun. Absolutely. I need to have side decks for both mainstage things, right? Let me confirm. The mainstage one might just be more verbal with more demo-y type stuff.

Then which could be the slides that you have, but yeah, let me confirm. Okay. That's not, I'm just trying to make sure I have all that stuff put together. I'm going to confirm today and I'll get you, I'll let you know. It'd be minimal slide where more depth speaking and demo.

That's main stage, and then the next stage, more slides probably for them, or both less slides, I guess. Both less slides. I don't think people like slides. I would love to just do more of this type of stuff. Correct. That is where we're going. Okay, perfect. All right, man. All right, I'll catch you in a bit. Thank you.
