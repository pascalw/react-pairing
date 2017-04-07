import chai from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());

global.jestExpect = global.expect;
global.expect = chai.expect;
