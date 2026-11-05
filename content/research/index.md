---
title: Research
description: Ryan Lingo's research on forward deployed engineering, synthetic data, context engineering, and evaluation in applied AI.
created: 2026-11-05
modified: 2026-11-05
enableToc: false
---

I do applied AI research at [99P Labs](https://www.99plabs.com/), which is the Ohio office of [Honda Research Institute](https://usa.honda-ri.com/), where I study how to get reliable and useful work out of AI on real problems. Recently, my research has focused on four areas, i.e. forward deployed engineering, synthetic data, context engineering, and evaluation. Each section below says what I mean by the term, and then lists some of my research that's relevant to it.

My philosophy of technology, inspired by John Dewey, guides my research. I see technology as a form of inquiry, i.e. the way people invent and use tools to resolve a problem they've run into. Tools in this sense include machines, and also ideas, methods, and plans. A tool is judged by whether it resolves the situation that called for it, so testing the result and changing course are part of the work. That's why my research starts from a specific problem that people have, treats AI as one tool among others, and checks each result against that problem.

Each of the four areas below plays a part in that approach. Forward deployed engineering is where a project starts, with the problem and the people who have it. Synthetic data and context engineering shape what the AI works with, and evaluation checks whether the result resolves the problem. A full list of my papers is also on [Google Scholar](https://scholar.google.com/citations?user=f3aQo-YAAAAJ&hl=en).

## Forward deployed engineering

The term comes from software companies such as Palantir, where forward deployed engineers work on site with a customer to build what the customer needs. I use it to mean going to where a problem is, mapping it with the people who have it, and designing an AI solution that fits how they work. Applied AI research needs this step, because each problem comes with its own data, workflow, and constraints, so a general model rarely solves it as is.

Mapping is where most of the work happens. I build a model of the problem, by which I mean an abstract representation of a process, e.g. the steps people take, the information they use, the decisions they make, and the places where the work breaks down. The model leaves out detail on purpose, so the team can see where AI might help and where it would get in the way.

From there, we design a small prototype with the people who will use it and test it in their real setting. What we learn usually changes the map, so the work goes around this loop several times before a solution settles. These projects also raise research questions, e.g. how to generate data when the real data is private, or what information an AI system needs to see, and those questions lead to the work in the sections below.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 910 340" role="img" aria-labelledby="fde-loop-title" xmlns="http://www.w3.org/2000/svg">
<title id="fde-loop-title">Forward deployed engineering. You go to the problem, map it, prototype, and test in the real setting, which leads to a solution. Mapping is most of the work and covers the steps, information, decisions, and breakdowns. What you learn in testing reshapes the map, and it also raises research questions, e.g. about private data and what AI sees.</title>
<defs><marker id="fde-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#fde-arrow)">
<line x1="192" y1="131" x2="272" y2="131"/>
<line x1="340" y1="131" x2="426" y2="131"/>
<line x1="545" y1="131" x2="579" y2="131"/>
<line x1="732" y1="131" x2="789" y2="131" stroke-dasharray="4 4"/>
<path d="M653 150 C600 255, 380 255, 313 156"/>
</g>
<g fill="none" style="stroke: var(--gray)" stroke-width="1" stroke-dasharray="2 3">
<line style="stroke: var(--gray)" x1="303" y1="77" x2="303" y2="104"/>
<line style="stroke: var(--gray)" x1="567" y1="216" x2="680" y2="290"/>
</g>
<g fill="currentColor" font-size="18" text-anchor="middle">
<text x="100" y="137">Go to the problem</text>
<text x="303" y="137">Map</text>
<text x="486" y="137">Prototype</text>
<text x="653" y="137">Test in setting</text>
<text x="835" y="137">Solution</text>
</g>
<g style="fill: var(--gray)" font-size="15">
<text style="fill: var(--gray)" x="303" y="30" text-anchor="middle" font-style="italic">most of the work</text>
<text style="fill: var(--gray)" x="303" y="58" text-anchor="middle">steps, information, decisions, breakdowns</text>
<text style="fill: var(--gray)" x="429" y="262" text-anchor="middle" font-style="italic">learning reshapes the map</text>
<text style="fill: var(--gray)" x="690" y="300">Research questions</text>
<text style="fill: var(--gray)" x="690" y="324" font-style="italic">private data, what AI sees</text>
</g>
</svg>
</figure>

## Synthetic data

By synthetic data, I mean data that a model generates to stand in for real data, when real data is private, scarce, or hard to control. In my research, synthetic data is often an early step in a project, because a team needs examples to build and test a system before it has enough real ones. The hard part is making data that is varied and realistic enough to be useful.

Language models, and vision-language models that work with both images and text, make synthetic data cheap to produce, but they tend to repeat themselves. If you ask a model for examples many times, it keeps returning the most likely ones, so the data clusters around a few obvious cases and misses the unusual ones that a system most needs to handle. Much of my work on synthetic data is about getting past that problem, e.g. by keeping track of what the model has already produced and steering it toward cases it hasn't covered yet.

Synthetic data also has to be checked like any other data. I look at whether it covers the range of cases the system will face, whether it fits the task, and whether each example makes sense on its own. Synthetic data can't fully replace real data, but it lets a team start building and testing sooner. It can also fill gaps that real data rarely covers, e.g. rare events, or cases that would be unsafe or impractical to record.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 912 335" role="img" aria-labelledby="synth-title" xmlns="http://www.w3.org/2000/svg">
<title id="synth-title">Synthetic data. Real data is often private, scarce, or hard to control, so a model generates synthetic data that stands in for it, and the team uses that data to build and test a system. The hard part is making the data varied and realistic enough to be useful. Synthetic data matters most early in a project, until there is enough real data.</title>
<defs><marker id="synth-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker>
<marker id="synth-arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" style="stroke: var(--gray)" stroke-width="1.2"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#synth-arrow)">
<line x1="292" y1="132" x2="376" y2="132"/>
<line x1="537" y1="132" x2="617" y2="132"/>
<path d="M441 109 C390 30, 170 30, 87 107" stroke-dasharray="4 4"/>
</g>
<g fill="none" stroke-width="1">
<line style="stroke: var(--gray)" x1="456" y1="153" x2="456" y2="184" stroke-dasharray="2 3"/>
<line style="stroke: var(--gray)" x1="256" y1="290" x2="884" y2="290" marker-end="url(#synth-arrow-gray)"/>
<line style="stroke: var(--gray)" x1="256" y1="284" x2="256" y2="296"/>
</g>
<g fill="currentColor" font-size="18">
<text x="25" y="138">Real data</text>
<text x="227" y="138">Model</text>
<text x="456" y="138" text-anchor="middle">Synthetic data</text>
<text x="635" y="138">Build and test system</text>
</g>
<g font-size="15">
<text style="fill: var(--gray)" x="25" y="166" font-style="italic">private, scarce,</text>
<text style="fill: var(--gray)" x="25" y="189" font-style="italic">or hard to control</text>
<text style="fill: var(--gray)" x="264" y="32" text-anchor="middle" font-style="italic">stands in for</text>
<text style="fill: var(--gray)" x="456" y="205" text-anchor="middle" font-style="italic">the hard part</text>
<text style="fill: var(--gray)" x="456" y="231" text-anchor="middle">varied and realistic enough to be useful</text>
<text style="fill: var(--gray)" x="256" y="318" font-style="italic">early in the project</text>
<text style="fill: var(--gray)" x="888" y="318" text-anchor="end" font-style="italic">enough real data</text>
</g>
</svg>
</figure>

- **[Dynamic Context Evolution for Scalable Synthetic Data Generation](https://arxiv.org/abs/2604.07147)**, with Rajeev Chhajer (2026). When you ask a model for ideas in many separate batches, it keeps giving you the same ideas, because it can't see what it said before. We call this cross-batch mode collapse. The paper's method, Dynamic Context Evolution, has the model drop ideas it judges to be obvious, keeps a memory of earlier outputs to reject near-duplicates, and rewrites the prompt for each batch. In tests across three domains and two model families, it removed the repeated ideas, which naive prompting didn't, for about $0.50 per 1,000 candidates. The code and experiment data are on [GitHub](https://github.com/ryanlingo/dynamic-context-evolution).
- **[Exploring the Potential of AI-Generated Synthetic Datasets: A Case Study on Telematics Data with ChatGPT](https://arxiv.org/abs/2306.13700)** (2023). I used ChatGPT to build a synthetic dataset of vehicle telematics, i.e. driving data recorded from cars, for a made-up urban planning project in Columbus, Ohio. I refined the prompts step by step and then checked the dataset for diversity, relevance, and coherence. The paper argues that synthetic data can't replace real data, but it can be useful for specific tasks when it's made carefully.

## Context engineering

By context engineering, I mean deciding what information a model sees when it does a task, and in what form, e.g. instructions, examples, documents, and its own earlier outputs. A model works only from what it learned in training and what is in its context, so much of my research focuses on shaping the context, and not on changing the model.

Most of the work is choosing. A model can only take in so much at once, and each piece of information you add pushes something else out or dilutes it. More context isn't always better, because irrelevant or outdated information can make the output worse, and a model rarely says what it's missing. So context engineering means deciding what to include, what to leave out, how to arrange it, and how to keep it current.

Context also includes the model's own work. A model can be asked to restate a problem, break it into parts, and write out what it needs to know before it answers, and that writing then becomes context for the next step. In the same way, the parts of an earlier answer can be kept, edited, and fed back in. Much of my research looks at these loops, where what the model produces shapes what it sees next.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 909 390" role="img" aria-labelledby="ctx-title" xmlns="http://www.w3.org/2000/svg">
<title id="ctx-title">Context engineering. Instructions, examples, documents, and the model's own earlier outputs are shaped into the context, i.e. what the model sees and in what form. The model, whose training is fixed, turns the context into a task output, and that output is fed back as context.</title>
<defs><marker id="ctx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#ctx-arrow)">
<line x1="426" y1="211" x2="535" y2="211"/>
<line x1="630" y1="211" x2="745" y2="211"/>
<line x1="584" y1="92" x2="584" y2="185" stroke-dasharray="4 4"/>
<path d="M827 234 V336 H141 V283"/>
</g>
<path style="stroke: var(--gray)" d="M285 131 H296 V271 H285" fill="none" stroke-width="1"/>
<g fill="currentColor" font-size="16">
<text x="27" y="150">instructions</text>
<text x="27" y="186">examples</text>
<text x="27" y="222">documents</text>
<text x="27" y="258">its own earlier outputs</text>
</g>
<g fill="currentColor" font-size="18">
<text x="318" y="217">Context</text>
<text x="584" y="217" text-anchor="middle">Model</text>
<text x="761" y="217">Task output</text>
<text x="584" y="43" text-anchor="middle">Training</text>
</g>
<g font-size="15" font-style="italic">
<text style="fill: var(--gray)" x="318" y="170">shaped here</text>
<text style="fill: var(--gray)" x="318" y="252">what, and in what form</text>
<text style="fill: var(--gray)" x="584" y="70" text-anchor="middle">fixed, not changed</text>
<text style="fill: var(--gray)" x="484" y="373" text-anchor="middle">fed back as context</text>
</g>
</svg>
</figure>

- **[Enhancing LLM Problem Solving with REAP: Reflection, Explicit Problem Deconstruction, and Advanced Prompting](https://arxiv.org/abs/2409.09415)**, with Martin Arroyo and Rajeev Chhajer (2024). REAP is a prompting method that has the model reflect on the question, break it into smaller parts, and write out the context it needs before it answers. We compared it with plain prompting on six leading models, using questions designed to trip models up. REAP improved most models a lot, e.g. GPT-4o-mini more than doubled its score, and it made the reasoning behind each answer easier to check.
- **[Componentization: Decomposing Monolithic LLM Responses into Manipulable Semantic Units](https://arxiv.org/abs/2509.08203)**, with Rajeev Chhajer, Martin Arroyo, Luka Brkljacic, Ben Davis, and Nithin Santhanam (2025). Language models usually return one long block of text, which is hard to edit one part at a time. The paper splits a response into separate parts that people can edit, reuse, and put back together, while the links between the parts are kept. We built a prototype, MAODchat, and tested it in a small study with four people from academic, engineering, and product roles.
- **[The Role of ChatGPT in Democratizing Data Science: An Exploration of AI-facilitated Data Analysis in Telematics](https://arxiv.org/abs/2308.02045)** (2023). This paper asks whether tools like ChatGPT let people without data science training analyze complex data. Using a synthetic telematics dataset, it shows ChatGPT finding patterns and explaining them in plain language. It also covers the limits, e.g. bias in the analysis and weak reasoning, and argues for using the tools with care.

## Evaluation

By evaluation, I mean checking whether an AI system does the task it was built for, for the people who use it. Every project I work on has an evaluation component, because you can't tell whether a change to an AI system helped unless you have a way to check it.

The work starts with defining what good looks like for this task and its users. A general benchmark can show whether a model is capable in general, but it rarely shows whether the system helps a specific team with a specific job, so the definition has to come from the people and their work.

Next, I read the system's actual outputs and write down what went wrong. Reading comes before measuring, because the failures that matter in practice are often different from the ones you'd guess, so the checks need to be built around what the system actually does.

Then I turn those checks into tests that can run again after each change. From there, the work becomes a loop. After each change, the team runs the tests to see whether it helped, and then keeps the change or undoes it before trying the next one.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 907 345" role="img" aria-labelledby="eval-loop-title" xmlns="http://www.w3.org/2000/svg">
<title id="eval-loop-title">The evaluation loop. First, define what good looks like for this task and its users, not only a benchmark. Second, read the outputs and note what went wrong. Third, build tests that rerun after each change. Then each change is followed by running the tests to see whether it helped, and the change is kept or undone before the next change.</title>
<defs><marker id="eval-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker>
<marker id="eval-arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" style="stroke: var(--gray)" stroke-width="1.2"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#eval-arrow)">
<line x1="193" y1="32" x2="378" y2="32"/>
<line x1="535" y1="32" x2="720" y2="32"/>
<line x1="228" y1="222" x2="390" y2="222"/>
<line x1="523" y1="222" x2="656" y2="222"/>
<path d="M734 246 C600 310, 330 310, 190 247"/>
</g>
<line style="stroke: var(--gray)" x1="777" y1="84" x2="480" y2="198" stroke-width="1" stroke-dasharray="3 3" marker-end="url(#eval-arrow-gray)"/>
<g fill="currentColor" font-size="18" text-anchor="middle">
<text x="120" y="38">Define good</text>
<text x="456" y="38">Read outputs</text>
<text x="792" y="38">Build tests</text>
<text x="179" y="228">Change</text>
<text x="456" y="228">Run tests</text>
<text x="734" y="228">Keep or undo</text>
</g>
<g font-size="15" text-anchor="middle">
<text style="fill: var(--gray)" x="120" y="66">for this task and its users</text>
<text style="fill: var(--gray)" x="120" y="92" font-style="italic">not only a benchmark</text>
<text style="fill: var(--gray)" x="456" y="66">note what went wrong</text>
<text style="fill: var(--gray)" x="792" y="66">rerun after each change</text>
<text style="fill: var(--gray)" x="456" y="256" font-style="italic">did it help?</text>
<text style="fill: var(--gray)" x="456" y="332" font-style="italic">next change</text>
</g>
</svg>
</figure>

- **[Eval Agent](https://github.com/ryanlingo/eval-agent)** (2026). Eval Agent is an early prototype that evaluates AI coding agents. It reads the traces of a session in which an engineer worked with an agent, i.e. the record of each request, response, and tool call. It then looks for three kinds of evidence of quality: counts such as which tools were called and how many tokens were used, the model's judgment of whether each answer met the request, and implicit signals, e.g. the engineer correcting the agent, retrying, or abandoning a path. It writes what it finds to a report that the team can use to improve its prompts and agents. So far it has been tested on a synthetic session, and testing on real sessions is the next step.
