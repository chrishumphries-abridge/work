# PlanHat Integration Planning Sync

**Raw transcript**

Hey Chris. Hey, how's it going?

Hey. Every time. How you doing? Good. How are you? Good. We haven't talked in quite a while. It's good to see you again. Congrats on the baby too. I know you guys had a baby recently. How's it been? Yeah. Baby girl. She's six months as of this weekend.

That's awesome. We have a great childhood family friend whose name is Frankie. So it's good. That's a great name for sure. Thank you, yeah, yeah. She's definitely, we weren't sure if she's Frances, we weren't sure if she's gonna go by Franny, Francie, Frankie, but she's like a total Frank, to be honest, like you call her Frank.

Our dog's name is Frank actually, so we have a Frank dog and then Frankie friend, so lots of Franks in our life. Love a good Frank. Oh yeah, oh yeah. But yeah, good to see you. I haven't seen you until yesterday. Yeah, absolutely. We'll sign up the...

Get together next week too, it's going to be fun. Oh yeah. I can't believe it. I know it's going to be wild to see everybody out there. I know. I know. I feel like there's so many people at a bridge that I've never seen in real life. Like, I've seen the Partner Experience Team pretty frequently, but like...

Yeah. Chris, the Rev Ops team, the Data Science team, Ainsley I work with constantly, but I've never met in real life. Yeah, it's going to be pretty awesome. For sure. Well, Chris, we, Madeline and I, had a really productive time together a couple of days last week with the Plan Hat team one afternoon for their AI workshop.

Which was really inspiring and had us like it gave us a lot of focus on what we want to roll out for our MVP pilot here and then we spent the next morning mapping it out and that's what we came up with that document I walked the team through yesterday.

We are trying to move super fast here. We have a goal to launch our pilot in March. My goal for this meeting is one, to make sure we're doing a mapping of what is the key data sets needed and dependencies needed to enable these workloads, knowing that

We might continue to, well, we'll expect to continue to build, you know, beyond that. Right. And make sure that you have a good understanding of what we're trying to accomplish with the data and that we're listening and thinking about it in the right way.

And then just thinking through timelines and what your take is on how quickly we can move on getting the integration set now that we've kind of got a better refined scope. And I do think we'll want to make sure Zach's out this week. We'll make sure we rope him in also in this too.

He's kind of been... I think it's just like previewing. There are a few things I feel like we were personally like I'll just use an example. I was having a hard time like splitting the account plan from just like basic account details that are critical and like as we are moving forward and thinking about how

Our team is going to be using this information. Actually, the account plan isn't critical for our MVP, at least. And it's working really well how it is today. So we came out of that meeting, I think, thinking about things a little bit differently. I expect it'll be a shift for how we're thinking about it, too.

Well, I think from my point of view there, you know, the account planning, I think, you know, there's API limitations with plan hat that we're going to have to basically go build a custom integration for that. So we've not done that at all yet. I think we're waiting to scope that.

Sounds like we may not need that. Right now based on what you're saying is that right like that potentially we we may still want but I think we want to get a better understanding of some of like through the pilot workloads that we have like. I think we believe that, you know, the account management exist today is like a point in time strategy document, but what our team needs is like tools and a way to like manage their account on a day-to-day basis.

That's what we're going to prioritize. But I think that there's a future workflow topic, workshop for a plan. I mean, I think as far as that basic Salesforce mapping, like mapping, you know, just the count fields to the, that's fine. Like I really hope you can get all that, you know, in place.

I think the big blockers we had hit were account plan and then buying groups, which I think I'm meeting with. Please see review n°108.103,10.104 on PissedConsumer.com It's been hard to conceptualize how these things actually like, even if we do it wrong, let's map it anyways and then like undo it if it's bad and kind of thing, you know, I think we've done not so it's been hard to conceptualize how these things even

We'll talk, hit a limitation, and then we'll kind of table it, and it's like, well, I need to make a couple of mistakes here early on to make this make sense. And that makes total sense, and I think anchoring on now, we kind of have more clarity on our end on what we're trying to accomplish.

Hopefully, it really helps make those conversations easier, too. We can drive forward super quickly on some of these base requirements and then continue to workshop the rest. I do have buying groups on our list of things to talk about today. There's just a kind of a way I'm thinking about it that I want to test with you. Yep, sure. Totally, totally. So I guess from the top, like you said, most of these...

So these are, you know, we've categorized them to the kind of workflows that these.

That these data points would enable and where we get them from. And so, like, I didn't really finish this, but, you know, essentially, like, these are mostly things that we get from Salesforce today for the For the MRU attack plan, we're really trying to come up with a way that our team doesn't need to spend time thinking and can spend more time on strategy for how they're moving the deal forward on a week-by-week basis.

