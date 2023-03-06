import { CATEGORY } from "../constants";

export const addCategoryOptions = (category) => {
  if (category) {
    switch (category) {
      case "waec":
        return {
          cat: CATEGORY.exams,
          autocompleteLabel: "Waec Checker",
        };
      case "university":
        return {
          cat: CATEGORY.university,
          autocompleteLabel: "University",
        };
      case "security":
        return {
          cat: CATEGORY.security,
          autocompleteLabel: "Security Service",
        };
      case "cinema":
        return {
          cat: [],
          autocompleteLabel: "Cinema Tickets",
        };
      case "stadium":
        return {
          cat: [],
          autocompleteLabel: "Stadium Tickets",
        };
      default:
        return {
          cat: [],
          autocompleteLabel: "Category here",
        };
    }
  }
};
