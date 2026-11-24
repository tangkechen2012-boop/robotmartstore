/** Single source of truth for public business details. */
export const COMPANY = {
  brand: "RobotMart",
  legalName: "KCT Ecommerce Inc",
  address: {
    street: "9270 Bay Plaza Blvd Ste 604",
    city: "Tampa",
    region: "FL",
    postalCode: "33619",
    country: "United States",
    oneLine: "9270 Bay Plaza Blvd Ste 604, Tampa, FL 33619, United States",
  },
  phone: "+1 (318) 608-2420",
  email: "hello@robotmart.store",
};

/** Brands RobotMart is an authorized (non-exclusive) reseller for. */
export const AUTHORIZED_BRANDS = ["Unitree", "LinkerBot", "DM-Tac"];

const AUTHORIZED_VENDOR_SPELLINGS = ["unitree", "unitree robotics", "linkerbot", "daimon robotics", "dm-tac"];

export function isAuthorizedVendor(vendor?: string | null): boolean {
  return !!vendor && AUTHORIZED_VENDOR_SPELLINGS.includes(vendor.trim().toLowerCase());
}
