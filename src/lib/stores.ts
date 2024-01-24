import { writable , type Writable} from "svelte/store";
import type { IndexMonster } from "../routes/+page";

export const caughtMonster : Writable<IndexMonster[]>= writable([]);