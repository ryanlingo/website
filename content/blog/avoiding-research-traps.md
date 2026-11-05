---
title: "Avoiding Research Traps"
description: "Why both theory and practice are essential in applied AI research, and how idea-cases and use-cases help each shape the other."
created: 2024-12-12
modified: 2024-12-12
status: finished
confidence: likely
importance: 6
tags: [thinking/problem-solving, technology/innovation]
---

In technological research, particularly within fields like applied AI, progress hinges on a delicate balance: the fusion of theory and practice. This isn’t a simple linear progression from abstract idea to concrete application; rather, it’s a continuous interplay, a feedback loop where theoretical vision informs practical execution, and practical experience refines theoretical understanding. The concepts of “idea-cases” and “use-cases” provide practical guidance for navigating this cycle.

Research and innovation occupy a broad spectrum. On the theoretical end, investigations often conclude with the creation of a published research paper, an artifact that disseminates new knowledge and explores niche theoretical concepts. On the practical end, the culmination is typically a tangible product or service — an artifact designed to address specific real-world needs. While both theoretical research and practical products have their place, impactful progress often arises from bridging the gap between them, translating theoretical insights into practical applications and using real-world feedback to shape future research.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 910 190" role="img" aria-labelledby="art-1" xmlns="http://www.w3.org/2000/svg">
<title id="art-1">Research runs along a line from theory to practice. At the theory end, specialized research explores niche concepts and ends in a paper. At the practice end, practical applications build products for immediate use. Progress comes from the intersection, where theoretical insights are put into practice and feedback shapes the next research.</title>
<g font-size="15" font-style="italic"><text style="fill: var(--gray)" x="60" y="30">theory</text><text style="fill: var(--gray)" x="850" y="30" text-anchor="end">practice</text></g>
<g fill="currentColor" font-size="18"><text x="60" y="80">Specialized research</text><text x="455" y="80" text-anchor="middle">Intersection</text><text x="850" y="80" text-anchor="end">Practical applications</text></g>
<g stroke-width="1"><line style="stroke: var(--gray)" x1="60" y1="105" x2="850" y2="105"/><line style="stroke: var(--gray)" x1="60" y1="98" x2="60" y2="112"/><line style="stroke: var(--gray)" x1="850" y1="98" x2="850" y2="112"/></g>
<circle cx="455" cy="105" r="4" fill="currentColor"/>
<g font-size="15"><text style="fill: var(--gray)" x="60" y="140">niche concepts, ends in a paper</text><text style="fill: var(--gray)" x="455" y="140" text-anchor="middle">insights put into practice,</text><text style="fill: var(--gray)" x="455" y="162" text-anchor="middle">feedback shapes research</text><text style="fill: var(--gray)" x="850" y="140" text-anchor="end">products for immediate use</text></g>
</svg>
</figure>

As a researcher in applied AI, I’ve observed how research can become ineffective when theory becomes disconnected from practice, resulting in abstract concepts with limited real-world impact. Conversely, focusing solely on practical implementation without a strong theoretical foundation can lead to solutions that are functional but lack innovation and long-term vision. This post introduces two concepts to describe these traps and presents a structured approach to begin thinking about the interplay between theoretical concepts and practical development, opening a discussion on how to achieve more impactful outcomes.

## Defining Idea-Cases and Use-Cases

While ‘use-case’ is a well-established term, ‘idea-case’ is introduced here as a neologism to conceptualize a use-case’s theoretical counterpart. Let’s now explore what we mean by each of these terms.

