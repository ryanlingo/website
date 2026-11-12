---
title: "Rethinking AI Evaluation Through Human-AI Interaction"
description: "I map seven ways people relate to AI, from a rival to fusion, and ask what each one leads researchers to measure and what it leads them to miss."
created: 2026-11-12
modified: 2026-11-12
status: in progress
confidence: possible
importance: 7
tags: [intelligence/ai, intelligence/human, philosophy]
---

Most people who use AI use the same AI model in very different ways. Someone might ask it a factual question in the morning, take the answer, and close the tab. The same person might spend two hours in the afternoon going back and forth with it on a plan for work, and by the end they couldn’t tell you which parts of the plan were theirs.

The AI model is the same both times, and what changes is how the person relates to it. I’ve been trying to work out how to describe that difference, because I think the way we describe it shapes what we end up studying.

I use the word “model” in two ways in this post, so I’ll separate them now. An AI model is any trained system that takes an input and produces an output. The term covers large and small language models, vision language models, models that make decisions, and similar systems. A model, with no “AI” in front of it, is a simplified description of how something works. In this post it means my description of how people relate to AI.

## What kind of post this is

I’m thinking on paper here. The model is a first version, I expect parts of it to be wrong, and it leaves several questions open.

[[why-many-ai-agents-fail|Yesterday]] I argued that many AI agents fail because teams start building before they can state the problem. I think research on people and AI has a similar weakness, so I’m trying to state the problem before I propose any studies.

## The problem

People who study AI often hold different pictures of what AI is to us. A safety researcher pictures a system with its own goals that might act against people. An economist who measures productivity pictures a tool that makes a worker faster. They both say “AI,” but they’re studying different things, and their findings are hard to compare.

So I have two questions. How should we think about the relation between people and AI? And how does our answer change what we measure and what we miss?

I’m not the first person to ask. Melanie Mitchell wrote in Science in 2024 about the metaphors people use for AI, and readers of her essay take from it that our metaphors shape how we study and regulate these systems. Andy Clark and David Chalmers made a related point in 1998, when they said that treating thinking as something that extends beyond the head changes the methods a scientist uses. Mitchell looks at pictures of what AI is, such as a mind or a library. I want to look at the relation between a person and AI, and then ask what research each relation leads to.

## A first version of the model

![A line of seven positions for how people relate to AI, running from "AI is separate from us" to "AI is part of us", grouped into the separate end (1 rival, 2 vending machine), the middle (3 enhancer, 4 coach, 5 partner), and the far end (6 extended mind, 7 fusion), each with a short description and a source, e.g. Bostrom 2014 for the rival and Clark and Chalmers 1998 for the extended mind](images/rethinking-ai-evaluation-through-human-ai-interaction-1.png)

My model arranges the ways people relate to AI along a line, which the image above shows. At the left end, the AI is fully separate from the person. At the right end, the AI is part of the person. Each point along the line is a different relation between the person and the AI, and I call these points positions.

José Hernández-Orallo and Karina Vold drew a related line in 2019. They observed that people and AI are usually described as separate systems, and they sorted AI use into three kinds. A person can hand a whole task to the AI, or use the AI as a working part of their own thinking, or learn from the AI and then do the task alone. Their line asks where the thinking happens. My line asks how separate the AI is from the person, and it has seven positions.

**The separate end.** The first position is the rival, which is the familiar story about a superintelligence that has its own goals and may not need us. Nick Bostrom’s 2014 book *Superintelligence* is the best-known version. The second position is the vending machine, which I described in [[you-are-not-using-ai-enough|You Are Not Using AI Enough]]. You put in a prompt, take the answer, and move on. The same relation holds for any AI model that takes a request and returns a result. In both positions the AI stands outside the person.

**The middle.** The third position is the enhancer. The AI is still outside you, but its job is to make you better at something. Douglas Engelbart wrote about computers augmenting human intellect in 1962, and Garry Kasparov later introduced a form of chess where each player works with a chess program.

The fourth position is the coach. The AI changes you, and then you do the work without it. For example, a student might use AI to get practice problems and feedback on their answers, and then sit the exam alone. Clark points to something similar in Go, where human players got stronger after playing against AI. Hernández-Orallo and Vold call the same outcome internalization, and they say that here the AI becomes a teacher.

The fifth position is the partner. You and the AI work in a loop where each one responds to the other, and neither of you could have produced the result alone. J.C.R. Licklider described a version of the idea in 1960.

