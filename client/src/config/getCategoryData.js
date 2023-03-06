export function getCategoryData(data) {
  switch (data[0].category) {
    case "university":
      return data?.map(({ _id, category, voucherType, price, details }) => {
        return {
          id: _id,
          category,
          voucherType: `${voucherType}(${details.formType})`,
          formType: details.formType,
          price,
        };
      });
    case "bus":
      return data?.map(({ _id, voucherType, price, details }) => {
        return {
          id: _id,
          voucherType,
          journey: voucherType,
          date: details.date,
          time: details.time,
          price,
          details,
        };
      });

    case "cinema":
      return data?.map(({ _id, voucherType, price, details }) => {
        return {
          id: _id,
          voucherType,
          movie: voucherType,
          theatre: details.theatre,
          location: details.location,
          date: details.date,
          time: details.time,
          price,
          details,
        };
      });

    case "stadium":
      return data?.map(({ _id, voucherType, details }) => {
        return {
          id: _id,
          voucherType,
          matchType: details?.matchType,
          match: `${details.home} vs ${details.away}`,
          stands: details.stands,
          venue: details.venue,
          date: details.date,
          time: details.time,
          details,
        };
      });

    default:
      return data?.map(({ _id, voucherType, category, price, details }) => {
        return {
          id: _id,
          voucherType,
          category,
          price,
          details,
        };
      });
  }
}