- **Idea-Case:** An idea-case represents the theoretical foundation and conceptual innovation that are essential for meaningful research. The theoretical foundation comprises the established knowledge, principles, and assumptions that inform the research direction. It’s the “why” behind the pursuit, the fundamental rationale for exploring a particular problem. Conceptual innovation, on the other hand, is the spark of new thought. It involves generating novel ideas, frameworks, or perspectives that challenge existing ways of thinking or offer entirely new approaches to solving problems. It’s about identifying unexplored possibilities and envisioning transformative solutions. An idea-case, therefore, focuses on answering the fundamental “why” behind the project, exploring the problem space at a high level and identifying key gaps, challenges, and opportunities. It’s about asking the big questions: What are the underlying principles at play? What are the potential long-term implications? What are the core mechanisms driving this phenomenon? What are the fundamental assumptions underlying current approaches? What are the key relationships and interactions between different components of the system? What are the potential unintended consequences of implementing this solution? How could this research impact existing practices or industries?
- **Use-Case:** A use-case embodies the practical application and tangible demonstration of the idea-case’s value, bridging the gap between theory and practice. Practical application is the process of translating the theoretical concepts and innovative ideas of the idea-case into concrete actions and processes. It’s about taking the “why” and turning it into a “how.” Tangible demonstration involves creating a working prototype, a tangible system or artifact that showcases the results of the practical application. This demonstration provides concrete evidence of the idea’s viability and potential impact. A use-case focuses on answering the “how” and “what,” outlining a specific implementation within real-world constraints (budget, hardware, usability). It’s about building a working prototype, testing its effectiveness, and gathering real-world feedback.

Rather than viewing idea-cases and use-cases as separate steps, it is more accurate to understand them as intertwined and mutually reinforcing elements. The idea-case provides the guiding vision, while the use-case grounds that vision in practical reality, creating a dynamic interplay between theory and practice.

## Avoiding the Traps of Imbalance

To ensure successful research, it’s crucial to avoid two common traps that arise from a disconnect between theory and practice.

### The Sitcom Problem: The Allure of Superficiality

A common pitfall in research, which we’ll call the ‘sitcom problem’ (a neologism for this context), occurs when projects focus on ideas that sound interesting at a high level but lack real depth or practical application that truly explores the core theoretical questions. Like a sitcom that revisits the same superficial conflicts without ever achieving true resolution, this approach may culminate in a use-case, but that use-case is often generic and fails to provide meaningful insights. For example, endlessly debating the theoretical possibilities of AI in education and then simply building a basic attendance-tracking app exemplifies this problem — the app is a use-case, but it doesn’t address the deeper questions about personalized learning, student engagement, or educational outcomes.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 910 242" role="img" aria-labelledby="art-2" xmlns="http://www.w3.org/2000/svg">
<title id="art-2">The sitcom problem. Problems in the idea-case, i.e. lack of depth, superficial conflicts, endless theoretical debates, and ignored core theories, and problems in the use-case, i.e. generic use-cases, basic applications, lack of practicality, lack of innovation, unresolved outcomes, and core questions not addressed, lead to superficial research outcomes.</title>
<defs><marker id="art-2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker></defs>
<g font-size="15" font-style="italic"><text style="fill: var(--gray)" x="30" y="40">in the idea-case</text><text style="fill: var(--gray)" x="300" y="40">in the use-case</text></g>
<g fill="currentColor" font-size="16"><text x="30" y="72">lack of depth</text><text x="30" y="98">superficial conflicts</text><text x="30" y="124">endless theoretical debates</text><text x="30" y="150">ignored core theories</text><text x="300" y="72">generic use-cases</text><text x="300" y="98">basic applications</text><text x="300" y="124">lack of practicality</text><text x="300" y="150">lack of innovation</text><text x="300" y="176">unresolved outcomes</text><text x="300" y="202">core questions not addressed</text></g>
<path style="stroke: var(--gray)" d="M560 55 H572 V210 H560" fill="none" stroke-width="1"/>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#art-2-a)"><line x1="580" y1="132" x2="655" y2="132"/></g>
<g fill="currentColor" font-size="18"><text x="670" y="126">Superficial research</text><text x="670" y="150">outcomes</text></g>
</svg>
</figure>

### The IKEA Problem: Practice Without Vision

