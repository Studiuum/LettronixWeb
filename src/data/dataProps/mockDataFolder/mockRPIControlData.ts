import type { RPIControlStatusProp } from "../dataProps";
export const mockRPIControlStatusProp: RPIControlStatusProp[] = [
  {
    generalField: "PUMP",
    changeField: "pump_status",
    rpiResponse: 0,
    newStatus: 1,
  },
  {
    generalField: "SPRINKLER",
    changeField: "run_foliar",
    rpiResponse: 0,
    newStatus: 1,
  },
];