That's where we need certain information from Salesforce, I think is just pretty fundamental, like total permissions. I think it's like all of the account details, essentially, like the fundamental about the org. And then one question we had was about the ED opportunity. This is just an example of an expansion opportunity across our teams is the ED.

Do we have anything in Salesforce right now that shows like total ED physicians at your health system? When you say ED, do you mean emergency department or is that? Yeah. Yeah, got it. I think so. Like from definitive or something? Let me check on that.

I can find out and see if we have it on there right now, but I think we have that somewhere. An estimate of ED visits. Okay interesting. Maybe we could do some finagling of that data point. Yeah or even if like we pulled it in. I think we'd have to contextualize it for people to be like, at this point, that means that there's a solid opportunity, but I have no idea what that number would be. Yeah, we do have, of course, a ton of information on...

Like notes, users, encounters, nursing beds, those things. I don't see anything, at least right now, that we have as far as ED, but let me see if there's anything definitive for that as well. Let me see.

No, nothing around ER like physicians. No, but we do have ER visits and that's where I think and that's where Zach or even like Mark Ackerman, our team, I could help be helpful there too as well for pulling that in so we can. I can circle back around to that, for sure. ED visits we have, yes, we have ED visits, for sure. Yeah, the physicians, no, but... Yeah, anything to help, like Mylon, you said, just like contextualize the opportunity, that there is opportunity there, and we can maybe backtrack into exactly how we would measure the targets there.

And then I think just a few things that we're thinking about for, like, this is my my mock-up again, but it's like, You know, we want data that's helpful to manage the MRU tackling. And so some of these things like an upcoming expansion, that feeds right into, you know, your plan for growth. And it's trapped today in a key moment, you know, upcoming expansion.

So we're thinking that probably these items, we might do away with the key moment workflow. Like, you know, in the future, our team will manage that right in Plan Hat, but we definitely want it to feed back into Salesforce. So I don't know if we have to, if that still can exist as a key moment in Salesforce or- Yeah, we can probably map that.

Jeremy's got a lot of thoughts on key moments as well right now that we're trying to kind of dig on top of. So we probably could rip all this into that there. Okay. Yeah. Okay, cool. Yeah, I think we'll change the way we're thinking about that. Yeah, and I think like my idea was that like like PS is doing that in Flam Hat and then like we can pull it into Salesforce for visibility. Yeah, that should be fine.

I can see that. And similarly with like, you know, upcoming EBRs or the last EBR or upcoming on-site. So like Madeline had already teed up maybe some work to start tracking that in Salesforce, but this would be another example where like the team will actually manage that in PlanHat, but anybody would need visibility on the sales team.

And we're capturing, you know, events in Salesforce today too. So anytime something's on someone's calendar who's a Salesforce user, we create a record of that. Salesforce. And so if they book, like, you know, I'm going to this hospital on this day and that's already on the calendar, we'll pull that in as an event record already. We can definitely rope that into a key moment in any way from there too.

Okay, interesting. Yeah, maybe we should, that might need some thought on the best way, just to make sure we're capturing the workflow is the easiest for the team. That's interesting. I didn't really realize that. Yeah, so anything that's coming through via email that, you know, if we have a user in Salesforce and a contact in Salesforce, like that's kind of the bridge to customer kind of pipeline.

Anything like that, we capture those email records and we capture those calendar records too. And then if they're doing any calls and attention, we're also capturing every record of that call as well too. So we're really creating... A pretty good kind of triangulation around what's happening with the account across the board. So maybe there's also this expectation then that if I'm understanding the opportunity maybe here is like.

If you are scheduling an onsite with your project team contact us in Salesforce, it could potentially automatically feed into PlanHat because it will create in Salesforce and then feed into PlanHat. Yeah, we will make sure we get the mapping right with PlanHat.

But yes, I don't know if PlanHat I know they do email. I'm not sure if they do calendar stuff or not as well. I'm not totally sure there.

I think we do. Okay. So, from one way or another, we'll have it. We can get it. For sure. Okay. Maybe not in V1, but we can continue to optimize within these, too. Yep. Chris, that functionality exists today, or that's like, okay. Yeah, so we turned that on back in the fall of last year, so we kind of did a backfill everything.

We use a tool called Weflow that syncs those over. I don't know how far in advance they go as far as events. We can find that out and see how far. But I know that it does map in calendar events once they're on Google Calendar.

Interesting, yeah. Cool. And then, you know, when we're thinking about account details, I asked for the export of all account information. That wasn't like for us to do a one-by-one, but we were trying to be like, Madeline and I, based off of like recall and what we think is most important, just made this list of like, these are really important to manage, but we were thinking about doing an exercise or just kind of scanning to see what else we'd want to surface.

