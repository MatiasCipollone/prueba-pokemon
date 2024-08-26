// tests/ComponentList.spec.ts
import { shallowMount } from "@vue/test-utils";
import ComponentList from "@/components/ComponentList.vue";
import { useFavoriteStore } from "@/store/favorite";

jest.mock("@/store/favorite");

describe("ComponentList.vue", () => {
  let mockFavoriteStore: any;

  beforeEach(() => {
    mockFavoriteStore = {
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(false),
    };
    (useFavoriteStore as unknown as jest.Mock).mockReturnValue(
      mockFavoriteStore
    );
  });

  it("renders pokemon name correctly", () => {
    const wrapper = shallowMount(ComponentList, {
      props: { pokemonName: "pikachu" },
    });
    expect(wrapper.find(".pokemonName").text()).toBe("Pikachu");
  });

  it("toggles favorite status", async () => {
    const wrapper = shallowMount(ComponentList, {
      props: { pokemonName: "pikachu" },
    });
    await wrapper.find(".star-button").trigger("click");

    expect(mockFavoriteStore.addFavorite).toHaveBeenCalledWith("pikachu");
  });

  it("opens modal on click", async () => {
    const wrapper = shallowMount(ComponentList, {
      props: { pokemonName: "pikachu" },
    });
    await wrapper.find(".containerItem").trigger("click");

    expect(
      wrapper.findComponent({ name: "ComponentModal" }).props("visible")
    ).toBe(true);
  });
});
