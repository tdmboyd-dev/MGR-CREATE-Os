# MGR Brain: Real Training Plan

## What it is

The MGR Brain is the platform's conductor. It reads the request, understands the business context, chooses the right MGR agent or iKickItz avatar, proposes a safe step-by-step plan, and selects allowed tools. It does not replace the agents. It gives them direction.

The Brain can help create content, pages, offers, workflows, CRM updates, customer follow-up plans, avatar work, and operating plans. The actual work happens through tool connections and agents that have the right permissions.

## What it must never do on its own

- Send customer messages, spend money, publish content, delete data, or change billing without the workspace owner's chosen approval rule.
- Use tools that were not assigned to the agent.
- Pretend a job was done when the tool did not confirm it.
- Learn from customer data unless that customer explicitly allows it.

## The right first model

Start with a Qwen 2.5 7B instruction model plus a small LoRA training layer. It is strong enough to be a real routing and planning Brain, cheap enough to prove itself, and easy to replace later. A 14B or 27B run comes only after the smaller Brain beats the untuned base model on a protected test set.

Do not train a 27B model first. The project currently has conflicting 7B, 14B, and 27B scripts. Bigger would cost more and hide data-quality problems instead of fixing them.

## What we train first

- Routing: choose the correct agent, allowed tool, and workflow.
- Planning: turn a goal into ordered, checkable steps.
- Safety: know when to ask permission, stop, or hand a job to a human.
- Memory use: know what customer, company, agent, and brand details matter.
- Voice: MGR direct, clear, confident communication without copying random internet noise.
- Cross-world work: know whether an MGR agent or iKickItz avatar is the right worker.

## What comes from code, not training

Training teaches judgment and communication. Code enforces truth: permissions, CRM ownership, approvals, budgets, tools, retries, logs, and customer data boundaries. This is how the platform stays powerful without turning reckless.

## Training ladder

1. Audit the current data with `node scripts/brain-finetune/audit-training-data.js`.
2. Build the first protected, balanced pilot pack with `node scripts/brain-finetune/build-pilot-corpus.js`. It keeps the original archive untouched and writes a separate `scripts/brain-pilot` pack.
3. Review a sample of the pilot pack before training. Generated examples that are vague, unsafe, or fantasy features do not get a free pass just because there are many of them.
4. Keep a separate test pack that is never used in training.
5. Train the 7B pilot for 1 to 2 passes on a rented GPU.
6. Compare it to the base model on routing accuracy, valid plans, safe approvals, tool accuracy, and MGR voice.
7. Only if it wins clearly, train a bigger 7B version or consider 14B.
8. Deploy the winning model behind a private endpoint, then connect `MGR_BRAIN_MODEL_ID` and `MGR_BRAIN_ENDPOINT`.

## Cost reality

The cheapest worthwhile pilot is normally a rented consumer GPU with a 7B model. Budget roughly $10 to $30 for a careful one-pass pilot, plus a few dollars for storage. A stronger 7B run is usually about $30 to $80. A 14B or 27B first run can easily hit $100 to several hundred dollars before ongoing hosting. These are planning ranges, not promises: live GPU prices move, so the exact cost gets checked immediately before any paid run.

Do not pay for 24/7 hosting before people are actively using it. During the build, use a private endpoint that can pause or a rented server that is shut down after tests. Production serving costs are separate from training.

## Proof of success

We do not call the Brain trained because a screen says so. It must beat the untouched base model on a locked test set, make valid permitted decisions, trigger no unsafe actions, and have a repeatable report saved in the project.