Yeah. And then can I just add something to that too? I think like I think what we're trying to do Chris too is like Everything from Salesforce and like only bring in, you know, the the relevant info. So like, you know, we're not You know, not getting people overwhelmed, but I agree. I definitely agree on that. Reduce the noise, make sure like anything we're bringing in is like serving a purpose is actionable for our team. And then like Salesforce is always referenceable for our team, right?

So like for other details that might be, and we'll get feedback from our team on if they're like, we're continuing to have to go to Salesforce for this one item, like then we'll bring it in. Right, for sure. Absolutely. I know that Erin's done some kind of preliminary mapping as well and based on the certain kind of foundational things. So we may want to undo that if y'all don't want that there, but we can check and see if those things are, you know, she's done a little bit of mapping.

Okay. I think that mapping is like partner success rep and those sort of things. Okay. Cool. I don't think that any of that will have to be undone. Let me understand too. Is Aaron still part of our team or is it all Rob or Peter from now? Is Aaron still on our side as well or is she moving off?

I think she's still, yeah, we have a meeting with Aaron every week and then also a meeting with Peter has fallen off but Yeah, that's my idea. Aaron is still like our data integration contact, and Rob is like workflow and design, or not Rob, Peter is the workflow and design contact.

Cool, okay, great. Okay, so then when we're thinking about account details, that brings us to stakeholders, buying groups, contacts, I think, so. Because this is what I want your take on, and this is my thought on how we move forward. And then we'll have your feedback. So like the work that we've done with the buying groups is super helpful to help tee up kind of and bring attention to where there's risks or like where we don't have the right kind of coverage.

And essentially, we want the same kind of detail in Plant Hat, too. But for the sake of moving forward quickly and giving our team just the information that they need, my thought was the buying groups, my assumption is, all maps down to the contact level.

with certain information that's mapped to about that contact engagement and so when I'm thinking about okay like V1 here and what's most useful for our team and managing like We would still maybe want to use similar arrangements, but it might just look a little different. For example, we want to know that we have stakeholders and that we have engagement, but maybe we have a report that just shows like...

These are members from your buying group that are not engaged. So maybe it just looks a little differently in my hat. Yeah. Because that's my take. If we just boil it down to the nuts and bolts of the information on the contact, I think we could accomplish something very similar for a V1.

Yeah, all the buying group is is basically a dedicated object to basically say, out of a sea of contacts on an account. Who are the ones that, you know, how are we mapping the ones that we think are the most, like, mapped back to these key roles, you know, I mean, that's really all that it is, is basically a special container for that, that, you know, of course, we're doing a lot to

But I think that at the end of the day, it's basically just kind of a enhanced contact kind of collection method right now. You know, if that makes sense. What I don't know, the answer right now, and I think that's what we'll answer on Thursday, is how we can conceptualize that in...

I think that's what I want to work with Aaron on, on Thursday. I think I'll have a better idea of what that really means once we meet Thursday. Because we couldn't drill down to a good answer on that quite yet. Okay. Yeah, I think like, if we just share like, we, you know, from our

And clinical stakeholders that we need engagement from, and we need to know when there isn't engagement. So if we can just even have a surefire way to know within the contact level, like, one, who are those people that are important and need to be involved?

And then tracking. their level of engagement. How can we best to show that? Yeah, right. And I'm assuming too, I mean, like, you know, Plan Hat has some level of engagement tracking built in. So if we can just at least notate this contact is in a buying group on this account, that may be enough.

You know, the kind of like from there, so it may be. Yeah, for sure. We can make it a little different on that. Yeah. And so then, are we going to bring in, are we bringing, is the plan to bring in all contacts?

I don't, I'm not sure how we've decided there. I would, I don't, yeah, I don't know. Michelle, I don't know, like, we have so many different types of contacts, like, I think I was, like, just pulling the... salesforce contacts for kaiser for katie and it's like 200 um Yeah, it's scary, but it also makes sense. I guess yeah, right because we also want like

And we want the NPS. Totally. Yeah, exactly. That's why I'm like, should we look at the communication? It is the best way to say yes or no. Zach and Aaron mapped the comms topics into Plan Hat on Friday. But I don't know how that... Maybe we take this as like during the pilot, we, I don't know, maybe we do map everything in.

Yeah, I mean, like Kaiser is the outlier, obviously. Most don't have hundreds, but yeah. I mean, in my past org, we had a million contacts in our Salesforce org, so we're doing a lot better here than we were there. Oh, my goodness. Okay, I think we bring them in and we can start to maybe even get feedback from our pilots or just, you know, as we roll this out like

