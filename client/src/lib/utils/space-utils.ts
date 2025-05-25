import moment from "moment";
export const getRemainingTime = (dueDate?: string) => {
  if (!dueDate) return { text: null, color: null, border: null };

  const now = moment();
  const due = moment(dueDate);
  const diff = due.diff(now);

  if (diff < 0) {
  
    const absDiff = Math.abs(diff);
    if (absDiff < 60 * 1000) {
      
      return {
        text: "Just now",
        color: "text-red-500",
        border: "border-red-500",
      };
    } else if (absDiff < 60 * 60 * 1000) {
    
      const minutes = Math.floor(absDiff / (60 * 1000));
      return {
        text: `Past due (${minutes} minutes)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    } else if (absDiff < 24 * 60 * 60 * 1000) {
     
      const hours = Math.floor(absDiff / (60 * 60 * 1000));
      return {
        text: `Past due (${hours} hours)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    } else {
     
      const days = Math.floor(absDiff / (24 * 60 * 60 * 1000));
      return {
        text: `Past due (${days} days)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    }
  } else if (diff < 60 * 1000) {
   
    const seconds = Math.floor(diff / 1000);
    return {
      text: `${seconds} seconds remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else if (diff < 60 * 60 * 1000) {
   
    const minutes = Math.floor(diff / (60 * 1000));
    return {
      text: `${minutes} minutes remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else if (diff < 24 * 60 * 60 * 1000) {
  
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return {
      text: `${hours} hours remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else {
  
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days < 4) {
      return {
        text: `${days} ${days === 1 ? "day" : "days"} remaining`,
        color: "text-orange-500",
        border: "border-orange-500",
      };
    } else if (days < 7) {
      return {
        text: `${days} days remaining`,
        color: "text-green-500",
        border: "border-green-500",
      };
    } else {
      return {
        text: `${Math.floor(days / 7)} weeks remaining`,
        color: "text-green-500",
        border: "border-green-500",
      };
    }
  }
};
