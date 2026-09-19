import test from "node:test";import assert from "node:assert/strict";import {canTransitionRun,canTransitionStage} from "../src/core/state-machines.js";import {actionDigest} from "../src/core/digest.js";
test("terminal run cannot restart",()=>assert.equal(canTransitionRun("COMPLETED","RUNNING"),false));
test("approval wait resumes",()=>assert.equal(canTransitionRun("WAITING_APPROVAL","RUNNING"),true));
test("stage retry path explicit",()=>{assert.equal(canTransitionStage("FAILED","READY"),false);assert.equal(canTransitionStage("FAILED","RETRY_SCHEDULED"),true)});
test("action digest canonical",()=>assert.equal(actionDigest("publish",{b:2,a:1},{x:1}),actionDigest("publish",{a:1,b:2},{x:1})));
test("action digest changes with payload",()=>assert.notEqual(actionDigest("publish",{id:1},{budget:100}),actionDigest("publish",{id:1},{budget:101})));