**The far end.** The sixth position is the extended mind, which comes from the 1998 paper by Clark and Chalmers. They describe a man named Otto who has Alzheimer’s disease and writes everything in a notebook that he carries everywhere. They argue that the notebook does for Otto what memory does for other people, so it counts as part of his mind. Clark argued in 2025 that generative AI continues the same pattern, because people have always built thinking systems that include tools.

The seventh position is fusion, where you can no longer find a line between the person and the AI. Ray Kurzweil predicts a literal merger. In his 2024 book he says that tiny devices will connect our brains to AI running in the cloud during the 2030s. Some philosophers make an older claim, which is that tools have always shaped what humans are, so the separate end of my line never existed.

### A second line for who sets the goal

The single line has a problem at the separate end. The rival and the vending machine are both outside the person, but the rival acts on its own and the vending machine waits for you.

So I think the model needs a second line that tracks who sets the goal. Ben Shneiderman made a similar move in 2020, when he proposed a framework with two dimensions that separates the level of automation from the level of human control.

Other writers disagree about whether the two lines are independent. Hernández-Orallo and Vold say that an AI has to lack autonomy to count as an extension of the person, and that an autonomous AI is a collaborator. On their view, autonomy is what separates my partner position from my extended mind position. Guido Cassinadri and Francesco Bianchini argued in 2026 that the 2019 paper got this point wrong. They say an autonomous AI can still be part of someone’s thinking, and that what counts is how tightly the AI is integrated with the person. I side with them for now, which is why I keep two lines.

My own earlier work shows the same split. In [[you-are-not-using-ai-enough|You Are Not Using AI Enough]] I described four steps of AI use, which were prompt, context, workflow, and agent. The first three steps bring the AI further into your work. The fourth step lets the AI plan and carry out its own steps, which is a change in who’s in charge.

### A test for telling the positions apart

Imagine taking the AI away, and ask what the person has lost. The test is old. Clark and Chalmers said in 1998 that if you remove the external part, the system gets worse at its task, as it would if you had removed part of the brain. Hernández-Orallo and Vold built the test into their definition of an extender, which is a tool whose benefit is lost when the tool is absent. I think the test gives a different answer at each position.

- At the vending machine, the person loses a convenience.
- At the enhancer, the person works more slowly.
- At the coach, the person loses nothing, because they kept the skill.
- At the extended mind, the person loses part of how they think.

## How the picture shapes the research

Each position tells you what to measure, and it also hides something from you. I haven’t found a map like the one below in other people’s work, so I’m offering it as the main new idea in the post.

![Table of the seven positions showing what a researcher would measure and what they would miss at each one, e.g. at the vending machine you measure whether the answer is accurate and miss what the person does with the answer, and at fusion the answer to both is "I don't know"](images/rethinking-ai-evaluation-through-human-ai-interaction-2.png)

[[why-many-ai-agents-fail|Yesterday’s post]] gives me a way to read the middle column. I argued that you judge information by whether it’s accurate, and you judge knowledge by whether it gets the task done. A benchmark that checks whether answers are accurate is running the information test, and so it assumes the vending machine picture. To run the knowledge test, you need a person with a goal in the study.

I’ve made the same mistake myself. When I gave a talk at Smith College I compared two student teams who designed a wind turbine, and I reported how much more ground the AI team covered. A faculty member asked whether the AI had sped up the students’ learning or only their output. I was using the enhancer picture, and she was asking the coach question.

My guess is that most measurement today sits at the separate end, while most people’s use has moved toward the middle. We also have very few methods for the far end, which is where use seems to be heading.

### Where the model has problems

**Trust.** I tell students to treat every AI answer as a claim that needs checking. Clark and Chalmers list four features that make Otto’s notebook part of his mind. He always uses it, he can reach it easily, he accepts what it says without checking, and he wrote the entries himself after accepting them once already. If I have to check the AI every time, it fails the third feature, and its answers are new to me, so it fails the fourth.

I see two possible answers. Clark says the checking is itself a skill that belongs to the combined system. The other answer is that the part of my mind is the notes and context I’ve built up and own, and the AI model is a rented engine that runs on them. I lean toward the second answer. Clark and Chalmers made a similar split in 1998. They doubted that the internet could be part of someone’s mind, because people don’t trust it by default, but they thought that “certain files on my computer may qualify.”

