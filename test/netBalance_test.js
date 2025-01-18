import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import data from '../data/transactionLog.json' with{type: 'json'}
import data1 from '../data/data1.json' with{type: 'json'}
import { netBalance } from "../src/generateLog.js";

describe("testing netBalance", () => {
  it("netbalance of given sample data", () => {
    assertEquals(netBalance(data.transactions),{ ACC001: 750, ACC002: 1200 });
    assertEquals(netBalance(data1.transactions),{  ACC003: 2300, ACC004: 3600 });
  });
});
