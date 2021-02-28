#!/usr/bin/env node

import yargs from "yargs";
import { inspectChat } from "./commands/inspectChat";
import { migrateJsonl } from "./commands/migrateJsonl";
import { removeDuplicatedActions } from "./commands/removeDuplicatedActions";
import { showClusterHealth } from "./commands/showClusterHealth";
import { runScheduler } from "./scheduler";
import { runWorker } from "./worker";

yargs(process.argv.slice(2))
  .scriptName("honeybee")
  .command(
    "inspect <videoId>",
    "inspect the live chat messages",
    (yargs) => {
      yargs.positional("videoId", {
        describe: "video id",
      });
    },
    inspectChat
  )
  .command("health", "show cluster health", showClusterHealth)
  .command(
    "removeDuplicatedActions",
    "remove duplicated actions",
    removeDuplicatedActions
  )
  .command(
    "migrateJsonl <input>",
    "migrate JSONL file",
    (yargs) => {
      yargs.positional("input", {
        describe: "jsonl file",
      });
    },
    migrateJsonl
  )
  .command("scheduler", "start scheduler", runScheduler)
  .command("worker", "start worker", runWorker)
  .demandCommand(1).argv;