**Extension isn’t always good for the person.** My removal test assumes that whatever the person loses was a benefit. Cassinadri and Bianchini argue that an AI can be part of someone’s thinking and still make them worse at something. They describe trade-offs, where a tool weakens one skill while it strengthens another. A navigation app can improve how well you find your way and weaken your memory for routes. So a single score for “better” or “worse” will miss what happened.

**The positions may overlap.** Cassinadri and Bianchini also show that one use of one tool can do several jobs at once. A music app can replace your memory of what you’ve heard, support your choice of what to play next, and be required for the whole activity of choosing music online. In my terms, a single use could sit at the vending machine, the enhancer, and the extended mind at the same moment. If they’re right, my seven positions describe parts of a use, and a whole use may contain several of them.

**The coach may sit at an end.** On the 2019 line, learning from the AI and then working alone is an endpoint, opposite to handing the task over. On my line the coach sits in the middle. Coaching moves skill into the person, and the extended mind moves thinking out of the person, so the coach may belong on a branch of its own.

**Other problems.** In [[the-curation-problem|The Curation Problem]] I argued that an AI model can’t reliably tell you what it’s missing, and it would be odd to have a part of your mind that can’t do so. Yesterday I argued that knowledge gets made when a person applies information and checks the result. If the AI is part of the person, I no longer know who “the person” is in that sentence. People also move between positions over time. Cassinadri and Bianchini describe someone who starts by handing all translation to a tool and ends up translating the easy parts alone.

## What I think we should be researching

1. How do we measure a person and an AI working as one system? I rank this question first, because the others depend on it. Hernández-Orallo and Vold asked in 2019 how to tell an extension from a simple tool. Cassinadri and Bianchini offer a list of eleven things to look at, such as how reliable the tool is and how hard it would be to replace. A list is a start, but nobody has turned it into a test.
2. Which skills grow and which shrink when someone uses AI in a given way over time? The trade-off idea says to track several skills and not one score.
3. What moves a person from one position to another, and can the design of a tool influence the move?
4. Who is responsible for the result, and who owns the knowledge, as AI gets closer to us and more able to act on its own?

I’d also like to know whether a system can make knowledge with no person involved. Yesterday I said I doubted it, and the partner and rival positions both assume it can.

## What would change my mind

I’d love to update the model if someone showed me a way of using AI that fits none of the seven positions. I’d do the same if two of the positions turned out to lead to the same research. The overlap problem above may already be a reason to rebuild, and I’d like to hear from anyone who thinks it is.

## Closing thoughts

The overlap problem suggests that no single line will fit every use of AI, because one use can hold several relations at once. If so, I read that as a scoping instruction. The research program is to take one relation at a time, say which relation a study assumes, measure what that relation lets us see, and report what it hides. The field has spent several years measuring AI models. My bet is that the relation between the person and the AI model is now the thing to measure.

## References

Bostrom, N. (2014). *Superintelligence: Paths, Dangers, Strategies.* Oxford University Press.

Cassinadri, G., & Bianchini, F. (2026). Varieties and dynamics of cognitive extensions via AI systems. *Cognitive Systems Research*, 99, 101507.

Clark, A. (2025). Extending minds with generative AI. *Nature Communications*, 16, 4627.

Clark, A., & Chalmers, D. (1998). The extended mind. *Analysis*, 58(1), 7–19.

Engelbart, D. C. (1962). *Augmenting Human Intellect: A Conceptual Framework.* Stanford Research Institute.

Hernández-Orallo, J., & Vold, K. (2019). AI extenders: The ethical and societal implications of humans cognitively extended by AI. *Proceedings of the 2019 AAAI/ACM Conference on AI, Ethics, and Society*, 507–513.

Kurzweil, R. (2024). *The Singularity Is Nearer: When We Merge with AI.* Viking.

Licklider, J. C. R. (1960). Man-computer symbiosis. *IRE Transactions on Human Factors in Electronics*, HFE-1(1), 4–11.

Mitchell, M. (2024). The metaphors of artificial intelligence. *Science*, 386(6723).

Shneiderman, B. (2020). Human-centered artificial intelligence: Reliable, safe & trustworthy. arXiv:2002.04087.

*Originally published on the [99P Labs blog](https://medium.com/99p-labs/rethinking-ai-evaluation-through-human-ai-interaction-c57eb4f8956a) on 2026-11-12.*

## See also

- [[why-many-ai-agents-fail|Why Many AI Agents Fail]]
- [[you-are-not-using-ai-enough|You Are Not Using AI Enough]]
- [[the-curation-problem|The Curation Problem]]
