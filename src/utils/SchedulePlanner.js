import schedule from "node-schedule"
import { createNotification } from "../services/Notification.service.js";
import Outfit from "../models/Outfit.js";

export const schedulePlannerNotification = (planner) => {


  // Only schedule if time is in the future
  if (planner.time >= new Date()) {
    schedule.scheduleJob(planner.time, async () => {
      await createNotification({ userId: planner.user, plannerId: planner._id });

      const outfit = await Outfit.findById({_id:planner.outfitId})
      // Increment counter
      outfit.usage += 1;
      await outfit.save();

      // Optional: delete planner after notification
      // await planner.remove();
    });
  }
};