I'm envisioning like there might be better. First off, we all know I think this is part of why you updated the buy and grow pieces. Like it's pretty gnarly too. It's like very cumbersome to update contact information in Salesforce. So Maybe this too, like, we focus on how are we, like, visually, like, teeing up important contact information, whatever that is, and making it.

Sure. Easy to update for whatever those workloads are. I think that's like we can do a little bit more. And on the contact, so looking at the MRUs, like if we're going to try to, I don't know if we're going to try to link MRUs, you know, to like the actual contact or user.

If we try to make that be like, if we're looking at a contact who's also a user of a bridge, I don't know if we're doing that or not. Oh, interesting. That's very interesting. But also, we don't have all of our users and selves for us today. We have a lot of our teams around that we don't have our... Right, now this allows us to do some of that linking if your key clinical champion is...

Well, maybe this is just like a preview too. So, like, stakeholder engagement as we set up an automated... Yeah, we will do some factoring of like, basically, you know, a summary of the buying group where there's like flows into our kind of like user contact base and plan hat will have a mix of Salesforce but also big was ever in Sigma big with

So there'll be a mix. That will always be one-to-one as far as what's in Salesforce versus what's there also. Great.

That kind of covers, I think, just like where we're hoping to run at for our MVP. Chris, any other questions, basically? No, what's timeline on this is trying to understand how we can, you know, I think it's important that we do. Make sure Zach's involved and also make sure we kind of keep on working through Aaron on this. But what is kind of what's y'all's timeline? So a whole of our working critical path, like now that we've kind of aligned on workflows and the dependencies, that puts us like midweek.

We, you know, you've got all your questions answered and feeling like clear on, you know, majority of like the dependencies. This is my question to you. It's like, we want, we would love to back into our second launching our pilot. That means, you know, building and testing the final week of February and build really fast. That looks fine to me. Yeah, I don't see a problem with this. Love it.

That's great to hear. Okay. I don't think the work on our end is like incredibly heavy at this point from a Salesforce point of view. As far as how I'm seeing this. Especially with some of maybe these like... The account plan getting dropped off is good. I don't know if we're going to hand do it if attention is a part of this or not because we've got to figure that out too. I was literally just about to say, I think the attention piece would obviously be really great.

I think there was probably some...

More complicated discussions around bringing. I think my goal for the call with Aaron on Thursday is so I can understand like I've not spent a ton of time playing HAT yet doing anything. And so I want to make sure I, with her, once I understand some of the kind of mechanics there, I think I'll have a better understanding how to technically move quicker on that too.

It's been a lot of like watching her do stuff, yeah, so far, so I want to make sure I can get my, yeah, we can we can drive faster if we know what we're doing there too. That sounds great. Yeah, but this seems fine. I mean, Zach may have other thoughts, but I don't see a problem with this.

Perfect. Yeah, right. Like there might be some questions about certain specifics, but I think generally feel like we've got the plan. And then I know yesterday on the call, we talked about, like, potentially some time to get together with their teams if we needed to just power through build, I think.

We know we can get a lot done in that time. So potentially, if possible, would you be able to make a potential trip to Chicago? We're thinking it would be Chicago. Which week? The week after the, I'll say, so the week of potentially. Transparently, next week is the second week in a row I've been away from my family. So I'm trying to be mindful of that going forward. Understood. But that being said, let me know. And it's a short flight for me to get up to Chicago.

So I could even do like a one day come back kind of thing. One day, yeah, yeah, yeah. And if not, you can totally, you know, we could absolutely have you, you know, call in and Zach will be here too. Zach will maybe be here too, so. Just let me know where y'all land date-wise and I'll see what I can make happen.

So I mean, I can probably get there and get back home, you know, pretty easily. So within the day, yeah, we could, we could hopefully plan it that way too. Yeah. Cool. Okay. Feeling. Really energized and like we've got a clear path. This is awesome. The account plan API issue we've been like having a lot of conversation about that so like getting super crisp on.

What's important in this moment and what we like might continue to work. Yeah, I mean, and that's not a big lift either, but I think whatever we can shed right now probably is the right approach just to get it off the ground. Yeah, yeah, yeah, cool, awesome, let's do it. Well, let us know if you have any other questions as you're thinking through it. We're going to meet with Ainsley later today to talk through all of the Sigma kind of key data points from our workflow. So awesome, awesome, great.

And if there's anything I can do to help with the like key account details, I'm happy to, I know in the past. We've said like, you know, the intricacies of Salesforce more than I do. But if there's anything I can do, I'm happy to help with. Yeah, probably my next move will be that, you know, get with Zach once he gets back and see to review this and I'll the call on Thursday will help me a ton as far as just kind of doing this.

So probably once we get through that, I'll know. exactly kind of what this looks like on our end from there. Cool. Awesome, you guys. Thank you. Talk to you later. See you.
