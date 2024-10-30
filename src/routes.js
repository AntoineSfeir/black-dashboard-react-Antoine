// Import the component files
import EnergyGHG from "views/energy_ghg";
import TEBA from "views/teba";
import HIPAFlareEmission from "views/HIPA_flare_emisson.js";
import LeakCalculations from "views/leak_calculations";
import EnvironmentalMassBalance from "views/environmental_mass_balance";
import FencelineMassBalance from "views/fenceline_mass_balance";
import Dashboard from "./views/Dashboard";
import OleFinsFlareEmission from "views/olefins_flare_emission";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36", // Choose an icon for the Dashboard
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/energy-ghg",
    name: "Energy & GHG Intensity",
    icon: "tim-icons icon-chart-bar-32",
    component: EnergyGHG,
    layout: "/admin",
  },
  {
    path: "/teba",
    name: "Top Energy Bad Actors (TEBA)",
    icon: "tim-icons icon-alert-circle-exc",
    component: TEBA,
    layout: "/admin",
  },
  {
    path: "/hipa-flare-emission",
    name: "HIPA Flare Emission",
    icon: "tim-icons icon-bell-55",
    component: HIPAFlareEmission,
    layout: "/admin",
  },
  {
    path: "/olefins-flare-emission",
    name: "Olefins Flare Emission",
    icon: "tim-icons icon-bell-55",
    component: OleFinsFlareEmission,
    layout: "/admin",
  },
  {
    path: "/leak-calculations",
    name: "Leak Calculations",
    icon: "tim-icons icon-settings-gear-63",
    component: LeakCalculations,
    layout: "/admin",
  },
  {
    path: "/environmental-mass-balance",
    name: "Environmental Mass Balance",
    icon: "tim-icons icon-world",
    component: EnvironmentalMassBalance,
    layout: "/admin",
  },
  {
    path: "/fenceline-mass-balance",
    name: "Fenceline Mass Balance",
    icon: "tim-icons icon-map-big",
    component: FencelineMassBalance,
    layout: "/admin",
  },
];

export default routes;
