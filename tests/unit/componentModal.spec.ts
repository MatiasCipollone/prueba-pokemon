// tests/ComponentModal.spec.ts
import { shallowMount } from "@vue/test-utils";
import ComponentModal from "@/components/ComponentModal.vue";
import PokemonService from "@/service/PokemonService";

jest.mock("@/service/PokemonService");

describe("ComponentModal.vue", () => {
  let mockService: any;

  beforeEach(() => {
    mockService = {
      fetchPokemon: jest.fn(),
      getPokemon: jest.fn().mockReturnValue({
        sprites: { front_default: "image-url" },
        height: 10,
        weight: 200,
        types: [{ type: { name: "electric" } }],
      }),
    };
    (PokemonService as jest.Mock).mockImplementation(() => mockService);
  });

  it("renders pokemon details correctly", async () => {
    const wrapper = shallowMount(ComponentModal, {
      props: { visible: true, pokemonName: "pikachu" },
    });
    await wrapper.vm.$nextTick();

    expect(mockService.fetchPokemon).toHaveBeenCalledWith("pikachu");
    expect(wrapper.find(".container_data").text()).toContain("Name: Pikachu");
    expect(wrapper.find(".container_data").text()).toContain("Altura: 10");
    expect(wrapper.find(".container_data").text()).toContain("Peso: 200");
    expect(wrapper.find(".container_data").text()).toContain("Type: Electric");
  });

  it("emits close event on button click", async () => {
    const wrapper = shallowMount(ComponentModal, {
      props: { visible: true, pokemonName: "pikachu" },
    });
    await wrapper.find(".close-button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("close");
  });
});