The ‘IKEA problem’ (another neologism we’re using here) arises when projects focus primarily on assembling existing components — like following instructions to build furniture — with insufficient consideration for the user’s needs, the context of use, or the underlying rationale for the specific design choices. The emphasis is on how the pieces fit together, rather than why they are being assembled in a particular way and what value that provides to the user. This can often be seen in projects that begin with a specific technology and then attempt to find a problem it can solve, rather than starting with a problem and selecting the most appropriate tools. Crucially, this problem is often a direct consequence of starting with a ‘sitcom problem’ — a superficial idea-case that lacks the depth to inform meaningful implementation. While the result might be functional, it lacks originality, innovation, and a clear connection to user needs or broader research goals. For example, a ‘sitcom problem’ such as “using AI to improve customer service” might lead to an ‘IKEA problem’ where existing chatbot technology is implemented without considering the specific needs of the customers or the context of their interactions, resulting in a frustrating and ineffective customer experience.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 910 294" role="img" aria-labelledby="art-3" xmlns="http://www.w3.org/2000/svg">
<title id="art-3">The IKEA problem. Problems in the problem definition, i.e. a superficial definition, lack of depth, over-simplification, and no research goals, and problems in the build, i.e. an instruction-following mindset, assembly over originality, a focus on existing components, neglect of user needs, ignored context, generic solutions, repetitive patterns, and no innovation, lead to a lack of user-centered design and innovation.</title>
<defs><marker id="art-3-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker></defs>
<g font-size="15" font-style="italic"><text style="fill: var(--gray)" x="30" y="40">in the problem definition</text><text style="fill: var(--gray)" x="300" y="40">in the build</text></g>
<g fill="currentColor" font-size="16"><text x="30" y="72">superficial definition</text><text x="30" y="98">lack of depth</text><text x="30" y="124">over-simplification</text><text x="30" y="150">no research goals</text><text x="300" y="72">instruction-following mindset</text><text x="300" y="98">assembly over originality</text><text x="300" y="124">focus on existing components</text><text x="300" y="150">neglect of user needs</text><text x="300" y="176">context ignored</text><text x="300" y="202">generic solutions</text><text x="300" y="228">repetitive patterns</text><text x="300" y="254">no innovation</text></g>
<path style="stroke: var(--gray)" d="M560 55 H572 V262 H560" fill="none" stroke-width="1"/>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#art-3-a)"><line x1="580" y1="158" x2="655" y2="158"/></g>
<g fill="currentColor" font-size="18"><text x="670" y="152">Little user-centered</text><text x="670" y="176">design or innovation</text></g>
</svg>
</figure>

## The Power of Fusion: A Dynamic Interplay

The true power of these ideas lies in the dynamic interplay between idea-cases and use-cases. This is not a linear, one-way process; it’s a continuous feedback loop where theory and practice inform and refine each other:

- **Idea-Case informs Use-Case:** The theoretical vision, established in the *idea-case*, provides the guiding principles and objectives for the practical implementation. It ensures that the project addresses a meaningful problem and pursues a clear purpose.
- **Use-Case refines Idea-Case:** The practical experience gained from building, testing, and deploying the *use-case* provides invaluable feedback. This feedback loop allows us to refine our theoretical understanding, identify unforeseen challenges or opportunities, and potentially even reshape the original *idea-case*.

This iterative cycle of theory informing practice and practice refining theory is the engine of genuine research and innovation.

<figure class="research-diagram research-diagram-wide">
<svg viewBox="0 0 910 300" role="img" aria-labelledby="art-4" xmlns="http://www.w3.org/2000/svg">
<title id="art-4">The interplay of idea-cases and use-cases. The idea-case, the why, informs the use-case, because the theoretical vision guides what gets built. The use-case, the how and what, refines the idea-case, because practical experience gives feedback.</title>
<defs><marker id="art-4-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.2"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#art-4-a)"><path d="M300 128 C395 55, 515 55, 610 128"/><path d="M610 192 C515 250, 395 250, 300 192"/></g>
<g fill="currentColor" font-size="18" text-anchor="middle"><text x="220" y="156">Idea-case</text><text x="690" y="156">Use-case</text></g>
<g fill="currentColor" font-size="16" font-style="italic" text-anchor="middle"><text x="455" y="30">informs</text><text x="455" y="268">refines</text></g>
<g font-size="15" text-anchor="middle"><text style="fill: var(--gray)" x="220" y="180">the why</text><text style="fill: var(--gray)" x="690" y="180">the how and what</text><text style="fill: var(--gray)" x="455" y="52">the vision guides what gets built</text><text style="fill: var(--gray)" x="455" y="290">practice gives feedback</text></g>
</svg>
</figure>

