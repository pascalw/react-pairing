import React from "react";
import { shallow } from "enzyme";
import HelloWorld from "../src/views/index";

describe("<HelloWorld />", () => {
  it("renders hell world", () => {
    const wrapper = shallow(<HelloWorld name="Pascal" />);
    expect(wrapper).to.have.className("foobar");
  });
});
