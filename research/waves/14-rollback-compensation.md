# rollback compensation — RESEARCHED

Legacy rollbackPlan has no proven engine. Study Saga/Temporal compensation. Classify actions reversible/compensatable/irreversible; store compensation intent before side effect; creation rollback usually restores version pointer rather than erasing history. Test failed compensation, partial rollback, irreversible publish, repeated compensation.

BEAST disposition: ADAPT. Implementation remains separate from research status.
