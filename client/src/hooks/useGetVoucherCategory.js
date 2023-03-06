import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVouchersCategory } from "../api/categoryAPI";
import isEmpty from "lodash/isEmpty";
import { getCategoryData } from "../config/getCategoryData";
export const useGetVoucherCategory = (category) => {
  const [categories, setCategories] = useState([]);

  // console.log(category);
  const cat = useQuery(
    ["category", category],
    () => getAllVouchersCategory(category),

    {
      enabled: !!category,

      onSuccess: (categories) => {
        if (!isEmpty(categories)) {
          const options = getCategoryData(categories);
          setCategories([]);
          setCategories(options);
        } else {
          setCategories([]);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  return { categories, loading: cat.isFetching, refetch: cat.refetch };
};
