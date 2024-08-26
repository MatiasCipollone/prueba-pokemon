import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

describe("HomeView.vue", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("renders correctly", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find("h1.title").text()).toBe("Welcome to Pokédex");
    expect(wrapper.find("p.info").text()).toContain(
      "The digital encyclopedia created by Professor Oak"
    );
  });

  it("navigates to list on button click", async () => {
    const wrapper = shallowMount(HomeView);
    await wrapper.find("button").trigger("click");
    expect(pushMock).toHaveBeenCalledWith({ name: "list" });
  });
});
