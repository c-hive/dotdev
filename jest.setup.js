import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Getting rid of `fetch is not defined` error.
global.fetch = require("jest-fetch-mock");

configure({ adapter: new Adapter() });
