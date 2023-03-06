import { IMAGES } from "./images";

export function getCode(code) {
  let providerName = null;
  if (code.startsWith("+")) {
    if (["+23320", "+23350"].includes(code.slice(0, 6))) {
      providerName = "vodafone";
    }
    if (
      ["+23324", "+23354", "+23355", "+23359", "+23325"].includes(
        code.slice(0, 6)
      )
    ) {
      providerName = "mtn";
    }

    if (["+23327", "+23357", "+23326", "+23356"].includes(code.slice(0, 6))) {
      providerName = "airteltigo";
    }
  } else {
    if (["020", "050"].includes(code.slice(0, 3))) {
      providerName = "vodafone";
    }
    if (["024", "054", "055", "059", "025"].includes(code.slice(0, 3))) {
      providerName = "mtn";
    }

    if (["027", "057", "026", "056"].includes(code.slice(0, 3))) {
      providerName = "airteltigo";
    }
  }

  switch (providerName) {
    case "mtn":
      return {
        providerName,
        code,
        image: IMAGES.mtn_money,
      };
    case "vodafone":
      return {
        providerName,
        code,
        image: IMAGES.vodafone_cash,
      };
    case "airteltigo":
      return {
        providerName,
        code,
        image: IMAGES.airtel_money,
      };

    default:
      return {
        providerName,
        code,
        image: null,
      };
  }
}