## From Abstract to Concrete, and Back Again: A Practical Example

Let’s illustrate the iterative relationship between idea-cases and use-cases with a high-level practical example:

1. **Initial Idea-Case:** “How can we use AI to create more engaging and personalized learning experiences?” This broad question sets the stage for exploration.
2. **Research and Exploration:** Before developing a specific use-case, it’s crucial to investigate existing research, technologies, and solutions in the field of AI in education. This might involve reviewing existing AI tutoring systems, adaptive learning platforms, and research on personalized learning. This research helps identify potential building blocks, best practices, and areas where research and innovation is needed.
3. **Refined Idea-Case (Informed by Research):** Based on the research, we refine the initial idea-case to focus on adaptive learning within individual student learning preferences: “How can we use AI to provide personalized learning experiences tailored to individual student learning preferences?” This refined idea-case provides a more specific direction for the first implementation.
4. **First Use-Case (Implementation):** Developing an AI-powered tutoring system that adapts to individual student learning preferences. This use-case attempts to concretize the refined idea by focusing on personalized learning based on how students prefer to learn.
5. **Feedback and Refinement (Learning from Practice):** Testing the tutoring system reveals that while students appreciate the personalized learning pace based on their preferences, they also miss the social interaction of traditional classrooms. This practical feedback highlights a limitation of the initial implementation and prompts a further re-evaluation of the idea-case.
6. **Further Refined Idea-Case (Adapting the Theory Based on Research and Feedback):** “How can we combine the benefits of AI-powered personalization with the social and collaborative aspects of learning?” This further refined idea-case incorporates both the practical feedback from the use-case and existing research on collaborative learning, broadening the scope to include social learning.
7. **Second Use-Case (New Implementation):** Developing a blended learning platform that integrates AI tutoring with collaborative online activities and virtual group projects. This new use-case attempts to address the further refined idea-case by incorporating social and collaborative elements.
8. **This iterative process continues:** This cycle of *idea-case* refinement and *use-case* implementation continues as long as there is a need for improvement.

This example demonstrates how the practical experience of building and testing a use-case, combined with ongoing research, leads to a deeper understanding of the problem space and a refinement of the initial idea-case. By embracing this iterative approach, we can avoid the pitfalls of the ‘sitcom problem’ (superficial theory) and the ‘IKEA problem’ (functional assembly without purpose), ensuring that our research leads to meaningful and impactful results.

## Conclusion: Embracing the Interplay

In conclusion, the dynamic interplay between idea-cases and use-cases is essential for driving impactful research and innovation. By embracing this iterative cycle of theory informing practice and practice refining theory, we can move beyond superficial applications and mere assembly to create truly transformative solutions. This is not just a methodological choice; it’s a call to action to prioritize both vision and execution in our pursuit of progress in AI and other transformative technologies. Let us embrace this fusion to build a future where innovation is both meaningful and impactful. It’s important to acknowledge that the framework presented here is not a fully developed theory, but rather a starting point for a broader conversation about the relationship between theory and practice in research. Further exploration, refinement, and practical application are needed to fully realize its potential.

*Originally published on the [99P Labs blog](https://medium.com/99p-labs/avoiding-research-traps-8af6cb7617cc) on 2024-12-12.*

## See also

- [[learning-through-uncertainty|Learning Through Uncertainty]]
- [[what-do-we-mean-by-learning|What Do We Mean by Learning?]]
